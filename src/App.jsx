import React, { useState, useEffect, useRef } from "react";
import {
  FaLinkedin, FaGithub, FaEnvelope,
  FaHome, FaUser, FaCode, FaBriefcase,
  FaFolderOpen, FaTrophy, FaPaperPlane,
  FaMapMarkerAlt, FaExternalLinkAlt, FaCheckCircle,
  FaGraduationCap, FaAward, FaTerminal, FaLaptopCode, FaServer, FaDatabase, FaBrain
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { motion, useInView } from "framer-motion";
import './index.css';

/* ════════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════════ */

const NAV = [
  { id: 'hero',         label: 'Home',    shortLabel: 'Home',    Icon: FaHome       },
  { id: 'about',        label: 'About',   shortLabel: 'About',   Icon: FaUser       },
  { id: 'skills',       label: 'Skills',  shortLabel: 'Skills',  Icon: FaCode       },
  { id: 'experience',   label: 'Exp',     shortLabel: 'Exp',     Icon: FaBriefcase  },
  { id: 'projects',     label: 'Projects',shortLabel: 'Work',    Icon: FaFolderOpen },
  { id: 'achievements', label: 'Awards',  shortLabel: 'Awards',  Icon: FaTrophy     },
  { id: 'contact',      label: 'Contact', shortLabel: 'Contact', Icon: FaPaperPlane },
];

const ROLES = [
  "AI & Data Science Engineer",
  "Full Stack Developer",
  "Researcher & Open Source Contributor",
  "Backend Systems Engineer",
];

const SKILL_CATEGORIES = [
  { id: "all", label: "All Skills", Icon: FaLaptopCode },
  { id: "lang", label: "Languages", Icon: FaTerminal },
  { id: "ai", label: "ML & AI", Icon: FaBrain },
  { id: "web", label: "Web & Mobile", Icon: FaServer },
  { id: "db", label: "Databases & Tools", Icon: FaDatabase },
];

const SKILL_ITEMS = [
  { name: "Java", cat: "lang", level: "Advanced", desc: "Core OOP, Collections, Multi-threading" },
  { name: "C++", cat: "lang", level: "Advanced", desc: "Data Structures, Competitive Programming" },
  { name: "Python", cat: "lang", level: "Advanced", desc: "Data Analysis, ML Pipelines, Automation" },
  { name: "JavaScript", cat: "lang", level: "Proficient", desc: "ES6+, Async/Await, DOM Manipulation" },
  { name: "HTML5 & CSS3", cat: "lang", level: "Proficient", desc: "Responsive Design, Modern Layouts" },

  { name: "Generative AI", cat: "ai", level: "Advanced", desc: "LLMs, Prompt Engineering, RAG Systems" },
  { name: "Machine Learning", cat: "ai", level: "Proficient", desc: "Scikit-Learn, Regression, Classification" },
  { name: "Pandas & NumPy", cat: "ai", level: "Advanced", desc: "Data Cleaning, Telemetry Processing" },

  { name: "Spring Boot", cat: "web", level: "Advanced", desc: "REST Services, Spring Framework, Security" },
  { name: "Flutter", cat: "web", level: "Proficient", desc: "Cross-platform Mobile Development" },
  { name: "React.js", cat: "web", level: "Advanced", desc: "Component State, Hooks, Tailwind UI" },
  { name: "RESTful APIs", cat: "web", level: "Advanced", desc: "API Design, Integration, JSON" },
  { name: "Tailwind CSS & Bootstrap", cat: "web", level: "Advanced", desc: "Custom Design Systems, Responsive UI" },

  { name: "PostgreSQL & SQL", cat: "db", level: "Advanced", desc: "Complex Queries, Schema Design, Indexing" },
  { name: "MySQL", cat: "db", level: "Proficient", desc: "Relational Storage, Database Normalization" },
  { name: "JUnit", cat: "db", level: "Proficient", desc: "Java Unit Testing & Test Automation" },
  { name: "JMeter", cat: "db", level: "Proficient", desc: "API Performance & Load Testing" },
  { name: "Git & GitHub", cat: "db", level: "Advanced", desc: "Version Control, PR Workflows, CI/CD" },
  { name: "SEO Optimization", cat: "db", level: "Proficient", desc: "Search Engine Optimization & Web Performance" },
];

const EXPERIENCES = [
  {
    id: "edgeverve",
    role: "PDA Trainee (Product Developer Associate)",
    company: "EdgeVerve",
    type: "Apprenticeship",
    location: "Bangalore (Remote)",
    period: "Mar 2026 – Present",
    badge: "Current Role",
    summary: "Product Developer Associate Trainee building enterprise backend services with PostgreSQL, Java, and Spring Framework.",
    bulletPoints: [
      "Working on enterprise-grade software products using Java, Spring Framework, and PostgreSQL.",
      "Participating in backend API development, data storage design, and service integration.",
      "Collaborating on cloud-ready modules and automated testing workflows.",
    ],
    tags: ["PostgreSQL", "Spring Framework", "Java", "Enterprise Systems"],
  },
  {
    id: "iiser",
    role: "Project Intern",
    company: "Indian Institute of Science Education and Research (IISER), Pune",
    type: "Internship",
    location: "Pune (On-site)",
    period: "Feb 2024 – Aug 2024",
    badge: "Research Internship",
    summary: "Project Intern leading software & IoT integrations for environmental data collection and monitoring systems.",
    bulletPoints: [
      "Engineered IoT sensor telemetry data pipelines with Arduino and Python for real-time monitoring.",
      "Optimized data collection and telemetry processing algorithms for research experiments.",
      "Built analytics scripts for automated reporting and sensor data visualization.",
    ],
    tags: ["Internet of Things (IoT)", "Arduino", "Python", "Data Processing"],
  },
  {
    id: "spweb",
    role: "Project Intern",
    company: "SPWebConnect Solutions",
    type: "Internship",
    location: "Pune (Hybrid)",
    period: "Jun 2023 – Aug 2023",
    badge: "Web Internship",
    summary: "Project Intern developing responsive web pages, interactive websites, and Search Engine Optimization (SEO).",
    bulletPoints: [
      "Developed responsive frontend web pages and interactive UI layouts using HTML, CSS, JavaScript, and Bootstrap.",
      "Implemented Search Engine Optimization (SEO) techniques to improve page indexing and web performance.",
      "Collaborated on client website customization, cross-browser responsiveness, and UI assets.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Python", "SEO"],
  },
];

const PROJECTS = [
  {
    title: "PCMC JanConnect",
    sub: "Civic Grievance Redressal Portal",
    badge: "Full Stack Civic App",
    image: "/janconnect.png",
    desc: "A municipal web platform empowering citizens to submit, track, and resolve civic complaints in real-time with an administrative management dashboard.",
    highlights: [
      "Citizen ticket tracking with live status updates",
      "Admin workflow management & complaint assignment",
      "Role-based authentication & grievance analytics",
    ],
    tech: ["React", "HTML/CSS", "JavaScript", "MySQL", "Tailwind CSS"],
    github: "https://github.com/Damini3155/JanConnect",
  },
  {
    title: "IoT Smart City & Agriculture Platform",
    sub: "AI Sensor Telemetry & Analytics",
    badge: "IoT & AI Research",
    image: "/iot_smartcity.png",
    desc: "An intelligent environmental monitoring dashboard processing IoT telemetry for soil health, micro-climate analysis, and predictive crop analytics.",
    highlights: [
      "Real-time sensor telemetry data processing pipeline",
      "Predictive machine learning models for soil and weather data",
      "Automated alerts and graphical reporting suite",
    ],
    tech: ["Python", "Arduino", "IoT", "Scikit-Learn", "PostgreSQL"],
    github: "https://github.com/Damini3155",
  },
  {
    title: "Library Management System",
    sub: "Desktop Enterprise Application",
    badge: "Core Software Engineering",
    image: "/library_system.png",
    desc: "Full-featured desktop library administration system automating inventory tracking, student issue/return workflows, and fine calculation.",
    highlights: [
      "Automated issue & return date calculations",
      "Student record indexing & book catalog search engine",
      "Robust relational database persistence layer",
    ],
    tech: ["Java", "Swing", "MySQL", "JDBC"],
    github: "https://github.com/Damini3155/Library-System",
  },
];

const ACHIEVEMENTS = [
  {
    ico: "🎓", title: "Katalyst Scholar", org: "Katalyst India",
    badge: "Scholarship Award",
    desc: "Selected for the Katalyst India scholarship awarded for exceptional academic performance and technical leadership potential.",
  },
  {
    ico: "🎨", title: "Designer Secretary", org: "VISTA",
    badge: "Leadership Role",
    desc: "Led visual communication, creative branding, and design strategy for major institute tech and cultural conventions.",
  },
  {
    ico: "🌐", title: "Google Student Ambassador", org: "Google for Developers",
    badge: "Community Ambassador",
    desc: "Represented Google developer initiatives on campus, conducting hands-on tech workshops and developer sessions.",
  },
  {
    ico: "🎭", title: "Cultural Lead", org: "Byteminds Society",
    badge: "Society Lead",
    desc: "Drove student engagement, event management, and team-building activities as Cultural Lead at Byteminds Society.",
  },
];

/* ════════════════════════════════════════════════════════════
   HOOKS
════════════════════════════════════════════════════════════ */

function useTyping(words, tSpeed = 88, dSpeed = 45, pauseMs = 2200) {
  const [text,   setText]   = useState('');
  const [wi,     setWi]     = useState(0);
  const [del,    setDel]    = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const word = words[wi];
    const id = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setPaused(true);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === '') { setDel(false); setWi(i => (i + 1) % words.length); }
      }
    }, del ? dSpeed : tSpeed);
    return () => clearTimeout(id);
  }, [text, wi, del, paused, words, tSpeed, dSpeed]);

  useEffect(() => {
    if (!paused) return;
    const id = setTimeout(() => { setPaused(false); setDel(true); }, pauseMs);
    return () => clearTimeout(id);
  }, [paused, pauseMs]);

  return text;
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const update = () => {
      const mid = window.scrollY + window.innerHeight * 0.38;
      let best = ids[0], bestDelta = Infinity;
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.offsetTop;
        if (top <= mid && mid - top < bestDelta) { bestDelta = mid - top; best = id; }
      });
      setActive(best);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [ids]);
  return active;
}

/* ════════════════════════════════════════════════════════════
   UI HELPERS
════════════════════════════════════════════════════════════ */

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.52, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ pre, hi, badge }) {
  return (
    <Reveal className="mb-12 text-center md:text-left">
      {badge && (
        <span className="inline-block px-3 py-1 bg-cyan-950/80 border border-cyan-700/60 text-cyan-400 text-xs font-mono uppercase tracking-widest rounded-full mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
        {pre} <span className="text-cyan-400">{hi}</span>
      </h2>
      <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto md:mx-0" />
    </Reveal>
  );
}

/* ════════════════════════════════════════════════════════════
   PORTFOLIO MAIN COMPONENT
════════════════════════════════════════════════════════════ */

const NAV_IDS = NAV.map(n => n.id);

export default function Portfolio() {
  const active = useScrollSpy(NAV_IDS);
  const typed  = useTyping(ROLES);
  const [copied, setCopied] = useState(false);
  const [skillCat, setSkillCat] = useState("all");
  const [activeExp, setActiveExp] = useState(EXPERIENCES[0].id);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollTo = id =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const copyEmail = () => {
    navigator.clipboard.writeText('daminikarankal@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const filteredSkills = skillCat === "all"
    ? SKILL_ITEMS
    : SKILL_ITEMS.filter(s => s.cat === skillCat);

  const currentExp = EXPERIENCES.find(e => e.id === activeExp) || EXPERIENCES[0];

  return (
    <div
      className="min-h-screen cyber-bg-texture text-white selection:bg-cyan-500 selection:text-gray-950 relative overflow-hidden"
      style={{ paddingBottom: 'calc(4.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(650px at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.08), transparent 80%)`,
        }}
      />

      {/* Background Floating Orbs */}
      <div className="orb-1 top-20 left-[-150px]" />
      <div className="orb-2 top-[40%] right-[-180px]" />
      <div className="orb-1 bottom-40 left-10" />

      {/* ══════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="min-h-screen flex items-center px-6 py-24 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">

          {/* ── Hero Text Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 md:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gray-900/90 border border-cyan-500/40 rounded-full text-cyan-400 text-xs font-mono mb-4 shadow-lg shadow-cyan-500/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Available for Software &amp; AI Engineering
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-4">
              Damini<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Karankal</span>
            </h1>

            <div className="h-9 flex items-center mb-3">
              <span className="text-lg md:text-xl text-gray-300 font-medium">
                {typed}
                <span className="cursor-blink text-cyan-400 ml-px">|</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-xs mb-7 font-mono">
              <FaMapMarkerAlt className="text-cyan-500" />
              Pune, Maharashtra · Dr. D.Y. Patil Institute of Technology
            </div>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md mb-8">
              B.E. AI &amp; Data Science student. I build intelligent,
              scalable software — from enterprise backends to civic platforms and AI-driven systems.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400
                           text-gray-950 font-extrabold rounded-xl text-sm transition-all duration-200 hover:scale-105 shadow-xl shadow-cyan-500/25"
              >
                View Projects
              </button>
              <a
                href="https://github.com/Damini3155"
                target="_blank" rel="noopener noreferrer"
                className="px-5 py-3.5 bg-gray-900/90 border border-gray-700 hover:border-cyan-500 text-gray-200
                           hover:text-cyan-400 font-medium rounded-xl text-sm
                           transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/damini-karankal/"
                target="_blank" rel="noopener noreferrer"
                className="px-5 py-3.5 bg-gray-900/90 border border-gray-700 hover:border-cyan-500 text-gray-200
                           hover:text-cyan-400 font-medium rounded-xl text-sm
                           transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href="https://leetcode.com/u/Damini_Karankal/"
                target="_blank" rel="noopener noreferrer"
                className="px-5 py-3.5 bg-gray-900/90 border border-gray-700 hover:border-cyan-500 text-gray-200
                           hover:text-cyan-400 font-medium rounded-xl text-sm
                           transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <SiLeetcode className="text-amber-500" /> LeetCode
              </a>
            </div>
          </motion.div>

          {/* ── Hero Photo Right (Clean Static Frame) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-full pointer-events-none animate-pulse"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)' }}
              />
              <div className="w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border-4 border-cyan-500/70 shadow-[0_0_50px_rgba(6,182,212,0.38)] overflow-hidden relative z-10">
                <img
                  src="/damini.jpg"
                  alt="Damini Karankal"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        >
          <span style={{ fontSize: '9px' }} className="tracking-widest uppercase font-mono">scroll down</span>
          <div className="w-px h-5 bg-gradient-to-b from-cyan-500 to-transparent" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          ABOUT SECTION (Bento Grid Dashboard)
      ══════════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead badge="Overview" pre="About" hi="My Profile" />

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Tile 1: Main Bio (Spans 2 columns) */}
            <Reveal className="md:col-span-2">
              <div className="bento-card p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-700/60 flex items-center justify-center text-cyan-400">
                      <FaUser className="text-lg" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Engineering &amp; AI Focus</h3>
                      <p className="text-gray-400 text-xs font-mono">Damini Karankal</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
                    <p>
                      I am an <strong className="text-white">AI &amp; Data Science engineer</strong> focused on building reliable software,
                      scalable backend systems, and intelligent applications. My experience includes
                      working as a <strong className="text-cyan-400 font-medium">PDA Trainee (Product Developer Associate) at EdgeVerve</strong>, <strong className="text-cyan-400 font-medium">Project Intern at IISER Pune</strong>,
                      and <strong className="text-cyan-400 font-medium">Project Intern at SPWebConnect Solutions</strong>.
                    </p>
                    <p>
                      I work with Java, C++, Python, Spring Boot, REST APIs, SQL, PostgreSQL,
                      JavaScript, and Data Structures &amp; Algorithms—having solved 150+ questions on LeetCode—with a strong interest in backend engineering and AI-driven solutions. Beyond core development, I actively contribute to the tech ecosystem as an Open Source Contributor, collaborating on community-driven projects and tools.
                    </p>
                    <p>
                      Additionally, I contribute to technology and student communities as a Google Student Ambassador, Katalyst India Scholar, and Cultural Lead. I am driven by continuous learning, problem-solving, and building technology that transforms complex challenges into practical solutions.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-800">
                  <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono rounded-lg">
                    ⚡ Backend Architecture
                  </span>
                  <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono rounded-lg">
                    🤖 Generative AI &amp; RAG
                  </span>
                  <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono rounded-lg">
                    🌐 Web &amp; Mobile Development
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Tile 2: LeetCode Spotlight */}
            <Reveal delay={0.08}>
              <div className="bento-card p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/80 flex items-center justify-center text-amber-500">
                      <SiLeetcode className="text-xl" />
                    </div>
                    <span className="px-2.5 py-1 bg-amber-950/80 border border-amber-800 text-amber-400 text-xs font-mono rounded-full">
                      DSA Benchmark
                    </span>
                  </div>

                  <h3 className="text-gray-400 text-xs uppercase tracking-wider font-mono mb-1">Problem Solving</h3>
                  <div className="text-4xl font-black text-white mb-2">
                    150+ <span className="text-amber-500 text-lg font-bold">Solved</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">
                    Consistent problem solver focused on Data Structures, Algorithms, Arrays, Graphs, and Object-Oriented Design in Java &amp; C++.
                  </p>
                </div>

                <a
                  href="https://leetcode.com/u/Damini_Karankal/"
                  target="_blank" rel="noopener noreferrer"
                  className="w-full py-2.5 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-700/60
                             text-amber-400 font-bold rounded-xl text-xs flex items-center justify-center gap-2
                             transition-all duration-200"
                >
                  Visit LeetCode Profile <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>
            </Reveal>

            {/* Tile 3: Academics & Education */}
            <Reveal delay={0.12} className="md:col-span-2">
              <div className="bento-card p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
                    <FaGraduationCap className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">Academic Excellence</h3>
                    <p className="text-gray-400 text-xs font-mono">Formal Education</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gray-900/90 border border-gray-800 hover:border-cyan-500/50 transition-colors">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="text-white font-bold text-sm">B.E. AI &amp; Data Science</h4>
                      <span className="text-cyan-400 text-xs font-mono shrink-0">2024–2027</span>
                    </div>
                    <p className="text-cyan-400 font-semibold text-xs mb-1">
                      Dr. D.Y. Patil Institute of Technology, Pimpri, Pune
                    </p>
                    <div className="flex items-center justify-between text-xs mt-3 pt-2 border-t border-gray-800">
                      <span className="text-gray-400 font-mono">Current Score</span>
                      <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-400 font-bold rounded font-mono">
                        CGPA: 9.5 / 10
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900/90 border border-gray-800 hover:border-cyan-500/50 transition-colors">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="text-white font-bold text-sm">Diploma in IT</h4>
                      <span className="text-cyan-400 text-xs font-mono shrink-0">2021–2024</span>
                    </div>
                    <p className="text-cyan-400 font-semibold text-xs mb-1">
                      Government Polytechnic Pune
                    </p>
                    <div className="flex items-center justify-between text-xs mt-3 pt-2 border-t border-gray-800">
                      <span className="text-gray-400 font-mono">Final Grade</span>
                      <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-400 font-bold rounded font-mono">
                        91.33% Distinction
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Tile 4: Key Badges */}
            <Reveal delay={0.16}>
              <div className="bento-card p-6 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400">
                    <FaAward className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">Key Leadership</h3>
                    <p className="text-gray-400 text-xs font-mono">Community Roles</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    "Google Student Ambassador",
                    "Katalyst India Scholar",
                    "Cultural Lead · Byteminds",
                    "VISTA Designer Secretary",
                  ].map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-200 bg-gray-900/70 p-2.5 rounded-lg border border-gray-800">
                      <FaCheckCircle className="text-cyan-400 shrink-0 text-sm" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SKILLS SECTION (Tech Matrix Grid)
      ══════════════════════════════════════════════════ */}
      <section id="skills" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead badge="Tech Stack" pre="Technical" hi="Matrix" />

          {/* Category Filter Tabs */}
          <Reveal className="mb-10">
            <div className="flex flex-wrap justify-center md:justify-start gap-2 border-b border-gray-800 pb-4">
              {SKILL_CATEGORIES.map(cat => {
                const CatIcon = cat.Icon;
                const activeCat = skillCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSkillCat(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium font-mono flex items-center gap-2 transition-all duration-200 ${
                      activeCat
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-950 font-bold shadow-lg shadow-cyan-500/25"
                        : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
                    }`}
                  >
                    <CatIcon />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Skill Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSkills.map((sk, idx) => (
              <Reveal key={sk.name} delay={idx * 0.03}>
                <div className="bento-card p-4 h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">
                        {sk.name}
                      </h3>
                      <span className="px-2 py-0.5 bg-gray-900 border border-gray-800 text-cyan-400 font-mono text-[10px] rounded">
                        {sk.level}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{sk.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          EXPERIENCE SECTION (Split Dashboard Timeline)
      ══════════════════════════════════════════════════ */}
      <section id="experience" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead badge="Career" pre="Work" hi="Experience" />

          {/* Interactive Split Dashboard */}
          <div className="grid md:grid-cols-12 gap-8 items-start">

            {/* Left selector tabs */}
            <Reveal className="md:col-span-4 space-y-3">
              {EXPERIENCES.map(exp => {
                const isActive = activeExp === exp.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveExp(exp.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative ${
                      isActive
                        ? "bg-gray-900 border-cyan-500 shadow-xl shadow-cyan-500/15"
                        : "bg-gray-900/40 border-gray-800 hover:border-gray-700"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-cyan-400 rounded-r-full" />
                    )}
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                      {exp.period}
                    </span>
                    <h3 className="text-white font-bold text-base leading-snug">{exp.role}</h3>
                    <p className="text-gray-400 text-xs mt-1 font-medium">{exp.company}</p>
                  </button>
                );
              })}
            </Reveal>

            {/* Right details card showcase */}
            <Reveal delay={0.1} className="md:col-span-8">
              <div className="bento-card p-8 border-cyan-500/40">
                <div className="flex justify-between items-start flex-wrap gap-3 mb-4">
                  <div>
                    <span className="px-3 py-1 bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono text-xs rounded-full inline-block mb-2">
                      {currentExp.type} · {currentExp.badge}
                    </span>
                    <h3 className="text-2xl font-black text-white">{currentExp.role}</h3>
                    <p className="text-cyan-400 font-medium text-sm mt-0.5">
                      {currentExp.company} <span className="text-gray-500 font-normal">· {currentExp.location}</span>
                    </p>
                  </div>
                  <span className="px-3 py-1.5 bg-gray-900 border border-gray-800 text-gray-300 font-mono text-xs rounded-xl">
                    {currentExp.period}
                  </span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 bg-gray-900/60 p-4 rounded-xl border border-gray-800/80">
                  {currentExp.summary}
                </p>

                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Key Highlights &amp; Accomplishments</h4>
                <ul className="space-y-3 mb-8">
                  {currentExp.bulletPoints.map((pt, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center shrink-0 text-xs mt-0.5">
                        ✓
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-gray-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Technologies Employed</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentExp.tags.map((tg, i) => (
                      <span key={i} className="skill-matrix-chip">
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROJECTS SECTION (UI Mockup Showcase Grid)
      ══════════════════════════════════════════════════ */}
      <section id="projects" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead badge="Portfolio" pre="Featured" hi="Projects" />

          {/* Project Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 0.1}>
                <div className="bento-card overflow-hidden h-full flex flex-col justify-between group">
                  <div>
                    {/* UI Screenshot Banner */}
                    <div className="project-img-wrapper h-52 bg-gray-900 border-b border-gray-800 relative">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-gray-950/90 backdrop-blur-md border border-cyan-500/40 text-cyan-400 text-[11px] font-mono rounded-full font-bold">
                        {p.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors mb-1">
                        {p.title}
                      </h3>
                      <p className="text-cyan-500 text-xs font-mono font-medium mb-3">{p.sub}</p>
                      <p className="text-gray-300 text-xs leading-relaxed mb-4">{p.desc}</p>

                      <ul className="space-y-2 mb-6 border-t border-gray-800/80 pt-4">
                        {p.highlights.map((h, k) => (
                          <li key={k} className="text-xs text-gray-300 flex items-start gap-2">
                            <span className="text-cyan-400 shrink-0 font-bold">✦</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.tech.map((t, k) => (
                        <span key={k} className="px-2.5 py-1 bg-gray-900 border border-gray-800 text-cyan-400 text-[11px] font-mono rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={p.github}
                      target="_blank" rel="noopener noreferrer"
                      className="w-full py-3 bg-gray-900 hover:bg-cyan-500 hover:text-gray-950 border border-gray-800 hover:border-cyan-400
                                 text-gray-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      <FaGithub className="text-base" /> View Source Code <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ACHIEVEMENTS SECTION (Trophy Cabinet Grid)
      ══════════════════════════════════════════════════ */}
      <section id="achievements" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead badge="Recognition" pre="Honors &amp;" hi="Leadership" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACHIEVEMENTS.map((a, idx) => (
              <Reveal key={a.title} delay={idx * 0.08}>
                <div className="bento-card p-6 h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-3xl p-2 bg-gray-900 rounded-xl border border-gray-800">{a.ico}</span>
                      <span className="px-2.5 py-1 bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono rounded-full">
                        {a.badge}
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-base group-hover:text-cyan-400 transition-colors mb-1">
                      {a.title}
                    </h3>
                    <p className="text-cyan-500 font-mono text-xs mb-3">{a.org}</p>
                    <p className="text-gray-300 text-xs leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONTACT SECTION (Interactive Action Center)
      ══════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionHead badge="Connect" pre="Get In" hi="Touch" />

          <Reveal>
            <p className="text-gray-300 text-sm md:text-base mb-12 max-w-xl mx-auto leading-relaxed">
              I'm actively seeking opportunities in Software Engineering, Backend Architecture &amp; AI Systems.
              Let's connect and build something extraordinary!
            </p>
          </Reveal>

          {/* Action Pad Grid */}
          <Reveal delay={0.08} className="mb-12">
            <div className="grid sm:grid-cols-3 gap-5 text-left">
              {/* Email */}
              <button
                onClick={copyEmail}
                className="bento-card p-6 flex flex-col items-center gap-3 text-center group w-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <FaEnvelope className="text-xl" />
                </div>
                <span className="text-gray-400 text-xs uppercase tracking-widest font-mono">Email Address</span>
                <span className="text-white text-xs font-bold truncate max-w-full">daminikarankal@gmail.com</span>
                <span
                  className="text-xs font-mono font-medium transition-colors"
                  style={{ color: copied ? '#22d3ee' : '#6b7280' }}
                >
                  {copied ? '✓ Copied to Clipboard!' : 'Click to copy'}
                </span>
              </button>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/damini-karankal/"
                target="_blank" rel="noopener noreferrer"
                className="bento-card p-6 flex flex-col items-center gap-3 text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <FaLinkedin className="text-xl" />
                </div>
                <span className="text-gray-400 text-xs uppercase tracking-widest font-mono">LinkedIn</span>
                <span className="text-white text-xs font-bold">damini-karankal</span>
                <span className="text-cyan-400 text-xs font-mono">Connect Profile →</span>
              </a>

              {/* LeetCode */}
              <a
                href="https://leetcode.com/u/Damini_Karankal/"
                target="_blank" rel="noopener noreferrer"
                className="bento-card p-6 flex flex-col items-center gap-3 text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                  <SiLeetcode className="text-xl" />
                </div>
                <span className="text-gray-400 text-xs uppercase tracking-widest font-mono">LeetCode</span>
                <span className="text-white text-xs font-bold">Damini_Karankal</span>
                <span className="text-amber-400 text-xs font-mono">150+ Solved →</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=daminikarankal@gmail.com"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400
                         text-gray-950 font-black rounded-2xl text-sm transition-all duration-200 hover:scale-105 shadow-xl shadow-cyan-500/25"
            >
              <FaPaperPlane /> Direct Email Compose
            </a>
          </Reveal>

          {/* Footer */}
          <Reveal delay={0.2}>
            <div className="mt-20 pt-8 border-t border-gray-800/80">
              <p className="text-gray-400 text-sm font-medium">Damini Karankal · AI &amp; Data Science Engineer</p>
              <p className="text-gray-600 text-xs mt-1 font-mono">© 2026 · Built with React &amp; Tailwind CSS</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM DOCK NAVIGATION
      ══════════════════════════════════════════════════ */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 nav-bottom">
        <div className="max-w-2xl mx-auto px-1">
          <div className="flex items-stretch justify-around">
            {NAV.map(({ id, label, Icon }) => {
              const on = active === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`nav-btn${on ? ' nav-btn-active' : ''}`}
                  aria-label={label}
                  aria-current={on ? 'page' : undefined}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-label">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

    </div>
  );
}
