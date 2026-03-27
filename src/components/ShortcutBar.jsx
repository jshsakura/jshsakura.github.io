const shortcuts = [
  { cmd: 'help', label: 'help', highlight: true },
  { cmd: 'whoami', label: 'whoami' },
  { cmd: 'skills', label: 'skills' },
  { cmd: 'career', label: 'career' },
  { cmd: 'projects', label: 'projects' },
  { cmd: 'contact', label: 'contact' },
  { cmd: 'neofetch', label: 'neofetch' },
  { cmd: 'theme', label: 'theme' },
  { cmd: 'clear', label: 'clear' },
]

export default function ShortcutBar({ onCommand, theme }) {
  return (
    <div
      className="shrink-0 flex items-center gap-1.5 overflow-x-auto"
      style={{
        padding: '6px 10px',
        paddingBottom: 'max(6px, env(safe-area-inset-bottom, 6px))',
        backgroundColor: theme.headerBg,
        borderTop: `1px solid ${theme.border}`,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <span className="shrink-0 mr-0.5 select-none hidden sm:inline" style={{ color: theme.comment, fontSize: '10px' }}>
        Quick
      </span>
      {shortcuts.map((s) => (
        <button
          key={s.cmd}
          onClick={() => onCommand(s.cmd)}
          className="shrink-0 rounded-full cursor-pointer transition-all duration-150 hover:scale-105 active:scale-93"
          style={{
            fontSize: '13px',
            padding: '4px 12px',
            backgroundColor: s.highlight ? `${theme.accent}20` : `${theme.fg}08`,
            color: s.highlight ? theme.accent : theme.fg,
            border: `1px solid ${s.highlight ? theme.accent : theme.border}`,
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${theme.accent}20`
            e.currentTarget.style.borderColor = theme.accent
            e.currentTarget.style.color = theme.accent
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = s.highlight ? `${theme.accent}20` : `${theme.fg}08`
            e.currentTarget.style.borderColor = s.highlight ? theme.accent : theme.border
            e.currentTarget.style.color = s.highlight ? theme.accent : theme.fg
          }}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
