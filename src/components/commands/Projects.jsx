import { resumeData } from '../../data/resume'
import { getTechColor } from '../../data/techColors'

function parseDate(str) {
  if (!str) return 0
  const [y, m] = str.split('.')
  return parseInt(y) * 100 + parseInt(m)
}

function TechBadge({ tech, theme }) {
  const color = getTechColor(tech)
  return (
    <span
      className="text-sm rounded"
      style={{
        padding: '2px 8px',
        backgroundColor: color ? `${color}55` : `${theme.accent}40`,
        color: color || theme.accent,
      }}
    >
      {tech}
    </span>
  )
}

export default function Projects({ theme }) {
  const timeline = resumeData.experience.flatMap(exp =>
    exp.projects.map(proj => ({
      ...proj,
      company: exp.company,
      startDate: parseDate(proj.period?.split(' ~ ')[0]),
    }))
  ).sort((a, b) => b.startDate - a.startDate)

  return (
    <div className="space-y-3">
      <div className="text-base font-semibold" style={{ color: theme.accent }}>
        Notable Projects
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {timeline.map((proj) => (
          <div
            key={`${proj.company}-${proj.name}`}
            className="rounded-lg"
            style={{
              padding: '14px 16px',
              backgroundColor: `${theme.fg}06`,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div className="font-semibold text-sm mb-1" style={{ color: theme.accent }}>
              {proj.name}
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-sm" style={{ color: theme.success }}>{proj.company}</span>
              <span className="text-sm" style={{ color: theme.comment }}>{proj.period}</span>
            </div>
            <div className="text-sm mb-2" style={{ color: theme.fg }}>
              {proj.description}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {proj.tech.map((t) => (
                <TechBadge key={t} tech={t} theme={theme} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
