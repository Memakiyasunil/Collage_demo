import React, { createContext, useState } from 'react';

export const CourseContext = createContext();

const titles = [
  "Animation, VFX & Game Design",
  "Artificial Intelligence & Machine Learning",
  "Blockchain Technology",
  "Cloud Automation",
  "Cyber Security & Cloud Technology",
  "Cyber Security & Digital Forensics",
  "Data Analytics",
  "Software & Mobile Application Development",
  "Internet of Things (IoT)",
  "Full Stack Web Development",
  "Robotics and Automation",
  "UI/UX Design & Engineering",
  "Cloud Computing & DevOps",
  "AR/VR Technology"
];

const universities = [
  { name: "Vidhyadeep University", class: "uni-blue" },
  { name: "Gandhinagar University", class: "uni-purple" },
  { name: "Rai University", class: "uni-green" },
  { name: "Shreyarth University", class: "uni-orange" }
];

const generateMockCourses = () => {
  const allCourses = [];
  
  // Helper to generate a single course
  const createCourse = (type, i) => {
    const titleBase = titles[i % titles.length];
    let fullTitle = "";
    if (type === 'UG') fullTitle = `B.Sc. IT (Hons) ${titleBase}`;
    if (type === 'PG') fullTitle = `M.Sc. IT ${titleBase}`;
    if (type === 'INT') fullTitle = `Int. M.Sc. IT ${titleBase}`;

    const numUnis = (i % 2) + 1;
    const progUnis = [];
    for(let j=0; j<numUnis; j++) {
      progUnis.push(universities[(i + j) % universities.length]);
    }

    return {
      id: `${type}-${i}`,
      title: fullTitle,
      type: type,
      iconIndex: i % 6, // 0 to 5, mapped to icons in components
      universities: progUnis,
      description: `${fullTitle} designed to prepare you for the most in-demand tech careers.`,
      duration: type === 'INT' ? "5 Years" : type === 'PG' ? "2 Years" : "4 Years",
      eligibility: type === 'PG' ? "Graduation" : "12th Pass",
      
      // Detailed fields for CourseDetail page
      totalSeats: "60",
      format: "Full-time",
      status: "Accepting Applications",
      overview: `The ${fullTitle} is a comprehensive program designed to build expertise in modern technology. Students learn to protect digital infrastructure, design secure cloud architectures, and respond to cyber threats using industry-standard tools and frameworks.\n\nThe curriculum progresses from foundational concepts to advanced topics. Students work with AWS, Azure, Google Cloud, Kali Linux, and enterprise platforms.`,
      eligibilityChecklist: [
        "Students who have successfully completed their 10+2 (or equivalent) examination from a recognized board.",
        "Applicants with a strong foundation in mathematics, science, and logical reasoning.",
        "Minimum qualitative scores as prescribed by the university admission guidelines.",
        "Basic computer literacy and interest in technology is recommended."
      ],
      careerStats: {
        jobsInIndia: "9,200+",
        avgSalary: "4.5 LPA",
        companiesHiring: "550+"
      },
      salaryInsights: [
        { role: "Junior Analyst", range: "3.5-6L", level: "Entry", percentage: 25 },
        { role: "Mid-level Engineer", range: "8-14L", level: "Mid", percentage: 50 },
        { role: "Senior Developer", range: "16-24L", level: "Senior", percentage: 75 },
        { role: "Architect / Lead", range: "26-42L", level: "Lead", percentage: 90 }
      ]
    };
  };

  for (let i = 0; i < 13; i++) allCourses.push(createCourse('UG', i));
  for (let i = 0; i < 9; i++) allCourses.push(createCourse('PG', i));
  for (let i = 0; i < 4; i++) allCourses.push(createCourse('INT', i));

  return allCourses;
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState(generateMockCourses());

  const addCourse = (course) => {
    setCourses([...courses, { ...course, id: `NEW-${Date.now()}` }]);
  };

  const updateCourse = (updatedCourse) => {
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, updateCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
