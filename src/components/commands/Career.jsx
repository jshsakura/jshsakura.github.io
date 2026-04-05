import { resumeData } from '../../data/resume'
import { getTechColor } from '../../data/techColors'

function TechBadge({ tech, theme }) {
  const color = getTechColor(tech)
  return (
    <span
      className="text-xs rounded"
      style={{
        padding: '2px 8px',
        backgroundColor: color ? `${color}30` : `${theme.accent}25`,
        color: color || theme.comment,
      }}
    >
      {tech}
    </span>
  )
}

export default function Career({ theme }) {
  return (
    <div>
      <div className="text-base font-semibold mb-5" style={{ color: theme.accent }}>
        Career Timeline ({resumeData.totalExperience})
      </div>

      <div className="space-y-6">
        {resumeData.experience.map((exp, expIdx) => (
          <div key={exp.company}>
            {/* Company header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="text-sm font-bold px-3 py-1 rounded"
                style={{
                  color: theme.bg,
                  backgroundColor: expIdx === 0 ? theme.success : theme.prompt,
                }}
              >
                {exp.company === 'Freelancer' ? 'Projects' : exp.company}
              </div>
              <div className="text-xs sm:text-sm" style={{ color: theme.comment }}>
                {exp.period} · {exp.duration}
              </div>
            </div>

            {/* Projects timeline */}
            <div className="space-y-0 ml-1">
              {[...exp.projects].sort((a, b) => {
                const parseDate = (s) => {
                  if (!s) return 0
                  const [y, m] = s.split('.')
                  return parseInt(y) * 100 + parseInt(m)
                }
                return parseDate(b.period?.split(' ~ ')[0]) - parseDate(a.period?.split(' ~ ')[0])
              }).map((proj, i, arr) => {
                const isLast = i === arr.length - 1
                const isFirst = expIdx === 0 && i === 0

                return (
                  <div key={proj.name} className="flex">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center shrink-0" style={{ width: '24px' }}>
                      <div
                        className="rounded-full shrink-0"
                        style={{
                          width: isFirst ? '10px' : '8px',
                          height: isFirst ? '10px' : '8px',
                          backgroundColor: isFirst ? theme.success : theme.comment,
                          marginTop: '7px',
                          boxShadow: isFirst ? `0 0 8px ${theme.success}80` : 'none',
                        }}
                      />
                      {!isLast && (
                        <div
                          className="flex-1"
                          style={{
                            width: '1px',
                            backgroundColor: theme.border,
                            minHeight: '100%',
                          }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pb-6 pl-2">
                      <div className="text-sm font-semibold" style={{ color: theme.fg }}>
                        {proj.name}
                      </div>
                      <div className="text-xs sm:text-sm mt-0.5" style={{ color: theme.prompt }}>
                        {proj.period}
                      </div>
                      <div
                        className="text-xs sm:text-sm mt-1.5 leading-relaxed"
                        style={{ color: theme.comment }}
                      >
                        {proj.description}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {proj.tech.map((t) => (
                          <TechBadge key={t} tech={t} theme={theme} />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
