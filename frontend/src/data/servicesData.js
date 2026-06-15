import { Building2, Briefcase, Users, GraduationCap, BookOpen, Rocket, Share2, UserPlus } from 'lucide-react';

export const servicesData = {
  "teaching": {
    id: "teaching",
    title: "Teaching",
    subtitle: "Excellence in academic instruction",
    icon: GraduationCap,
    description: "We provide top-tier teaching services focusing on modern pedagogies and student-centric learning. Our approach ensures that students not only grasp theoretical concepts but also understand their practical applications in the real world.",
    offers: [
      "Expert-led interactive sessions",
      "Modern pedagogical techniques",
      "Comprehensive curriculum coverage",
      "Regular assessments and feedback",
      "Personalized student mentoring",
      "Project-based learning approach"
    ],
    methodology: [
      { step: "1", title: "Diagnostic Assessment", desc: "Understanding student baselines to tailor instructional strategies." },
      { step: "2", title: "Interactive Delivery", desc: "Using smart classrooms and multimedia to enhance engagement." },
      { step: "3", title: "Continuous Evaluation", desc: "Weekly quizzes and assignments to track real-time progress." },
      { step: "4", title: "Remedial Action", desc: "Dedicated sessions for doubt clearing and personalized support." }
    ],
    targetAudience: "Undergraduate and Postgraduate students seeking deep theoretical foundations paired with practical industry insights.",
    keyOutcomes: [
      "Enhanced conceptual clarity",
      "Improved academic performance",
      "Strong foundation for advanced studies"
    ]
  },
  "training": {
    id: "training",
    title: "Training",
    subtitle: "Industry-aligned skill development",
    icon: BookOpen,
    description: "Our comprehensive training programs bridge the gap between academic knowledge and industry requirements. We equip students with the practical skills and hands-on experience necessary to excel in their chosen careers.",
    offers: [
      "Hands-on practical workshops",
      "Industry-specific skill development",
      "Soft skills and communication training",
      "Certification preparation programs",
      "Technical tool proficiency",
      "Real-world scenario simulations"
    ],
    technologies: [
      "React & Node.js",
      "Python & Django",
      "AWS & Cloud Ops",
      "Data Analytics & PowerBI",
      "Cybersecurity",
      "UI/UX Design"
    ],
    certificationPath: [
      "Skill Assessment & Gap Analysis",
      "Intensive Hands-on Workshops",
      "Live Project Implementation",
      "Mock Interviews & Prep",
      "Final Certification Awarded"
    ],
    industryAlignment: "All training modules are co-developed with leading IT firms to ensure 100% relevance to current job market demands."
  },
  "bootcamps": {
    id: "bootcamps",
    title: "Bootcamps",
    subtitle: "Intensive immersive learning",
    icon: Rocket,
    description: "Our intensive bootcamps are designed to rapidly upskill students in high-demand technologies and methodologies. Through immersive learning environments, students build real projects and gain job-ready skills in a short timeframe.",
    offers: [
      "Intensive coding and tech bootcamps",
      "Project-driven immersive learning",
      "Rapid upskilling in high-demand areas",
      "Mentorship from industry experts",
      "Portfolio building opportunities",
      "Career transition support"
    ],
    curriculumHighlights: [
      { week: "Weeks 1-2", focus: "Foundations & Syntax Basics" },
      { week: "Weeks 3-5", focus: "Advanced Concepts & Frameworks" },
      { week: "Weeks 6-8", focus: "Database & Backend Integration" },
      { week: "Weeks 9-12", focus: "Capstone Project & Deployment" }
    ],
    prerequisites: [
      "Basic understanding of computer operations",
      "Logical and analytical mindset",
      "Commitment of 15-20 hours per week"
    ],
    careerOutcomes: [
      "Junior Developer Roles",
      "Technical Support Engineering",
      "Freelance Opportunities"
    ]
  },
  "knowledge-sharing": {
    id: "knowledge-sharing",
    title: "Knowledge Sharing",
    subtitle: "Collaborative academic environments",
    icon: Share2,
    description: "We foster a culture of continuous learning through our knowledge-sharing platforms. By connecting students, educators, and industry professionals, we facilitate the exchange of ideas, research, and best practices.",
    offers: [
      "Expert seminars and webinars",
      "Peer-to-peer learning networks",
      "Research collaboration platforms",
      "Industry insights and trend analysis",
      "Alumni networking events",
      "Open-source contribution guidance"
    ],
    platformsUsed: [
      "Interactive Webinar Portals",
      "Dedicated Discord Communities",
      "Open Source Contribution Hubs",
      "Internal Research Repositories"
    ],
    guestSpeakerDomains: [
      "Artificial Intelligence & ML",
      "FinTech & Blockchain",
      "Tech Leadership & Agile",
      "Startup Founders & VCs"
    ],
    communityBenefits: [
      "Direct networking with industry leaders",
      "Access to premium whitepapers and research",
      "Opportunities for cross-disciplinary collaboration"
    ]
  },
  "faculty-provision": {
    id: "faculty-provision",
    title: "Faculty Provision",
    subtitle: "Expert academic staffing solutions",
    icon: UserPlus,
    description: "We supply institutions with highly qualified and experienced faculty members across various disciplines. Our rigorous selection process ensures that our educators bring both academic excellence and industry relevance to the classroom.",
    offers: [
      "Qualified and experienced educators",
      "Specialized subject matter experts",
      "Visiting and guest faculty arrangements",
      "Faculty training and development",
      "Performance evaluation and feedback",
      "Seamless integration into campus culture"
    ],
    selectionProcess: [
      { step: "1", action: "Resume & Credential Screening" },
      { step: "2", action: "Subject Matter Expert Technical Interview" },
      { step: "3", action: "Live Demo Lecture Assessment" },
      { step: "4", action: "Background & Reference Checks" },
      { step: "5", action: "Onboarding & Institutional Alignment" }
    ],
    facultyDomains: [
      "Computer Science & Engineering",
      "Business Administration & Management",
      "Data Science & Analytics",
      "Cybersecurity & Cloud Computing"
    ],
    qualityAssurance: [
      "Biannual performance reviews",
      "Student feedback integration",
      "Continuous faculty development programs"
    ]
  },
  "managed-campus": {
    id: "managed-campus",
    title: "Managed Campus",
    subtitle: "Complete campus management solutions",
    icon: Building2,
    description: "We provide comprehensive campus management services that handle every aspect of educational institution operations. From infrastructure setup to faculty management, student administration to quality assurance — we ensure seamless operations so universities can focus on their core mission.",
    offers: [
      "Full campus infrastructure setup and maintenance",
      "Faculty recruitment, training, and management",
      "Student enrollment and lifecycle management",
      "Academic calendar and examination management",
      "Library and laboratory resource management",
      "Compliance and accreditation support"
    ]
  },
  "corporate-connect": {
    id: "corporate-connect",
    title: "Corporate Connect",
    subtitle: "Bridging academia and industry",
    icon: Briefcase,
    description: "Our Corporate Connect service creates meaningful connections between educational institutions and the corporate world. We facilitate placement partnerships, organize industry events, and create pathways for students to gain real-world experience.",
    offers: [
      "Dedicated placement cell support",
      "Industry partnership development",
      "Guest lecture and workshop series",
      "Internship program coordination",
      "Corporate training modules",
      "Campus recruitment drive management"
    ]
  },
  "student-acquisition": {
    id: "student-acquisition",
    title: "Student Acquisition",
    subtitle: "Comprehensive enrollment strategies",
    icon: Users,
    description: "We help institutions build strong student pipelines through strategic marketing, outreach programs, and counseling networks. Our data-driven approach ensures effective student acquisition across target demographics.",
    offers: [
      "BTL marketing and brand activation",
      "School and college outreach programs",
      "Career counseling and guidance sessions",
      "Digital marketing and lead generation",
      "Counselor and referral network management",
      "Admission process streamlining"
    ]
  }
};
