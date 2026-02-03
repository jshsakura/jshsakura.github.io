import { motion } from 'framer-motion'
import { resumeData } from '../../data/resume'

function WelcomeContent() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-[#4c4f69] mb-2">
        Welcome!
      </h2>
      <p className="text-[#5c5f77] mb-4">
        Hi, I&apos;m <span className="font-semibold text-[#8839ef]">{resumeData.personal.name}</span>
      </p>
      <p className="text-sm text-[#6c6f85] italic mb-4">
        {resumeData.personal.tagline}
      </p>
      <div className="flex items-center justify-center gap-2 text-sm text-[#6c6f85]">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {resumeData.personal.location}
      </div>
      <p className="text-xs text-[#7c7f93] mt-4">
        Click anywhere to explore!
      </p>
    </div>
  )
}

function SkillsContent() {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#4c4f69] mb-4 text-center">
        Tech Stack
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {Object.values(resumeData.skills).map((category) => (
          <div
            key={category.name}
            className="bg-[#e6e9ef] rounded-xl p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{category.icon}</span>
              <span
                className="font-semibold text-sm"
                style={{ color: category.color }}
              >
                {category.name}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="text-xs bg-[#eff1f5] text-[#5c5f77] px-2 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExperienceContent() {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#4c4f69] mb-2 text-center">
        Experience
      </h2>
      <p className="text-center text-sm text-[#8839ef] font-semibold mb-4">
        {resumeData.totalExperience} Total
      </p>
      <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
        {resumeData.experience.map((exp) => (
          <div key={exp.company} className="bg-[#e6e9ef] rounded-xl p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-[#4c4f69]">{exp.company}</h3>
                <p className="text-xs text-[#6c6f85]">{exp.role}</p>
              </div>
              <span className="text-xs bg-[#8839ef]/20 text-[#8839ef] px-2 py-1 rounded-full">
                {exp.duration}
              </span>
            </div>
            <p className="text-xs text-[#7c7f93] mb-2">{exp.period}</p>
            <div className="space-y-1">
              {exp.projects.slice(0, 3).map((project) => (
                <div key={project.name} className="text-xs">
                  <span className="text-[#4c4f69]">{project.name}</span>
                  <span className="text-[#7c7f93] ml-1">- {project.description}</span>
                </div>
              ))}
              {exp.projects.length > 3 && (
                <p className="text-xs text-[#7c7f93]">
                  +{exp.projects.length - 3} more projects
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactContent() {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-[#4c4f69] mb-4">
        Get in Touch
      </h2>
      <div className="space-y-3">
        <a
          href={resumeData.personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-[#4c4f69] hover:bg-[#5c5f77] text-[#eff1f5] rounded-xl px-4 py-3 transition-colors pointer-events-auto"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          <span>GitHub</span>
        </a>
        <a
          href={`mailto:${resumeData.personal.email}`}
          className="flex items-center justify-center gap-3 bg-[#8839ef] hover:bg-[#7c3aed] text-[#eff1f5] rounded-xl px-4 py-3 transition-colors pointer-events-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Email</span>
        </a>
      </div>
      <p className="text-sm text-[#6c6f85] mt-4">
        Feel free to reach out!
      </p>
    </div>
  )
}

const contentMap = {
  welcome: WelcomeContent,
  skills: SkillsContent,
  experience: ExperienceContent,
  contact: ContactContent,
}

export default function InfoPanel({ currentRoom }) {
  const ContentComponent = contentMap[currentRoom]

  if (!ContentComponent) return null

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-80 pointer-events-auto"
    >
      <div className="bg-[#eff1f5]/95 backdrop-blur-md rounded-3xl p-5 shadow-xl border border-[#ccd0da]">
        <ContentComponent />
      </div>
    </motion.div>
  )
}
