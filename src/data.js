export const profile = {
  name: "Hardik Shandilya",
  roles: [
    "Full Stack Developer",
    "AI Product Builder",
    "Hackathon Winner",
    "Real-time Systems Tinkerer",
  ],
  tagline:
    "I build AI-powered products end to end — from React canvases and streaming Node backends to RAG pipelines and ML-driven security. Currently shipping at City Future Labs, IIT Kharagpur.",
  email: "hardikshandilya021@gmail.com",
  phone: "+91 92442 91908",
  github: "https://github.com/devhardik21",
  linkedin: "https://linkedin.com/in/hardik-shandilya",
  location: "Durg, India",
};

export const stats = [
  { n: 3, suffix: "", label: "Internships shipped" },
  { n: 4, suffix: "", label: "Hackathon placements" },
  { n: 5000, suffix: "+", label: "Canvas objects rendered" },
  { n: 90, suffix: "%", label: "Less manual content time" },
];

export const experience = [
  {
    company: "City Future Labs, IIT Kharagpur",
    role: "Full Stack Development Intern",
    period: "Jun 2026 — Present",
    place: "India",
    points: [
      "Built data ingestion and preprocessing pipelines to structure and validate input data for machine learning models, improving data readiness for downstream training.",
      "Automated bus transit timetable generation in Python (ReportLab), merging data across multiple source tables into a pixel-accurate, color-coded PDF layout.",
      "Shipped frontend UI updates and backend REST APIs, wiring both together for seamless real-time data flow between client and server.",
    ],
    tags: ["Python", "ReportLab", "REST APIs", "Data Pipelines"],
  },
  {
    company: "RootVestors",
    role: "Software Development Engineer Intern",
    period: "Dec 2025 — Jun 2026",
    place: "India",
    points: [
      "Engineered an AI-powered digital canvas with React, Electron and Tldraw that lets educators generate diagrams from natural language — cutting manual content creation time by 90%.",
      "Integrated Google Gemini 2.5 Flash for a multimodal Smart Context system that captures canvas regions as base64 images to interpret drawings and handwritten annotations.",
      "Architected a Node.js backend using Server-Sent Events (SSE) to stream AI responses into automated canvas actions.",
      "Built an Electron desktop app rendering 5000+ canvas objects smoothly on the Tldraw persistence engine.",
    ],
    tags: ["React", "Electron", "Tldraw", "Gemini 2.5 Flash", "Node.js", "SSE"],
  },
  {
    company: "LogixHunt",
    role: "MERN Stack Developer",
    period: "May 2025 — Aug 2025",
    place: "India",
    points: [
      "Engineered a scalable e-commerce ecosystem with a custom storefront and admin dashboard for inventory tracking, sales analytics and fulfillment.",
      "Developed admin modules with RBAC and JWT authentication for secure data management and granular permissions for store managers and staff.",
      "Integrated optimized REST APIs with Redux, reducing frontend rendering lag and improving MongoDB query efficiency by 25% on high-traffic product listings.",
    ],
    tags: ["MongoDB", "Express", "React", "Node.js", "Redux", "JWT"],
  },
];

export const projects = [
  {
    title: "AuthKavach",
    kicker: "Real-time adaptive security",
    blurb:
      "A hybrid risk engine that scores every login in real time and decides whether to allow, challenge with MFA, or block — before an attacker gets in.",
    points: [
      "ML anomaly detection assigns a 0–100 risk score per login, auto-blocking or triggering MFA on high-risk events.",
      "Multi-dimensional threat detection across device fingerprinting, IP velocity and geolocation.",
      "Real-time alerting with Socket.io and Redis for automated IP blocking with sub-second response.",
    ],
    metric: { value: "0–100", label: "live risk score per login" },
    tags: ["Node.js", "Express", "Redis", "ML", "Socket.io"],
    accent: "violet",
  },
  {
    title: "Askly AI",
    kicker: "Chat with your documents",
    blurb:
      "A retrieval-augmented generation app that answers questions from your PDFs and shows you exactly where each answer came from.",
    points: [
      "RAG pipeline on Llama-3-8B and ChromaDB, tuned for low-latency vector retrieval.",
      "Semantic search with Sentence Transformers (384-dim embeddings) and optimized chunking — 35% better retrieval accuracy than keyword search.",
      "React interface with real-time chat and a synchronized PDF viewer for citation mapping, so users can verify every answer against the source.",
    ],
    metric: { value: "+35%", label: "retrieval accuracy vs keyword" },
    tags: ["RAG", "Llama-3", "ChromaDB", "React", "Sentence Transformers"],
    accent: "cyan",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["C/C++", "JavaScript", "Java", "Python", "SQL"],
  },
  {
    group: "Frontend",
    items: ["React.js", "Electron", "Three.js", "D3.js", "Redux"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "JWT", "SSE"],
  },
  {
    group: "AI / Data",
    items: [
      "RAG",
      "Llama-3",
      "Gemini 2.5 Flash",
      "ChromaDB",
      "Sentence Transformers",
      "pandas",
      "NumPy",
    ],
  },
  {
    group: "Tools & Infra",
    items: ["Git", "Docker", "GCP", "Redis", "MongoDB", "Agora"],
  },
];

export const achievements = [
  {
    rank: "2nd",
    title: "Smart India Hackathon 2025",
    note: "Finished 2nd out of 130 teams solving national government problems.",
  },
  {
    rank: "1st",
    title: "Navonmesh 3.0 Hackathon",
    note: "Secured top rank among 60 teams for scalable software architecture.",
  },
  {
    rank: "Top 3",
    title: "Shark Tank Rungta",
    note: "Pitched a technical MVP recognized for market viability and scalability.",
  },
  {
    rank: "Top 6",
    title: "Prayatna IEEE Hackathon",
    note: "Ranked top 6 out of 50 teams for rapid full-stack prototyping.",
  },
];

export const education = [
  {
    school: "Bhilai Institute of Technology",
    degree: "B.Tech in CSE (Data Science)",
    period: "Sept 2023 — May 2027",
    score: "CPI 8.59",
    place: "Durg, India",
  },
  {
    school: "SNGVB",
    degree: "Senior Secondary Education",
    period: "Feb 2022 — Mar 2023",
    score: "82%",
    place: "Durg, India",
  },
];

export const marquee = [
  "React",
  "Node.js",
  "Python",
  "Electron",
  "Tldraw",
  "Gemini",
  "Llama-3",
  "ChromaDB",
  "Redis",
  "MongoDB",
  "Docker",
  "GCP",
  "Socket.io",
  "Three.js",
  "D3.js",
  "Express",
];
