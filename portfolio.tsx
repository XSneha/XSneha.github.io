"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Code,
  User,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Menu,
  X,
  ExternalLink,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Cambiar sección activa basado en scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 300

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "Home", icon: <Code size={18} /> },
    { id: "about", label: "About", icon: <User size={18} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={18} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  ]

  const skills = [
    { name: "C++", level: 90 },
    { name: "OpenGL", level: 85 },
    { name: "CUDA", level: 80 },
    { name: "DirectX", level: 80 },
    { name: "WebGL", level: 85 },
    { name: "Java", level: 85 },
    { name: "Angular", level: 80 },
    { name: "SQL", level: 85 },
    { name: "REST API", level: 85 },
    { name: "Git", level: 90 },
    { name: "AWS", level: 75 },
    { name: "Kubernetes", level: 75 },
  ]

  const projects = [
    {
      title: "DirectX Game Engine",
      description: "Collaborating with a team of developers on DirectX Game Engine project. Working on design and implementation of the framework. Implemented Windowing using Win32 SDK and ImGui for user interface.",
      technologies: ["DirectX", "C++", "Win32 SDK", "ImGui"],
      image: "/placeholder.svg?height=200&width=350",
      github: "https://github.com/xsneha",
      demo: "#",
    },
    {
      title: "WebGL Game Engine",
      description: "Lead a team of developers to create a Game Engine in WebGL for a musical graphic demo. Implemented Post processing effects grayscale, god rays, vignette using shaders. Implemented library for Animation, Camera and Lights.",
      technologies: ["WebGL", "JavaScript", "Shaders"],
      image: "/placeholder.svg?height=200&width=350",
      github: "https://github.com/xsneha",
      demo: "#",
    },
    {
      title: "Cloth Simulation",
      description: "Demo for highlighting difference between CPU/GPU performance. Ported spring mass algorithm in CUDA kernel and implemented with different grid and block dimensions.",
      technologies: ["OpenGL", "CUDA", "C++"],
      image: "/placeholder.svg?height=200&width=350",
      github: "https://github.com/xsneha",
      demo: "#",
    },
  ]

  const education = [
    {
      period: "2017 - 2019",
      title: "Masters of Computer Science",
      institution: "Abasaheb Garware College, Pune",
      description: "Courses: Unix Operating System, Web Services, Design Patterns",
      grade: "9.3 CGPA",
    },
  ]

  return (
    <div className="min-h-screen bg-transparent text-gray-100 font-sans">
      {/* Navegación móvil */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-gray-800/50 p-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Sneha Sawant
          </span>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-4"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeSection === item.id ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800/50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </div>

      {/* Navegación de escritorio */}
      <nav className="hidden md:flex fixed left-8 top-1/2 transform -translate-y-1/2 flex-col gap-6 z-50">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`flex items-center gap-2 p-2 rounded-full transition-all ${
              activeSection === item.id
                ? "bg-gray-800 text-blue-400 shadow-lg shadow-blue-500/20"
                : "hover:bg-gray-800/50"
            }`}
            title={item.label}
          >
            {item.icon}
            <span
              className={`${
                activeSection === item.id ? "opacity-100 w-auto" : "opacity-0 w-0"
              } overflow-hidden transition-all duration-300`}
            >
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 pt-20 md:pt-0">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center py-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                Software Developer
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Sneha Sawant
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Software Developer with 6 years of experience in graphics programming, game development, and software engineering.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-6 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <a href="#projects">
                    View Projects <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button 
                  asChild
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-6 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <a href="#contact">
                    Contact
                  </a>
                </Button>
              </div>
            </motion.div>

            <div className="mt-12 flex gap-4">
              <a 
                href="https://github.com/xsneha" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white transition-all duration-200"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/sawantsneha" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white transition-all duration-200"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:scsawant1997@gmail.com"
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white transition-all duration-200"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-20 bg-black/10 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <User size={24} className="text-blue-400" />
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-300 mb-6">
                  I am a Software Developer with 6 years of experience, currently working at Amdocs in RnD Telecom. My expertise includes graphics programming, game development, and software engineering. I have a strong background in C++, OpenGL, CUDA, and DirectX development.
                </p>
                <p className="text-gray-300 mb-6">
                  I have worked on various projects including game engines, cloth simulation, and fintech applications. My experience spans across different technologies and domains, from low-level graphics programming to high-level application development.
                </p>
                <Button 
                  asChild
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-6 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <a href="/Sneha_Sawant_Resume.pdf" download>
                    Download CV
                  </a>
                </Button>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">My Skills</h3>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20 bg-black/10 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Briefcase size={24} className="text-blue-400" />
              My Projects
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-gray-800 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all"
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover border-b border-gray-800"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-gray-800 text-gray-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        className="text-sm flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Github size={16} /> Code
                      </a>
                      <a
                        href={project.demo}
                        className="text-sm flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink size={16} /> Demo
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen py-20 bg-black/10 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <GraduationCap size={24} className="text-blue-400" />
              Education
            </h2>

            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-gray-800 pb-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                <div className="mb-1 text-blue-400">2023 - Present</div>
                <h3 className="text-xl font-semibold">Software Developer (RnD Telecom)</h3>
                <p className="text-gray-400">Amdocs, Pune</p>
                <p className="mt-2 text-gray-300">
                  Working on migration of existing product, modernizing for latest platforms and containerization. Optimized queries to increase efficiency. Worked on customer reported issues and performance analysis.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-800 pb-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500" />
                <div className="mb-1 text-purple-400">2022 - 2023</div>
                <h3 className="text-xl font-semibold">Solution Analyst</h3>
                <p className="text-gray-400">Omniscient Software Pvt.Ltd. (FinTech), Pune</p>
                <p className="mt-2 text-gray-300">
                  Worked on structural designing of code to make it reusable and easy to extend. Implemented architecture, participated in High level Design of functionality at framework level in Firestart.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-800">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500" />
                <div className="mb-1 text-green-400">2020 - 2022</div>
                <h3 className="text-xl font-semibold">Solution Engineer</h3>
                <p className="text-gray-400">Omniscient Software Pvt.Ltd. (FinTech), Pune</p>
                <p className="mt-2 text-gray-300">
                  Worked on fintech product Liquidice for existing code refactoring, code reviews, SQL query performance analysis. Led product feature development team and worked on database designing for new functionality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-20 bg-black/10 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Mail size={24} className="text-blue-400" />
              Contact
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-300 mb-6">
                  Interested in working together or have any questions? Feel free to contact me through the form or my social media.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-blue-400" />
                    <span>scsawant1997@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="text-blue-400" />
                    <a href="https://github.com/xsneha" className="hover:text-blue-400 transition-colors">
                      github.com/xsneha
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="text-blue-400" />
                    <a href="https://linkedin.com/in/sawantsneha" className="hover:text-blue-400 transition-colors">
                      linkedin.com/in/sawantsneha
                    </a>
                  </div>
                </div>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-8 mt-20 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Sneha Sawant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

