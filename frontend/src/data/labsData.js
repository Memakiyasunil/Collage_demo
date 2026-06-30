import { Cpu, Cloud, TestTube, BrainCircuit, Atom, Glasses, Bot, Network, Sparkles, ShieldCheck, Layout, Smartphone, Database } from 'lucide-react';

export const labsData = {
  "ai-ml": {
    id: "ai-ml",
    title: "AI ML Lab",
    subtitle: "Artificial Intelligence & Machine Learning",
    icon: BrainCircuit,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    description: "Dive deep into the world of algorithms that learn and adapt. Our AI & ML lab is equipped with high-performance computing resources to train complex models, from neural networks to natural language processing systems.",
    offers: [
      "High-performance GPU clusters for model training",
      "Access to premium datasets and AI frameworks",
      "Hands-on projects with computer vision and NLP",
      "Research opportunities in deep learning",
      "Mentorship from industry AI experts",
      "Integration with cloud AI services"
    ],
    technologies: [
      "TensorFlow & PyTorch",
      "Python & R",
      "Scikit-Learn",
      "OpenCV",
      "Hugging Face Transformers"
    ],
    targetAudience: "Students and researchers aiming to build intelligent systems, predictive models, and autonomous applications.",
    keyOutcomes: [
      "Develop and deploy production-ready ML models",
      "Understand the mathematics behind deep learning",
      "Build intelligent applications with state-of-the-art accuracy"
    ]
  },
  "cloud": {
    id: "cloud",
    title: "Cloud Lab",
    subtitle: "Cloud Computing & Infrastructure",
    icon: Cloud,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    description: "Master modern cloud architecture and deployment strategies. The Cloud lab provides hands-on experience with major cloud providers, teaching you how to build scalable, resilient, and secure distributed applications.",
    offers: [
      "Sandbox environments for AWS, Azure, and GCP",
      "Training on microservices and serverless architecture",
      "Infrastructure as Code (IaC) workshops",
      "Containerization and orchestration practice",
      "Cloud security and compliance labs",
      "Cost optimization and monitoring techniques"
    ],
    technologies: [
      "Amazon Web Services (AWS)",
      "Microsoft Azure",
      "Google Cloud Platform (GCP)",
      "Docker & Kubernetes",
      "Terraform & Ansible"
    ],
    targetAudience: "Aspiring cloud engineers, DevOps practitioners, and system architects.",
    keyOutcomes: [
      "Design highly available and scalable cloud architectures",
      "Automate infrastructure provisioning",
      "Master modern CI/CD pipelines and containerization"
    ]
  },
  "stem": {
    id: "stem",
    title: "STEM Lab",
    subtitle: "Science, Technology, Engineering, and Mathematics",
    icon: TestTube,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    description: "An interdisciplinary laboratory designed to foster innovation across core scientific and engineering disciplines. Build prototypes, conduct experiments, and apply mathematical modeling to real-world problems.",
    offers: [
      "Cross-disciplinary prototyping tools",
      "Advanced mathematical modeling software",
      "Physics and engineering simulation environments",
      "Collaborative workspaces for group projects",
      "Access to scientific research databases",
      "Workshops bridging theory and practical application"
    ],
    technologies: [
      "MATLAB & Simulink",
      "Wolfram Mathematica",
      "LabVIEW",
      "AutoCAD & SolidWorks",
      "Data Logging Sensors"
    ],
    targetAudience: "Engineering students, applied mathematics majors, and interdisciplinary researchers.",
    keyOutcomes: [
      "Apply complex mathematical models to physical systems",
      "Design and test engineering prototypes",
      "Develop analytical problem-solving skills"
    ]
  },
  "life-career-guideline": {
    id: "life-career-guideline",
    title: "Life Career Guideline",
    subtitle: "Psychometric Tech Labs",
    icon: BrainCircuit,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    description: "Utilizing advanced psychometric tools and data analytics, this lab helps individuals discover their true potential. We combine psychological assessments with career mapping technology to provide personalized growth paths.",
    offers: [
      "AI-driven psychometric assessments",
      "Aptitude and personality profiling",
      "Personalized career trajectory mapping",
      "Cognitive ability testing",
      "Behavioral analytics for team building",
      "One-on-one technology-assisted counseling"
    ],
    methodology: [
      { step: "1", title: "Comprehensive Assessment", desc: "Evaluating cognitive abilities and personality traits." },
      { step: "2", title: "Data Analysis", desc: "Using AI to match profiles with ideal career paths." },
      { step: "3", title: "Skill Gap Identification", desc: "Determining required skills for the desired trajectory." },
      { step: "4", title: "Actionable Roadmap", desc: "Creating a step-by-step plan for career success." }
    ],
    targetAudience: "Students choosing their majors, professionals seeking career transitions, and HR teams.",
    keyOutcomes: [
      "Deep understanding of personal strengths and weaknesses",
      "Clear, data-backed career path recommendations",
      "Improved decision-making for educational and professional choices"
    ]
  },
  "nano-tech": {
    id: "nano-tech",
    title: "Nano Tech Labs",
    subtitle: "Nanotechnology & Materials Science",
    icon: Atom,
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
    description: "Explore the cutting edge of science at the atomic and molecular scale. Our Nano Tech Lab focuses on the design, characterization, and application of nanomaterials across various industries including electronics, medicine, and energy.",
    offers: [
      "Simulation of molecular dynamics",
      "Nanomaterial synthesis and characterization theory",
      "Research in nano-electronics and semiconductors",
      "Bio-nanotechnology applications",
      "Advanced materials testing virtual environments",
      "Seminars on the ethical implications of nanotechnology"
    ],
    technologies: [
      "Molecular Dynamics Simulators",
      "Atomic Force Microscopy (AFM) Data Analysis",
      "Quantum Computing Interfaces",
      "Computational Chemistry Software"
    ],
    targetAudience: "Materials science students, chemical engineers, and cutting-edge researchers.",
    keyOutcomes: [
      "Understand the principles of molecular engineering",
      "Analyze the properties of nanomaterials",
      "Innovate new applications for nanotechnology in modern industry"
    ]
  },
  "ar-vr-mr-xr": {
    id: "ar-vr-mr-xr",
    title: "AR VR MR XR Labs",
    subtitle: "Extended Reality Technologies",
    icon: Glasses,
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1200&q=80",
    description: "Immerse yourself in the future of human-computer interaction. This lab provides the hardware and software necessary to build compelling Augmented, Virtual, Mixed, and Extended Reality experiences.",
    offers: [
      "State-of-the-art VR headsets and AR glasses",
      "Motion tracking and spatial computing tools",
      "3D modeling and environment design software",
      "Haptic feedback integration testing",
      "Development of immersive educational and training simulators",
      "Cross-platform XR app development"
    ],
    technologies: [
      "Unity & Unreal Engine",
      "Meta Quest SDK & Apple VisionOS",
      "ARKit & ARCore",
      "Blender & Maya",
      "WebXR"
    ],
    targetAudience: "Game developers, UX/UI designers, and creators of immersive enterprise solutions.",
    keyOutcomes: [
      "Build interactive 3D environments and applications",
      "Master spatial computing and user interaction in XR",
      "Deploy XR solutions to commercial hardware platforms"
    ]
  },
  "robotics": {
    id: "robotics",
    title: "Robotics Labs",
    subtitle: "Autonomous Systems & Mechatronics",
    icon: Bot,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    description: "Where software meets hardware. Our Robotics Lab focuses on the design, construction, operation, and application of robots. Learn to build intelligent machines that can interact with the physical world.",
    offers: [
      "Industrial robotic arm programming",
      "Mobile autonomous robot development",
      "Sensor integration and computer vision for robotics",
      "Kinematics and dynamics modeling",
      "Robot Operating System (ROS) training",
      "Drone programming and flight control systems"
    ],
    technologies: [
      "Robot Operating System (ROS & ROS2)",
      "C++ & Python",
      "Arduino & Raspberry Pi",
      "Gazebo Simulation",
      "Computer Vision (OpenCV)"
    ],
    targetAudience: "Mechatronics engineers, robotics enthusiasts, and automation specialists.",
    keyOutcomes: [
      "Design and program autonomous robotic systems",
      "Integrate complex sensor arrays for environmental mapping",
      "Understand industrial automation protocols"
    ]
  },
  "iot-ai-ml": {
    id: "iot-ai-ml",
    title: "IOT Lab + AI ML Mix",
    subtitle: "Intelligent Connected Devices",
    icon: Network,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    description: "The convergence of the Internet of Things and Artificial Intelligence. This lab teaches you how to collect data from interconnected devices and apply machine learning algorithms to create smart, predictive systems.",
    offers: [
      "Edge computing and TinyML implementation",
      "Sensor network design and deployment",
      "Real-time data streaming and analytics",
      "IoT security protocols and implementation",
      "Predictive maintenance system design",
      "Smart home and smart city prototyping"
    ],
    technologies: [
      "MQTT & CoAP Protocols",
      "AWS IoT Core & Azure IoT Hub",
      "TinyML & Edge Impulse",
      "Microcontrollers (ESP32, STM32)",
      "Time-Series Databases (InfluxDB)"
    ],
    targetAudience: "IoT developers, data engineers, and hardware-software integration specialists.",
    keyOutcomes: [
      "Deploy machine learning models on edge devices",
      "Build secure, scalable IoT architectures",
      "Process and analyze real-time streaming data from sensor networks"
    ]
  },
  "future-tech": {
    id: "future-tech",
    title: "Future Tech Lab",
    subtitle: "Exploring Tomorrow's Innovations",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    description: "A forward-looking laboratory dedicated to experimental technologies and emerging trends that are poised to disrupt industries. From quantum computing concepts to advanced blockchain architectures.",
    offers: [
      "Quantum computing algorithms and simulators",
      "Web3, Blockchain, and smart contract development",
      "Brain-Computer Interface (BCI) fundamentals",
      "Advanced cryptography and zero-knowledge proofs",
      "Next-generation communication protocols (6G research)",
      "Ethical frameworks for emerging technologies"
    ],
    technologies: [
      "Qiskit & Quantum Simulators",
      "Solidity & Rust (Web3)",
      "Hyperledger",
      "Advanced Cryptography Libraries"
    ],
    targetAudience: "Visionary developers, researchers, and technology strategists looking ahead of the curve.",
    keyOutcomes: [
      "Understand the principles of quantum computing and programming",
      "Develop secure decentralized applications",
      "Analyze the societal impact of upcoming technological paradigms"
    ]
  },
  "cyber-security": {
    id: "cyber-security",
    title: "Cyber Security Lab",
    subtitle: "Ethical Hacking & Digital Defense",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    description: "Fortify your expertise in protecting digital assets. Our Cyber Security Lab provides a hands-on environment to practice ethical hacking, penetration testing, and building robust defense mechanisms against real-world cyber threats. Learn to think like an attacker to defend like a pro.",
    offers: [
      "Dedicated penetration testing sandboxes & CTF challenges",
      "Network vulnerability assessment and scanning tools",
      "Malware analysis in isolated virtual environments",
      "SIEM setup and real-time threat monitoring labs",
      "Web application security testing (OWASP Top 10)",
      "Cryptography and secure communications workshops"
    ],
    technologies: [
      "Kali Linux & Parrot OS",
      "Metasploit Framework",
      "Wireshark & Nmap",
      "Burp Suite",
      "Splunk & ELK Stack"
    ],
    methodology: [
      { step: "1", title: "Threat Reconnaissance", desc: "Learning passive and active information gathering techniques." },
      { step: "2", title: "Vulnerability Scanning", desc: "Identifying and analyzing security weaknesses in systems." },
      { step: "3", title: "Exploitation & Testing", desc: "Safely exploiting vulnerabilities in controlled lab environments." },
      { step: "4", title: "Defense & Mitigation", desc: "Implementing patches, firewalls, and security policies." }
    ],
    targetAudience: "Students aspiring to become security analysts, ethical hackers, SOC engineers, and network defenders.",
    keyOutcomes: [
      "Perform professional-grade penetration testing",
      "Analyze and respond to real-world cyber incidents",
      "Build and configure hardened network and application security"
    ]
  },
  "web-development": {
    id: "web-development",
    title: "Web Development Lab",
    subtitle: "Full-Stack & Modern Web Engineering",
    icon: Layout,
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&w=1200&q=80",
    description: "Build stunning, high-performance web applications from the ground up. Our Web Development Lab covers the complete spectrum from pixel-perfect UI design to scalable backend architectures. Master the modern web ecosystem and ship production-ready projects.",
    offers: [
      "Project-based learning with real-world client briefs",
      "Frontend workshops on React, Vue, and Next.js",
      "Backend API design with Node.js, Django, and FastAPI",
      "Database design, optimization, and ORMs",
      "DevOps fundamentals: Docker, CI/CD, and deployment",
      "Web performance, accessibility, and SEO best practices"
    ],
    technologies: [
      "React, Next.js & TypeScript",
      "Node.js & Express.js",
      "PostgreSQL & MongoDB",
      "Docker & GitHub Actions",
      "Figma to Code Workflows"
    ],
    methodology: [
      { step: "1", title: "UI/UX Design", desc: "Translating wireframes and designs into responsive layouts." },
      { step: "2", title: "Frontend Development", desc: "Building interactive, component-driven user interfaces." },
      { step: "3", title: "Backend & API Layer", desc: "Developing RESTful and GraphQL APIs with secure authentication." },
      { step: "4", title: "Deployment & Scaling", desc: "Containerizing and deploying applications on cloud platforms." }
    ],
    targetAudience: "Aspiring full-stack developers, frontend specialists, UI/UX engineers, and startup founders building web products.",
    keyOutcomes: [
      "Build and deploy complete full-stack web applications",
      "Master modern frontend frameworks and component architecture",
      "Design scalable APIs and manage production databases"
    ]
  },
  "mobile-app": {
    id: "mobile-app",
    title: "Mobile App Development Lab",
    subtitle: "iOS, Android & Cross-Platform Engineering",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    description: "From idea to App Store — master the art and science of mobile application development. Our Mobile App Lab provides the tools, frameworks, and mentorship needed to build native and cross-platform apps that delight millions of users.",
    offers: [
      "iOS development with Swift and Xcode environments",
      "Android development with Kotlin and Jetpack Compose",
      "Cross-platform app development using React Native & Flutter",
      "App Store and Play Store submission walkthroughs",
      "Mobile UI/UX design and prototyping with Figma",
      "Push notifications, payments, and third-party API integration"
    ],
    technologies: [
      "Flutter & Dart",
      "React Native & Expo",
      "Swift & SwiftUI",
      "Kotlin & Jetpack Compose",
      "Firebase & Supabase"
    ],
    methodology: [
      { step: "1", title: "Product Design", desc: "Crafting intuitive user flows and high-fidelity prototypes." },
      { step: "2", title: "Cross-Platform Build", desc: "Developing apps that run seamlessly on iOS and Android." },
      { step: "3", title: "Native Feature Integration", desc: "Leveraging device hardware: camera, GPS, biometrics." },
      { step: "4", title: "Testing & Launch", desc: "Automated testing, beta distribution, and app store submission." }
    ],
    targetAudience: "Aspiring iOS/Android developers, cross-platform engineers, indie app makers, and product builders.",
    keyOutcomes: [
      "Build and publish cross-platform apps to iOS and Android stores",
      "Implement advanced native device features and hardware integrations",
      "Design mobile-first UX that meets platform-specific design guidelines"
    ]
  },
  "data-science": {
    id: "data-science",
    title: "Data Science Lab",
    subtitle: "Analytics, Visualization & Predictive Modeling",
    icon: Database,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    description: "Transform raw data into powerful insights. Our Data Science Lab equips you with the statistical methods, analytical tools, and domain knowledge needed to extract value from complex datasets. From exploratory analysis to deploying predictive models, become a data-driven decision maker.",
    offers: [
      "Exploratory Data Analysis (EDA) and data wrangling workshops",
      "Statistical modeling and hypothesis testing labs",
      "Machine learning pipelines from ingestion to deployment",
      "Interactive data visualization with Tableau and Power BI",
      "Big data processing with Spark and Hadoop",
      "Real-world business case studies and Kaggle competitions"
    ],
    technologies: [
      "Python (Pandas, NumPy, SciPy)",
      "Scikit-Learn & XGBoost",
      "Tableau & Power BI",
      "Apache Spark & Databricks",
      "SQL & dbt"
    ],
    methodology: [
      { step: "1", title: "Data Collection & Wrangling", desc: "Cleaning, transforming, and structuring raw data sources." },
      { step: "2", title: "Exploratory Analysis", desc: "Identifying patterns, outliers, and statistical relationships." },
      { step: "3", title: "Model Building", desc: "Selecting and training the right algorithms for the problem." },
      { step: "4", title: "Deployment & Reporting", desc: "Serving models via APIs and creating business dashboards." }
    ],
    targetAudience: "Aspiring data scientists, business analysts, product managers, and researchers who want to make data-driven decisions.",
    keyOutcomes: [
      "Design end-to-end data science pipelines from raw data to insights",
      "Build and evaluate predictive models for business problems",
      "Create compelling dashboards and data stories for stakeholders"
    ]
  }
};
