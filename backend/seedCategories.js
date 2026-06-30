const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  icon: { type: String, default: 'Code' },
  isActive: { type: Boolean, default: true }
});

const Category = mongoose.models.SkillCategory || mongoose.model('SkillCategory', CategorySchema);

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB');

    const defaultCategories = [
      { name: 'Web Development', description: 'React, Node, HTML, CSS', icon: 'Code' },
      { name: 'Mobile App Development', description: 'React Native, Flutter, iOS, Android', icon: 'Smartphone' },
      { name: 'Data Science & AI', description: 'Machine Learning, Python, AI', icon: 'Database' },
      { name: 'Design & UI/UX', description: 'Figma, Adobe XD, Photoshop', icon: 'PenTool' },
      { name: 'Digital Marketing', description: 'SEO, Social Media, Ads', icon: 'TrendingUp' },
      { name: 'Business & Management', description: 'Project Management, Finance', icon: 'Briefcase' },
      { name: 'Languages & Communication', description: 'English, Spanish, Public Speaking', icon: 'MessageCircle' },
      { name: 'Cyber Security & Ethical Hacking', description: 'Network Security, Penetration Testing', icon: 'ShieldCheck' },
      { name: 'Cloud Computing & DevOps', description: 'AWS, Azure, Docker, Kubernetes', icon: 'Cloud' },
      { name: 'Blockchain & Web3', description: 'Smart Contracts, Ethereum, Solidity', icon: 'Box' },
      { name: 'Video Editing & Animation', description: 'Premiere Pro, After Effects, 3D Modeling', icon: 'Video' },
      { name: 'Other', description: 'Anything else', icon: 'MoreHorizontal' }
    ];

    for (const cat of defaultCategories) {
      await Category.updateOne(
        { name: cat.name },
        { $set: cat },
        { upsert: true }
      );
    }
    
    console.log('✅ Categories seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
