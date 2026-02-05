import { useState, useEffect } from 'react'
import { resumeData } from '../../data/resume'

function SkillBar({ name, level, color, items, theme, delay }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), delay)
    return () => clearTimeout(timer)
  }, [level, delay])

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-medium" style={{ color }}>
          {name}
        </span>
        <span className="text-xs" style={{ color: theme.comment }}>
          {level}%
        </span>
      </div>

      <div
        className="h-1.5 rounded-full relative"
        style={{ backgroundColor: `${theme.fg}10` }}
      >
        <div
          className="h-full rounded-full progress-bar-fill"
          style={{
            width: level > 100 ? `${Math.min(width, 115)}%` : `${width}%`,
            background: level > 100
              ? `linear-gradient(90deg, ${color}, #ff4500, ${color})`
              : `linear-gradient(90deg, ${color}, ${color}88)`,
            backgroundSize: level > 100 ? '200% 100%' : undefined,
            animation: level > 100 && width > 0 ? 'shimmer 3s ease-in-out infinite' : undefined,
            boxShadow: level > 100 && width > 0 ? `0 0 4px ${color}40` : undefined,
          }}
        />
      </div>

      <div style={{ height: '5px' }} />
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="text-xs rounded"
            style={{
              padding: '4px 10px',
              backgroundColor: `${color}18`,
              color,
              border: `1px solid ${color}30`,
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <div style={{ height: '14px' }} />
    </div>
  )
}

export default function Skills({ theme }) {
  const skills = Object.values(resumeData.skills)

  return (
    <div className="space-y-2">
      <div className="text-base font-semibold mb-4" style={{ color: theme.accent }}>
        Tech Stack & Expertise
      </div>
      {skills.map((skill, i) => (
        <SkillBar
          key={skill.name}
          {...skill}
          theme={theme}
          delay={i * 150}
        />
      ))}
    </div>
  )
}
