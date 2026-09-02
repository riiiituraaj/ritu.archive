export const roles = ["Product Designer", "Frontend Developer", "Graphic Designer", "Motion Graphics Designer"];

export const experience = [
  { year: "2025", period: "APR 2025 — PRESENT", company: "Frint.in", role: "Lead Product Designer", type: "PRODUCT", description: "Led UI/UX design initiatives by creating intuitive interfaces, wireframes, and prototypes while collaborating with developers and stakeholders for seamless user experiences." },
  { year: "2025", period: "SEP 2025 — PRESENT", company: "Google Student Ambassador", role: "Student Ambassador", type: "COMMUNITY", description: "Representing technology-driven initiatives, organizing workshops and community events, and promoting collaborative learning and innovation among students." },
  { year: "2023", period: "AUG 2023 — DEC 2024", company: "Zidio Development", role: "Frontend Development Intern", type: "FRONTEND", description: "Developed responsive web applications using React.js and modern frontend technologies while optimizing user experience and interface responsiveness." },
  { year: "2023", period: "JAN 2023 — JUL 2023", company: "Peershala", role: "Motion Graphics Intern", type: "MOTION", description: "Created engaging motion graphics, animations, and branding visuals for digital content and social media campaigns." },
];

export const education = [
  { institution: "Jorhat Engineering College", degree: "Bachelor of Technology (B.Tech)", field: "Computer Science and Engineering", period: "2023 — 2027" },
  { institution: "Domain Academy", degree: "Higher Secondary", field: "Science", period: "2021 — 2023" },
];

export const projects = [
  { title: "CleanSpeak", description: "A civic-tech and environmental awareness platform enabling users to report illegal waste dumping safely and anonymously with location mapping and photo evidence. Includes AI-powered water quality prediction and community discussion systems.", stack: ["React.js", "Next.js", "Node.js", "Firebase", "MongoDB", "Python", "Map APIs"], image: "/images/cleanspeak.png", variant: "interface" as const },
  { title: "Krixok Xokhi UI", description: "An all-in-one tool for farmers with AI-powered features including crop health AI and disease AI, along with government schemes and a marketplace to buy seeds and rent tractors, irrigation pumps, and other equipment.", stack: [], image: "/images/krixok-xokhi.png", variant: "code" as const },
  { title: "Bismoi", description: "An initiative to encourage recognition of Northeast India and GI-tagged products.", stack: [], image: "/images/bismoi.png", variant: "film" as const },
  { title: "EventSphere", description: "A centralized college event management and ticketing platform designed to streamline registrations, announcements, schedules, and participant engagement for technical and cultural events.", stack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Firebase Authentication"], image: "/images/eventsphere.png", variant: "interface" as const },
  { title: "DesignFlow", description: "A collaborative UI/UX design showcase and portfolio management platform enabling designers to share projects, receive feedback, and manage creative workflows efficiently.", stack: ["React.js", "Express.js", "MongoDB", "Tailwind CSS"], image: "/images/designflow.png", variant: "code" as const },
];

export const skillGroups = [
  { number: "01", title: "Full Stack Development", skills: ["React.js", "Next.js", "Node.js", "Express.js", "JavaScript", "TypeScript", "REST APIs", "Responsive Web Development"] },
  { number: "02", title: "Database & Backend", skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"] },
  { number: "03", title: "Product & UI/UX Design", skills: ["UI/UX Design", "Wireframing", "Prototyping", "Design Systems", "Interaction Design", "Visual Design"] },
  { number: "04", title: "Creative & Design Tools", skills: ["Figma", "Adobe After Effects", "Adobe Photoshop", "Graphic Design", "Motion Graphics"] },
  { number: "05", title: "Additional", skills: ["Git & GitHub", "Branding", "Creative Direction", "Problem Solving", "Community Management"] },
];

export const awards = [
  { number: "01", place: "FINALIST", name: "Adobe Student Hackathon", detail: "" },
  { number: "02", place: "1ST POSITION", name: "Hackxetra", detail: "Tezpur University" },
  { number: "03", place: "2ND POSITION", name: "National Hacks Trekathon", detail: "" },
  { number: "04", place: "2ND POSITION", name: "Designathon", detail: "IIT Delhi" },
  { number: "05", place: "REPRESENTED JEC", name: "Technical and Design Competitions", detail: "" },
];

export const certifications = [
  { title: "UI/UX Certification", issuer: "Google & Coursera", description: "Professional certification focused on UI/UX design principles, user-centered design, wireframing, prototyping, usability testing, interaction design, visual hierarchy, accessibility, and responsive interface development." },
  { title: "Generative AI Certification", issuer: "Google Cloud", description: "Certification focused on Generative AI fundamentals and practical applications including content generation, prompt engineering, LLMs, ethical AI practices, and AI integration." },
  { title: "Cohort 2.0", issuer: "Full Stack & DevOps Cohort, 100xdevs", description: "45-week engineering program covering advanced MERN development, distributed architectures, Docker, Kubernetes, DevOps workflows, cloud infrastructure, authentication, backend scalability, CI/CD, deployment, database optimization, and scalable system design." },
];

export const leadership = ["Interim Head, Google Developer Groups on Campus-JEC", "Club Head, JEC-GLUG", "Club Head, Antarikhya-JEC", "PR-Head, DCODE-JEC", "Outreach Head, Avant Garde"];
export const leadershipSkills = ["Public speaking", "Team collaboration", "Content management", "Organizational leadership", "Event planning"];

export type DesignTrack = {
  title: string;
  artist: string;
  album: string;
  cover: string;
  url: string;
};

// Fill in your songs here. Leave `url` empty until you add an audio file or
// stream URL — the panel then falls back to opening the full playlist below.
// Leave `cover` empty to keep the existing cinematic midnight-dreamscape image.
export const designPlaylistUrl = "https://open.spotify.com/album/5T0Gt5JYXh6gEttuB8ujML?si=WvAFYdn0S0WbNzXjB2oO4g";

export const designPlaylist: DesignTrack[] = [
  { title: "Track 01", artist: "Artist name", album: "0.1 flaws and all", cover: "/images/album.jpeg", url: "" },
  { title: "Track 02", artist: "Artist name", album: "0.1 flaws and all", cover: "/images/album.jpeg", url: "" },
  { title: "Track 03", artist: "Artist name", album: "0.1 flaws and all", cover: "/images/album.jpeg", url: "" },
  { title: "Track 04", artist: "Artist name", album: "0.1 flaws and all", cover: "/images/album.jpeg", url: "" },
];
