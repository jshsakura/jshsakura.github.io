import { useState, useEffect, useRef } from 'react'
import { resumeData } from '../../data/resume'
import { useLanguage } from '../../i18n/useLanguage'

export default function Whoami({ theme }) {
  const { personal } = resumeData
  const { lang } = useLanguage()
  const bio = personal.bio[lang]
  const tagline = personal.tagline[lang]
  const [visibleSections, setVisibleSections] = useState(0)
  const bottomRef = useRef(null)

  useEffect(() => {
    const totalSections = 4 + bio.length
    let current = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        current++
        setVisibleSections(current)
        if (current >= totalSections) clearInterval(interval)
      }, 120)
      return () => clearInterval(interval)
    }, 200)
    return () => clearTimeout(timeout)
  }, [bio.length])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [visibleSections])

  return (
    <div className="space-y-3">
      {visibleSections >= 1 && (
        <div>
          <span className="text-xl font-bold" style={{ color: theme.accent }}>
            {personal.name}
          </span>
          <span className="ml-3 text-base" style={{ color: theme.comment }}>
            ({personal.nameKo})
          </span>
        </div>
      )}

      {visibleSections >= 2 && (
        <div style={{ color: theme.prompt }} className="text-base font-medium">
          {personal.title}
        </div>
      )}

      {visibleSections >= 3 && (
        <div style={{ color: theme.comment }} className="text-sm italic">
          {tagline}
        </div>
      )}

      <div className="space-y-1 mt-3">
        {bio.map((line, i) => (
          visibleSections >= 4 + i && (
            <div key={i} className="text-sm leading-relaxed" style={{ color: line ? theme.fg : 'transparent' }}>
              {line || '.'}
            </div>
          )
        ))}
      </div>

      {visibleSections >= 4 + bio.length && (
        <div className="flex items-center gap-2 mt-3 text-sm" style={{ color: theme.comment }}>
          <span style={{ color: theme.error }}>@</span>
          {personal.location}
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
