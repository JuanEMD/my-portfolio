export const seo = {
  keywords: "seo.keywords",
};

export const homeLink = {
  title: "Home",
  label: "nav.home",
  href: "#home",
};

export const personalInfo = {
  name: "Juan Marmolejos",
  role: "personalInfo.role",
  description1: "personalInfo.description",
  linkedinUrl: "https://www.linkedin.com/in/jemarmolejos/",
  mail: "juanernestomarmolejosdanis@gmail.com",
  githubUrl: "https://github.com/JuanEMD",
  phone: "+1 (809) 875 1370",
};

export const navLinks = [
  { title: "projects", label: "nav.projects", href: "#projects" },
  { title: "skills", label: "nav.skills", href: "#skills" },
  { title: "experiences", label: "nav.experiences", href: "#experiences" },
  { title: "education", label: "nav.education", href: "#education" },
  { title: "contact", label: "nav.contact", href: "#contact" },
];

export const projects = [
  {
    title: "projects.medicalDocument.title",
    description: "projects.medicalDocument.description",
    imageUrl: null,
    projectUrl: "",
    skills: [
      { name: "Next.js" },
      { name: "Redux Toolkit" },
      { name: "Typescript" },
      { name: "Tailwind" },
      { name: "Azure" },
      { name: ".NET" },
    ],
  },
  {
    title: "projects.travelManagement.title",
    description: "projects.travelManagement.description",
    imageUrl: null,
    projectUrl: "",
    skills: [
      { name: "Next.js" },
      { name: "Redux Toolkit" },
      { name: "Typescript" },
      { name: "Tailwind" },
      { name: "AWS" },
      { name: "Docker" },
    ],
  },
  {
    title: "projects.reportingGenerator.title",
    description: "projects.reportingGenerator.description",
    imageUrl: null,
    projectUrl: "",
    skills: [
      { name: "Next.js" },
      { name: "Redux Toolkit" },
      { name: "Typescript" },
      { name: "Material UI" },
      { name: "AWS" },
    ],
  },
];

export const skills = {
  frontend: [
    { name: "React" },
    { name: "Next.js" },
    { name: "Redux" },
    { name: "Typescript" },
    { name: "Vue.js" },
    { name: "CSS" },
    { name: "SCSS" },
    { name: "Tailwind" },
    { name: "Bootstrap" },
    { name: "Material Ui" },
  ],
  backend: [
    { name: "Node.js" },
    { name: ".Net" },
  ],
  databases: [
    { name: "SQL Server" },
    { name: "MongoDB" },
  ],
  testing: [
    { name: "Jest" },
    { name: "Vitest" },
  ],
  cloud: [
    { name: "Azure" },
    { name: "AWS" },
  ],
  tools: [
    { name: "Git" },
    { name: "Postman" },
  ],
  Practices: [
    { name: "RESTful" },
    { name: "Agile" },
    { name: "SOLID" },
    { name: "DRY" },
    { name: "Clean Code" },
  ],
  softSkills: [
    { name: "skills.softSkills.teamWork" },
    { name: "skills.softSkills.communication" },
    { name: "skills.softSkills.collaboration" },
    { name: "skills.softSkills.selfManaged" },
    { name: "skills.softSkills.proactive" },
    { name: "skills.softSkills.problemSolving" },
    { name: "skills.softSkills.adaptability" },
    { name: "skills.softSkills.attentionToDetail" },
    { name: "skills.softSkills.continuousLearning" },
  ],
};

export const experiences = [
  {
    company: "Humano Seguros",
    position: "experiences.humano.position",
    startDate: "2025",
    endDate: "2026",
    description: "experiences.humano.description",
  },
  {
    company: "Bitbox Caribe",
    position: "experiences.bitbox.position",
    startDate: "2022",
    endDate: "2025",
    description: "experiences.bitbox.description",
  },
];

export const education = [
  {
    title: "education.unicaribe.title",
    institution: "Universidad del Caribe (UNICARIBE)",
    institutionImgUrl: "/images/UNICARIBE_Logo.png",
    startDate: "2021",
    endDate: "2024",
    countryName: "education.countryName",
  },
  {
    title: "education.itla.title",
    institution: "Instituto Tecnológico de Las Américas (ITLA)",
    institutionImgUrl: "/images/ITLA_Logo.png",
    startDate: "2017",
    endDate: "2020",
    countryName: "education.countryName",
  },
];

export const certificates = [
  {
    title: "Node.js and SQLite",
    url: "/images/certificates/codecademy_node_sqlite.png",
  },
  { title: "Node.js", url: "/images/certificates/codecademy_node.png" },
  {
    title: "React hooks",
    url: "/images/certificates/codecademy_react_hooks.png",
  },
  {
    title: "React lifecycle",
    url: "/images/certificates/codecademy_react_lifecycle.png",
  },
  {
    title: "React and Jest",
    url: "/images/certificates/codecademy_react_testing_jest.png",
  },
  {
    title: "Redux and Redux toolkit",
    url: "/images/certificates/codecademy_redux.png",
  },
  {
    title: "Javascript and JQery",
    url: "/images/certificates/udemy_JS_JQ.png",
  },
];

export const languajes = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];
