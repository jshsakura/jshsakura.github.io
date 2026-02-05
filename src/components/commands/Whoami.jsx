import { resumeData } from '../../data/resume'

export default function Whoami({ theme }) {
  const { personal } = resumeData

  return (
    <div className="space-y-3">
      <div>
        <span className="text-xl font-bold" style={{ color: theme.accent }}>
          {personal.name}
        </span>
        <span className="ml-3 text-base" style={{ color: theme.comment }}>
          ({personal.nameKo})
        </span>
      </div>

      <div style={{ color: theme.prompt }} className="text-base font-medium">
        {personal.title}
      </div>

      <div style={{ color: theme.comment }} className="text-sm italic">
        {personal.tagline}
      </div>

      <div className="space-y-1 mt-3">
        {personal.bio.map((line, i) => (
          <div key={i} className="text-sm leading-relaxed" style={{ color: line ? theme.fg : 'transparent' }}>
            {line || '.'}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-3 text-sm" style={{ color: theme.comment }}>
        <span style={{ color: theme.error }}>@</span>
        {personal.location}
      </div>
    </div>
  )
}
