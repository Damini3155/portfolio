import React, { useState, useEffect, useRef } from "react";
import {
  FaLinkedin, FaGithub, FaEnvelope,
  FaHome, FaUser, FaCode, FaBriefcase,
  FaFolderOpen, FaTrophy, FaPaperPlane,
  FaMapMarkerAlt,
} from "react-icons/fa";
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
  "Backend Developer",
  "Problem Solver",
];

const SKILLS = [
  { cat: "Languages", e: "⌨️", items: ["C++", "Java", "Python", "JavaScript"] },
  { cat: "Frontend",  e: "🖥️", items: ["React", "Flutter", "HTML", "CSS"] },
  { cat: "Backend",   e: "⚙️", items: ["Spring", "Spring Boot", "REST APIs", "Microservices"] },
  { cat: "Databases", e: "🗄️", items: ["SQL", "PostgreSQL", "Firebase"] },
  { cat: "Testing",   e: "🧪", items: ["JUnit", "JMeter", "Debugging", "Functional Testing"] },
  { cat: "Core CS",   e: "🧠", items: ["DSA", "OOP", "OS", "DBMS", "Problem Solving"] },
  { cat: "Tools",     e: "🛠️", items: ["Git", "GitHub", "Postman", "VS Code"] },
];

const EXPERIENCE = [
  {
    co:   "EdgeVerve Systems Limited",
    role: "Trainee · Product Developer Associate (PDA)",
    when: "2026",
    loc:  "Pune",
    pts: [
      "Enterprise software training focused on Java, Spring, Spring Boot, REST APIs, SQL, PostgreSQL, and microservices.",
      "Developed and integrated REST APIs and backend services with relational data and application workflows.",
      "Applied OOP, DSA, testing, debugging, and modular design to build reliable software components.",
    ],
    tags: ["Java", "Spring Boot", "REST APIs", "PostgreSQL", "Microservices"],
  },
  {
    co:   "IISER, Pune",
    role: "Project Intern",
    when: "Feb 2024 – May 2024",
    loc:  "Pune",
    pts: [
      "Developed an IoT-based smart farming system with real-time sensor data displayed on a remote device.",
      "Implemented real-time data processing and system integration for reliable agricultural monitoring.",
    ],
    tags: ["IoT", "Embedded Systems", "Real-time Data", "Sensors"],
  },
  {
    co:   "SPWebConnect Solutions",
    role: "Full Stack Project Intern",
    when: "Jun 2023 – Aug 2023",
    loc:  "Pune",
    pts: [
      "Built responsive full-stack web applications using React, Node.js, JavaScript, HTML, CSS, and MongoDB.",
      "Integrated frontend components with backend services and APIs.",
      "Performed debugging and testing to resolve application issues and improve functionality.",
    ],
    tags: ["React", "Node.js", "MongoDB", "JavaScript", "HTML/CSS"],
  },
];

const PROJECTS = [
  {
    num:   "01",
    title: "PCMC JanConnect",
    sub:   "Civic Issue Reporting & Resolution Platform",
    year:  "2026",
    desc:  "A full-stack civic platform for reporting, tracking, assigning, and resolving municipal issues. Features GPS-based location capture, reverse geocoding, role-based authentication, and real-time status tracking.",
    highlights: [
      "Role-based workflows for citizens, admins & field workers",
      "GPS + reverse geocoding for precise issue location",
      "Firebase-powered real-time status tracking",
    ],
    tags:  ["Flutter", "Firebase", "GPS", "REST APIs", "Role-based Auth"],
  },
  {
    num:   "02",
    title: "CommuniAI",
    sub:   "AI-Based Mock Interview & Evaluation System",
    year:  "2025",
    desc:  "An intelligent mock interview platform that provides structured feedback and candidate performance evaluation. Implements APIs for speech/NLP analysis, feedback generation, and secure data storage.",
    highlights: [
      "AI-powered question generation from candidate profile",
      "Real-time speech & NLP-based evaluation",
      "Structured feedback reports for self-improvement",
    ],
    tags:  ["AI/ML", "Python", "NLP", "REST APIs", "Feedback Generation"],
  },
];

const ACHIEVEMENTS = [
  {
    ico: "🎓", title: "Student Ambassador", org: "Google",
    desc: "Selected as a Google Student Ambassador, representing Google technologies and programs on campus.",
  },
  {
    ico: "💡", title: "Technology Contributor", org: "S4DS DIT",
    desc: "Recognized contributor in the Society for Data Science at DIT, driving technical initiatives.",
  },
  {
    ico: "🏅", title: "Katalyst India Scholar", org: "Katalyst India",
    desc: "Recipient of the Katalyst India scholarship, awarded for academic excellence and leadership.",
  },
  {
    ico: "🎨", title: "Designer Secretary", org: "VISTA",
    desc: "Leading visual communication and creative design for college events as Designer Secretary.",
  },
  {
    ico: "🎭", title: "Cultural Lead", org: "Byteminds Society",
    desc: "Driving cultural engagement and community-building initiatives at Byteminds Society.",
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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ pre, hi }) {
  return (
    <Reveal className="mb-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
        {pre} <span className="text-cyan-400">{hi}</span>
      </h2>
      <div className="w-14 h-1 bg-cyan-500 rounded-full" />
    </Reveal>
  );
}

/* ════════════════════════════════════════════════════════════
   PORTFOLIO
════════════════════════════════════════════════════════════ */

const NAV_IDS = NAV.map(n => n.id);

export default function Portfolio() {
  const active = useScrollSpy(NAV_IDS);
  const typed  = useTyping(ROLES);
  const [copied, setCopied] = useState(false);

  const scrollTo = id =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const copyEmail = () => {
    navigator.clipboard.writeText('daminikarankal@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="min-h-screen bg-gray-950 text-white"
      style={{ paddingBottom: 'calc(4.5rem + env(safe-area-inset-bottom, 0px))' }}
    >

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="hero-grid-bg min-h-screen flex items-center px-6 py-24 relative overflow-hidden"
      >
        {/* Radial ambient glows */}
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">

          {/* ── Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1"
          >
            <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-3">
              Hello, I'm
            </p>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
              Damini<br />
              <span className="text-cyan-400">Karankal</span>
            </h1>

            <div className="h-9 flex items-center mb-2">
              <span className="text-lg md:text-xl text-gray-300 font-medium">
                {typed}
                <span className="cursor-blink text-cyan-400 ml-px">|</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-7 font-mono">
              <FaMapMarkerAlt className="text-cyan-600" />
              Pune, Maharashtra
            </div>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mb-8">
              B.E. AI &amp; Data Science student with a CGPA of 9.6. I build intelligent,
              scalable software — from enterprise backends to civic platforms and AI-driven systems.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold
                           rounded-xl text-sm transition-all duration-200 hover:scale-105"
                style={{ boxShadow: '0 0 0 0 rgba(6,182,212,0.4)' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(6,182,212,0.35)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 0 rgba(6,182,212,0.4)'}
              >
                View Projects
              </button>
              <a
                href="https://github.com/Damini3155"
                target="_blank" rel="noopener noreferrer"
                className="px-5 py-3 border border-gray-700 hover:border-cyan-500 text-gray-300
                           hover:text-cyan-400 font-medium rounded-xl text-sm
                           transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/daminikarankal"
                target="_blank" rel="noopener noreferrer"
                className="px-5 py-3 border border-gray-700 hover:border-cyan-500 text-gray-300
                           hover:text-cyan-400 font-medium rounded-xl text-sm
                           transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* ── Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Outer glow */}
              <div
                className="absolute -inset-8 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)' }}
              />
              {/* Spinning ring */}
              <div className="photo-ring-wrap">
                <div className="photo-inner w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                  <img
                    src="https://i.pinimg.com/736x/56/40/ee/5640ee5bf4bc165d77f4c295c6c02c2f.jpg"
                    alt="Damini Karankal"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600"
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <span style={{ fontSize: '9px' }} className="tracking-widest uppercase font-mono">scroll</span>
          <div className="w-px h-5 bg-gradient-to-b from-gray-600 to-transparent" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6" style={{ background: 'rgba(17,24,39,0.5)' }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead pre="About" hi="Me" />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <Reveal>
                <p>
                  I'm an AI &amp; Data Science engineering student at Dr. D.Y. Patil Institute of
                  Technology, Pimpri, maintaining a CGPA of 9.6. My foundation was built at
                  Government Polytechnic Pune, where I earned a Diploma in IT with 91.33%.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <p>
                  I've worked across enterprise software at EdgeVerve Systems, IoT research at
                  IISER Pune, and full-stack development at SPWebConnect Solutions — giving me
                  hands-on experience across the full software lifecycle, from architecture to deployment.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p>
                  Beyond code, I'm a Google Student Ambassador, Katalyst India Scholar, and
                  Cultural Lead — because I believe the best engineers are also strong communicators
                  and community builders.
                </p>
              </Reveal>
            </div>

            <div className="space-y-5">
              {/* Stat highlights */}
              <Reveal>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: "9.6",  l: "CGPA",       s: "B.E. AI & DS"       },
                    { v: "91%",  l: "Diploma",     s: "Govt. Polytechnic"  },
                    { v: "3",    l: "Internships", s: "Industry XP"        },
                    { v: "2+",   l: "Projects",    s: "Major Builds"       },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="bg-gray-800 border border-gray-700 hover:border-cyan-500 card-glow
                                 rounded-xl p-4 text-center"
                    >
                      <div className="text-2xl font-black text-cyan-400">{s.v}</div>
                      <div className="text-white font-semibold text-xs mt-0.5">{s.l}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{s.s}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Education */}
              <Reveal delay={0.08}>
                <p className="text-white font-bold text-sm mb-3">Education</p>
                <div className="space-y-3">
                  {[
                    {
                      deg: "B.E. in Artificial Intelligence & Data Science",
                      sch: "Dr. D.Y. Patil Institute of Technology, Pimpri",
                      yr: "2024–2027", gr: "CGPA: 9.6/10",
                    },
                    {
                      deg: "Diploma in Information Technology",
                      sch: "Government Polytechnic Pune",
                      yr: "2021–2024", gr: "91.33%",
                    },
                  ].map((e, i) => (
                    <div
                      key={i}
                      className="bg-gray-800 border border-gray-700 hover:border-cyan-500 card-glow rounded-xl p-4"
                    >
                      <div className="flex justify-between items-start gap-2 flex-wrap">
                        <p className="text-white font-semibold text-sm">{e.deg}</p>
                        <span className="text-cyan-400 text-xs font-mono shrink-0">{e.yr}</span>
                      </div>
                      <p className="text-gray-400 text-xs mt-0.5 mb-1">{e.sch}</p>
                      <span className="text-cyan-400 font-bold text-sm">{e.gr}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SKILLS
      ══════════════════════════════════════════════════ */}
      <section id="skills" className="py-24 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <SectionHead pre="Technical" hi="Skills" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SKILLS.map((g, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div
                  className="bg-gray-800 border border-gray-700 hover:border-cyan-500 card-glow
                             rounded-2xl p-5 h-full hover:-translate-y-1 transition-transform duration-200"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">{g.e}</span>
                    <span className="text-cyan-400 font-semibold text-xs uppercase tracking-wider">{g.cat}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((item, j) => (
                      <span key={j} className="skill-chip">{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          EXPERIENCE
      ══════════════════════════════════════════════════ */}
      <section id="experience" className="py-24 px-6" style={{ background: 'rgba(17,24,39,0.5)' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHead pre="Work" hi="Experience" />

          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className="absolute left-4 top-3 bottom-3 w-px"
              style={{ background: 'linear-gradient(to bottom, #06b6d4, rgba(6,182,212,0.25), transparent)' }}
            />

            <div className="space-y-8">
              {EXPERIENCE.map((e, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="pl-12 relative">
                    {/* Timeline dot */}
                    <div
                      className="absolute left-0 top-4 w-8 h-8 rounded-full bg-gray-950 border-2 border-cyan-500
                                 flex items-center justify-center"
                      style={{ boxShadow: '0 0 14px rgba(6,182,212,0.28)' }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    </div>

                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="bg-gray-800 border border-gray-700 hover:border-cyan-500 card-glow-lg rounded-2xl p-6"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-0.5">
                        <h3 className="text-white font-bold text-base md:text-lg">{e.co}</h3>
                        <span
                          className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded-md shrink-0"
                          style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)' }}
                        >
                          {e.when}
                        </span>
                      </div>
                      <p className="text-cyan-300 text-sm font-medium mb-1">{e.role}</p>
                      <div className="flex items-center gap-1 text-gray-600 text-xs mb-4">
                        <FaMapMarkerAlt className="text-cyan-800 text-[10px]" /> {e.loc}
                      </div>
                      <ul className="space-y-2 mb-4">
                        {e.pts.map((pt, j) => (
                          <li key={j} className="text-gray-400 text-sm flex gap-2 leading-relaxed">
                            <span className="text-cyan-500 shrink-0 mt-0.5">›</span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {e.tags.map((t, j) => (
                          <span
                            key={j}
                            className="px-2 py-0.5 text-xs text-cyan-400 rounded-md"
                            style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.22)' }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════════════ */}
      <section id="projects" className="py-24 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <SectionHead pre="Featured" hi="Projects" />

          <div className="grid md:grid-cols-2 gap-7">
            {PROJECTS.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -7 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                  className="bg-gray-800 border border-gray-700 hover:border-cyan-500 card-glow-lg
                             rounded-2xl p-7 h-full flex flex-col group"
                >
                  {/* Number + year */}
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className="text-5xl font-black leading-none select-none transition-colors duration-300"
                      style={{ color: 'rgba(6,182,212,0.16)' }}
                    >
                      {p.num}
                    </span>
                    <span className="text-gray-600 text-sm font-mono">{p.year}</span>
                  </div>

                  <h3 className="text-white text-xl font-bold mb-1 group-hover:text-cyan-50 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium mb-3">{p.sub}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.desc}</p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-5 flex-grow">
                    {p.highlights.map((h, j) => (
                      <li key={j} className="text-gray-500 text-xs flex gap-2 items-start">
                        <span className="text-cyan-600 shrink-0 mt-0.5">✦</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {p.tags.map((t, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-1 bg-gray-700 text-gray-300 text-xs rounded-lg border border-gray-600
                                   group-hover:border-gray-500 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ACHIEVEMENTS
      ══════════════════════════════════════════════════ */}
      <section id="achievements" className="py-24 px-6" style={{ background: 'rgba(17,24,39,0.5)' }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead pre="Honors &" hi="Leadership" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                  className="bg-gray-800 border border-gray-700 hover:border-cyan-500 card-glow
                             rounded-2xl p-6 h-full"
                >
                  <div className="text-3xl mb-4">{a.ico}</div>
                  <h3 className="text-white font-bold text-sm mb-1">{a.title}</h3>
                  <p
                    className="text-xs font-semibold mb-3 uppercase tracking-wide"
                    style={{ color: '#22d3ee' }}
                  >
                    {a.org}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6 bg-gray-950">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHead pre="Get in" hi="Touch" />

          <Reveal>
            <p className="text-gray-400 text-sm md:text-base mb-10 max-w-lg mx-auto">
              Open to opportunities, collaborations, and good conversations. Feel free to reach out!
            </p>
          </Reveal>

          {/* Contact cards */}
          <Reveal delay={0.08}>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {/* Email — with copy */}
              <button
                onClick={copyEmail}
                className="bg-gray-800 border border-gray-700 hover:border-cyan-500 card-glow rounded-2xl p-5
                           flex flex-col items-center gap-3 transition-all duration-200 hover:-translate-y-1 group w-full"
              >
                <FaEnvelope className="text-3xl text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-500 text-xs uppercase tracking-widest font-mono">Email</span>
                <span className="text-white text-xs font-medium break-all text-center">
                  daminikarankal@gmail.com
                </span>
                <span
                  className="text-xs font-mono transition-all duration-200"
                  style={{ color: copied ? '#22d3ee' : '#4b5563' }}
                >
                  {copied ? '✓ Copied!' : 'Click to copy'}
                </span>
              </button>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/daminikarankal"
                target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 border border-gray-700 hover:border-cyan-500 card-glow rounded-2xl p-5
                           flex flex-col items-center gap-3 transition-all duration-200 hover:-translate-y-1 group"
              >
                <FaLinkedin className="text-3xl text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-500 text-xs uppercase tracking-widest font-mono">LinkedIn</span>
                <span className="text-white text-xs font-medium">daminikarankal</span>
                <span className="text-gray-600 text-xs font-mono">View Profile →</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Damini3155"
                target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 border border-gray-700 hover:border-cyan-500 card-glow rounded-2xl p-5
                           flex flex-col items-center gap-3 transition-all duration-200 hover:-translate-y-1 group"
              >
                <FaGithub className="text-3xl text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-500 text-xs uppercase tracking-widest font-mono">GitHub</span>
                <span className="text-white text-xs font-medium">Damini3155</span>
                <span className="text-gray-600 text-xs font-mono">View Profile →</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=daminikarankal@gmail.com"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400
                         text-gray-950 font-bold rounded-xl text-sm transition-all duration-200 hover:scale-105"
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(6,182,212,0.35)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <FaEnvelope /> Send a Message
            </a>
          </Reveal>

          {/* Footer */}
          <Reveal delay={0.2}>
            <div className="mt-16 pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-sm">Damini Karankal · AI &amp; Data Science Engineer</p>
              <p className="text-gray-700 text-xs mt-1">© 2026 · Built with React &amp; ♥</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM NAVIGATION
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
