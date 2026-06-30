const Skill = require('../models/Skill');
const WantedSkill = require('../models/WantedSkill');
const UserMatch = require('../models/UserMatch');

/**
 * Core Matching Algorithm:
 * For user A:
 *  1. Get A's WantedSkills (categories + names)
 *  2. Get A's OfferedSkills (categories + names)
 *  3. Find all other users who offer skills matching A's wanted skills
 *  4. For each candidate user B: check if B wants any of A's offered skills
 *  5. Score = (reciprocalMatches / max(totalWanted, 1)) * 100
 *  6. Upsert into UserMatch
 */
const computeMatches = async (userId) => {
  const [myWanted, myOffered] = await Promise.all([
    WantedSkill.find({ userId }).lean(),
    Skill.find({ userId, isArchived: false }).lean(),
  ]);

  if (!myWanted.length || !myOffered.length) return [];

  const myWantedNames = myWanted.map((w) => w.skillName.toLowerCase());
  const myOfferedNames = myOffered.map((s) => s.skillName.toLowerCase());
  const myOfferedCategories = myOffered.map((s) => s.categoryId.toString());

  // Find potential partners who offer what I want
  const potentialSkills = await Skill.find({
    userId: { $ne: userId },
    isArchived: false,
    visibility: 'Public',
    $or: [
      { skillName: { $in: myWantedNames.map((n) => new RegExp(`^${n}$`, 'i')) } },
      { categoryId: { $in: myWanted.map((w) => w.categoryId) } },
    ],
  })
    .populate('userId', '_id name email')
    .lean();

  // Group by partner userId
  const partnerMap = {};
  for (const skill of potentialSkills) {
    const pid = skill.userId._id.toString();
    if (!partnerMap[pid]) partnerMap[pid] = { user: skill.userId, offeredMatches: [] };
    partnerMap[pid].offeredMatches.push(skill.skillName.toLowerCase());
  }

  const matches = [];
  for (const [partnerId, partnerData] of Object.entries(partnerMap)) {
    // Check if this partner also wants any of my offered skills
    const partnerWanted = await WantedSkill.find({ userId: partnerId }).lean();
    const partnerWantedNames = partnerWanted.map((w) => w.skillName.toLowerCase());

    const reciprocalCount = myOfferedNames.filter((name) => partnerWantedNames.includes(name)).length;
    const directCount = partnerData.offeredMatches.filter((name) => myWantedNames.includes(name)).length;

    const score = Math.min(100, Math.round(((directCount + reciprocalCount) / (myWanted.length + 1)) * 100));

    if (score > 0) {
      matches.push({ matchedUserId: partnerId, matchScore: score });

      // Upsert match record
      await UserMatch.findOneAndUpdate(
        { userId, matchedUserId: partnerId },
        { userId, matchedUserId: partnerId, matchScore: score },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
  }

  return matches;
};

// GET /api/skill-matches  — get matches for current user
const getMatches = async (req, res) => {
  try {
    // Recompute matches on each request (could be cached in production)
    await computeMatches(req.user.id);

    const matches = await UserMatch.find({ userId: req.user.id })
      .sort({ matchScore: -1 })
      .limit(50)
      .populate('matchedUserId', 'name email')
      .lean();

    // Enrich with skills
    const enriched = await Promise.all(
      matches.map(async (m) => {
        const [theirSkills, theirWanted] = await Promise.all([
          Skill.find({ userId: m.matchedUserId._id, isArchived: false }).populate('categoryId', 'name').lean(),
          WantedSkill.find({ userId: m.matchedUserId._id }).populate('categoryId', 'name').lean(),
        ]);
        return { ...m, theirSkills, theirWanted };
      })
    );

    res.json({ success: true, count: enriched.length, data: enriched });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/skill-matches/:userId  — get stored matches for a specific user (Admin)
const getMatchesByUserId = async (req, res) => {
  try {
    const matches = await UserMatch.find({ userId: req.params.userId })
      .sort({ matchScore: -1 })
      .populate('matchedUserId', 'name email')
      .lean();
    res.json({ success: true, count: matches.length, data: matches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getMatches, getMatchesByUserId, computeMatches };
