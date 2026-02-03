import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { resumeData } from '../../data/resume'

function TimelineItem({ experience, index }) {
  const isLeft = index % 2 === 0

  return (
    <div className="relative flex items-center justify-center mb-12">
      {/* Timeline line */}
      <div className="absolute left-1/2 w-px h-full bg-gradient-to-b from-indigo-500 to-purple-500 -translate-x-1/2 hidden md:block" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'}`}
      >
        <div className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-indigo-500/10 transition-all">
          <div className="flex items-center gap-3 mb-4 justify-between md:justify-start">
            <span className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-400">
              {experience.duration}
            </span>
            <span className="text-gray-500 text-sm">{experience.period}</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            {experience.company}
          </h3>
          <p className="text-indigo-400 mb-4">{experience.role}</p>

          <div className="space-y-3">
            {experience.projects.slice(0, 4).map((project, pIndex) => (
              <motion.div
                key={pIndex}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + pIndex * 0.1 }}
                className="border-l-2 border-indigo-500/30 pl-3 text-left"
              >
                <h4 className="text-white font-medium text-sm">
                  {project.name}
                </h4>
                <p className="text-gray-400 text-xs mb-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
            {experience.projects.length > 4 && (
              <p className="text-gray-500 text-sm text-left">
                +{experience.projects.length - 4} more projects
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 + 0.3 }}
        className="absolute left-1/2 w-4 h-4 bg-indigo-500 rounded-full -translate-x-1/2 shadow-lg shadow-indigo-500/50 hidden md:block"
      />
    </div>
  )
}

function MobileTimelineItem({ experience, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-8 border-l-2 border-indigo-500/30 last:border-transparent"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 w-4 h-4 bg-indigo-500 rounded-full -translate-x-1/2 shadow-lg shadow-indigo-500/50" />

      <div className="glass rounded-xl p-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-400">
            {experience.duration}
          </span>
          <span className="text-gray-500 text-xs">{experience.period}</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          {experience.company}
        </h3>
        <p className="text-indigo-400 text-sm mb-4">{experience.role}</p>

        <div className="space-y-3">
          {experience.projects.slice(0, 3).map((project, pIndex) => (
            <div
              key={pIndex}
              className="border-l-2 border-purple-500/30 pl-3"
            >
              <h4 className="text-white font-medium text-sm">{project.name}</h4>
              <p className="text-gray-400 text-xs">{project.description}</p>
            </div>
          ))}
          {experience.projects.length > 3 && (
            <p className="text-gray-500 text-xs">
              +{experience.projects.length - 3} more projects
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent">
      <div className="max-w-5xl mx-auto">
        <SectionTitle subtitle={`Total ${resumeData.totalExperience} Experience`}>
          경력
        </SectionTitle>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {resumeData.experience.map((exp, index) => (
            <TimelineItem key={index} experience={exp} index={index} />
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          {resumeData.experience.map((exp, index) => (
            <MobileTimelineItem key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
