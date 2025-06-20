import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import './index.css';

export default function Portfolio() {
  const projects = [
    {
      title: "CommuniAI",
      tools: "React, Python, Whisper API, Chart.js",
      description:
        "Developed a full-stack app for audio/video transcription and analysis. Integrated NLP and visualization dashboards.",
      outcome: "Helped students review lecture content efficiently."
    },
    {
      title: "AI Career Guidance Web App",
      tools: "HTML/CSS, Node.js, AI models",
      description:
        "Designed a system that recommends careers based on aptitude scores and answers.",
      outcome: "Enhanced clarity for students choosing tech paths."
    },
    {
      title: "Resume Interview Question Generator",
      tools: "Python, NLP, PDFParser",
      description:
        "Created a tool that reads resumes and generates personalized interview questions.",
      outcome: "Assists job seekers in self-preparation for interviews."
    }
  ];

  const skills = [
    {
      title: "Graphic Design",
      description: "Creating visually compelling digital designs using Canva and Figma 🎨",
      percent: 98
    },
    {
      title: "Frontend Development",
      description: "Crafting stunning, user-friendly interfaces with React.JS 🔥",
      percent: 95
    },
    {
      title: "Full Stack Development",
      description: "The Complete Development from Prototyping to Deployment using MERN 🌿",
      percent: 80
    },
    {
      title: "Data Analysis",
      description: "Analyzing data sets using Python, Pandas & visualization libraries 📊",
      percent: 75
    },
    {
      title: "Backend Development",
      description: "Developing scalable server-side logic and databases with Node.JS 🌏",
      percent: 60
    },
    {
      title: "DSA (C++)",
      description: "Solving algorithmic problems in C++ focusing on strong problem-solving skills 🌈",
      percent: 30
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % projects.length);

  return (
    <>
      <header className="bg-gradient-to-r from-indigo-950 via-gray-900 to-indigo-950/80 fixed top-0 left-0 w-full z-50 shadow-lg backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
          <a href="#hero" className="text-2xl font-bold text-cyan-400 tracking-wide hover:text-cyan-300 transition duration-200">TechSX</a>
          <ul className="hidden md:flex space-x-8 text-sm font-medium">
            <li><a href="#hero" className="hover:text-cyan-300 transition duration-200">Home</a></li>
            <li><a href="#skills" className="hover:text-cyan-300 transition duration-200">Skills</a></li>
            <li><a href="#projects" className="hover:text-cyan-300 transition duration-200">Projects</a></li>
            <li><a href="#contact" className="hover:text-cyan-300 transition duration-200">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="pt-20 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white font-sans scroll-smooth">
        {/* Hero Section with Logo */}
        <section className="py-24 px-6 text-center md:text-left md:flex md:items-center md:justify-between max-w-6xl mx-auto">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight">
              <span className="block text-4xl md:text-5xl font-bold text-white mb-2">Hello, I'm Damini Karankal</span>
              <span className="block text-lg text-cyan-300">Founder of TechSX</span>
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              I'm a <span className="font-semibold text-white">Third Year Engineering Student</span> specializing in <span className="font-semibold text-white">Artificial Intelligence & Data Science</span>. Passionate about building intelligent, ethical, and scalable software. My journey spans from crafting full-stack applications to leveraging data for impact. I’m always eager to learn, contribute to open source, and grow professionally in the ever-evolving tech landscape.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
            <img
              src="https://i.pinimg.com/736x/10/48/1a/10481aa57c10e5b3259982b41b63850c.jpg"
              alt="Logo"
              className="w-56 h-56 rounded-full border-4 border-white shadow-xl object-cover"
            />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6 text-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-cyan-300">🚀 Things I Do</h2>
            <p className="text-gray-400 mb-12 text-sm max-w-xl mx-auto">
              Everything that I do and offer as a service — but I’m not bound to it! I adapt to new technologies as soon as I need to.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {skills.map((skill, idx) => (
                <div key={idx} className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-cyan-600/20 transition transform hover:scale-105 flex flex-col justify-between">
                  <h3 className="text-xl font-bold text-white mb-2">{skill.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{skill.description}</p>
                  <div className="text-left mt-auto">
                    <div className="flex justify-between mb-1 text-xs text-gray-300">
                      <span>{skill.percent}%</span><span>Specialization</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div className="bg-cyan-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${skill.percent}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* soft skills */}
        <section class="py-16 px-6 text-center bg-gray-900"><h2 class="text-3xl font-bold mb-10 text-cyan-300">🧠 Soft Skills</h2><div class="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8"><div class="relative w-32 h-32 mx-auto"><svg class="absolute top-0 left-0 w-full h-full transform rotate-[-90deg]"><circle cx="50%" cy="50%" r="45%" stroke="#2d3748" stroke-width="10" fill="none"></circle><circle cx="50%" cy="50%" r="45%" stroke="#06b6d4" stroke-width="10" fill="none" stroke-dasharray="282.6" stroke-dashoffset="28.3" stroke-linecap="round"></circle></svg><div class="absolute inset-0 flex flex-col items-center justify-center text-white"><span class="text-xl font-bold">90%</span><span class="text-xs mt-1">Communication</span></div></div><div class="relative w-32 h-32 mx-auto"><svg class="absolute top-0 left-0 w-full h-full transform rotate-[-90deg]"><circle cx="50%" cy="50%" r="45%" stroke="#2d3748" stroke-width="10" fill="none"></circle><circle cx="50%" cy="50%" r="45%" stroke="#06b6d4" stroke-width="10" fill="none" stroke-dasharray="282.6" stroke-dashoffset="42.4" stroke-linecap="round"></circle></svg><div class="absolute inset-0 flex flex-col items-center justify-center text-white"><span class="text-xl font-bold">85%</span><span class="text-xs mt-1">Teamwork</span></div></div><div class="relative w-32 h-32 mx-auto"><svg class="absolute top-0 left-0 w-full h-full transform rotate-[-90deg]"><circle cx="50%" cy="50%" r="45%" stroke="#2d3748" stroke-width="10" fill="none"></circle><circle cx="50%" cy="50%" r="45%" stroke="#06b6d4" stroke-width="10" fill="none" stroke-dasharray="282.6" stroke-dashoffset="56.5" stroke-linecap="round"></circle></svg><div class="absolute inset-0 flex flex-col items-center justify-center text-white"><span class="text-xl font-bold">80%</span><span class="text-xs mt-1">Adaptability</span></div></div><div class="relative w-32 h-32 mx-auto"><svg class="absolute top-0 left-0 w-full h-full transform rotate-[-90deg]"><circle cx="50%" cy="50%" r="45%" stroke="#2d3748" stroke-width="10" fill="none"></circle><circle cx="50%" cy="50%" r="45%" stroke="#06b6d4" stroke-width="10" fill="none" stroke-dasharray="282.6" stroke-dashoffset="28.3" stroke-linecap="round"></circle></svg><div class="absolute inset-0 flex flex-col items-center justify-center text-white"><span class="text-xl font-bold">90%</span><span class="text-xs mt-1">Problem Solving</span></div></div></div></section>

        {/* Projects Section - Slider Version */}
        <section id="projects" className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-cyan-300 mb-12">🚀 Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 150 }}
                  className="bg-gray-800 p-6 rounded-xl shadow-xl text-left flex flex-col justify-between hover:shadow-cyan-700/30 border border-gray-700 hover:border-cyan-500"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-xs text-gray-400 italic mb-2">{project.tools}</p>
                    <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  </div>
                  <div className="text-green-400 text-xs italic">{project.outcome}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Call to Action Section */}
        <section id="contact" className="p-8 bg-[#1a1a1a] rounded-3xl shadow-2xl border border-[#00f7ff]/30 transition-all duration-500 hover:shadow-[#00f7ff]/30">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-[#00f7ff] mb-2 tracking-wide">Get in Touch</h1>
            <p className="text-md text-gray-300">Let’s collaborate or just say hi 👋</p>
          </div>

          <div className="bg-[#191919] border border-[#00f7ff]/20 rounded-2xl p-6 grid md:grid-cols-2 gap-8 items-center shadow-inner">
            <div>
              <h2 className="text-3xl font-semibold text-[#00f7ff] mb-5 flex items-center gap-3">
                <img
                  src="https://i.pinimg.com/736x/56/40/ee/5640ee5bf4bc165d77f4c295c6c02c2f.jpg"
                  alt="Damini Karankal"
                  className="w-12 h-12 rounded-full object-cover shadow-md border border-[#00f7ff]/40"
                />
                Damini Karankal
              </h2>

              <div className="text-gray-300 mb-2">
                <strong>📞 Phone:</strong> 09325779449
              </div>

              <div className="text-gray-300 mb-2">
                <strong>📧 Email:</strong>
                <a href="mailto:daminikarankal@gmail.com" className="text-[#00f7ff] underline ml-1">
                  daminikarankal@gmail.com
                </a>
              </div>

              <div className="mt-5">
                <h3 className="text-xl font-medium text-[#00f7ff] mb-3">Connect with me</h3>
                <div className="flex gap-5 text-2xl">
                  <a href="https://www.instagram.com/daminikarankal?igsh=MXFtMWNqd3loa3l0ag==" target="_blank" rel="noopener noreferrer" className="text-[#00f7ff] hover:text-white transition-transform hover:scale-110">
                    <FaInstagram />
                  </a>
                 <a href="https://github.com/Damini3155" target="_blank" rel="noopener noreferrer" className="text-[#00f7ff] hover:text-white transition-transform hover:scale-110">
                    <FaGithub />
                  </a>
                  <a href="https://www.linkedin.com/in/damini-karankal" target="_blank" rel="noopener noreferrer"  className="text-[#00f7ff] hover:text-white transition-transform hover:scale-110">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>

            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              src="https://i.pinimg.com/736x/56/40/ee/5640ee5bf4bc165d77f4c295c6c02c2f.jpg"
              alt="Damini Full"
              className="rounded-xl w-full h-[350px] object-contain shadow-lg border border-[#00f7ff]/20"
            />
          </div>

          <section className="px-6 pt-24">
            <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden">
              <div className="bg-black text-white rounded-3xl py-12 px-8 md:px-20 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <h2 className="text-4xl font-bold mb-2">You Can Mail Me Too!</h2>
                  <p className="text-gray-400">LetWorks Form Works For Real</p>
                </div>
                <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=daminikarankal@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-white text-black text-lg font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform"
>
                  Mail Now
                </a>
              </div>

              <div className="bg-white text-black py-10 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center mt-6 rounded-3xl">
                <div className="text-center md:text-left">
                  <p className="text-sm text-gray-600">Founder of TechSX · AI & Data Science Student</p>
                  <h3 className="text-2xl font-extrabold">Damini Karankal</h3>
                </div>

                <div className="text-center md:text-right mt-6 md:mt-0">
                  <p className="text-sm text-gray-600">Did You Check Everything? Ok.</p>
                  <h3 className="text-2xl font-bold">Here it Ends.</h3>
                </div>

                <div className="flex space-x-6 text-2xl mt-6 md:mt-0">
                  <a href="https://www.linkedin.com/in/damini-karankal" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com/Damini3155" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                    <FaGithub />
                  </a>
                  <a href="https://www.instagram.com/daminikarankal?igsh=MXFtMWNqd3loa3l0ag==" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
