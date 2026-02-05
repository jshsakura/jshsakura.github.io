import { resumeData } from '../../data/resume'
import { getTechColor } from '../../data/techColors'

function parseDate(str) {
  if (!str) return 0
  const [y, m] = str.split('.')
  return parseInt(y) * 100 + parseInt(m)
}

export default function Career({ theme }) {
  const timeline = resumeData.experience.flatMap(exp =>
    exp.projects.map(proj => ({
      ...proj,
      company: exp.company,
      role: exp.role,
      startDate: parseDate(proj.period?.split(' ~ ')[0]),
    }))
  ).sort((a, b) => b.startDate - a.startDate)

  return (
    <div>
      <div className="text-base font-semibold mb-4" style={{ color: theme.accent }}>
        Career Timeline ({resumeData.totalExperience})
      </div>

      <div className="space-y-0">
        {timeline.map((proj, i) => {
          const isLast = i === timeline.length - 1
          const year = proj.period?.split('.')[0]
          const prevYear = i > 0 ? timeline[i - 1].period?.split('.')[0] : null
          const showYear = year !== prevYear

          return (
            <div key={`${proj.company}-${proj.name}`} className="flex">
              {/* Year column */}
              <div
                className="shrink-0 text-sm text-right font-semibold"
                style={{ width: '40px', color: theme.prompt, paddingTop: '2px' }}
              >
                {showYear ? year : ''}
              </div>

              {/* Timeline line */}
              <div className="flex flex-col items-center shrink-0" style={{ width: '28px' }}>
                <div
                  className="rounded-full shrink-0"
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: i === 0 ? theme.success : theme.comment,
                    marginTop: '6px',
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
              <div className="flex-1 min-w-0 pb-5">
                <div className="text-sm font-semibold" style={{ color: theme.fg }}>
                  {proj.name}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-sm" style={{ color: theme.success }}>{proj.company}</span>
                  <span className="text-sm" style={{ color: theme.comment }}>{proj.period}</span>
                </div>
                <div className="text-sm mt-1" style={{ color: theme.comment, lineHeight: 1.6 }}>
                  {proj.description}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {proj.tech.map((t) => {
                    const color = getTechColor(t)
                    return (
                      <span
                        key={t}
                        className="text-sm px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: color ? `${color}55` : `${theme.accent}40`,
                          color: color || theme.accent,
                        }}
                      >
                        {t}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
