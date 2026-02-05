import { commands } from '../../data/resume'

export default function Help({ theme }) {
  return (
    <div className="space-y-1.5">
      <div style={{ color: theme.accent }} className="mb-3 text-base font-semibold">
        Available Commands:
      </div>
      <div className="grid gap-1">
        {commands.map((c) => (
          <div key={c.cmd} className="flex text-sm">
            <span
              className="shrink-0 font-medium"
              style={{ color: theme.success, width: '180px', display: 'inline-block' }}
            >
              {c.cmd}
            </span>
            <span style={{ color: theme.comment }}>{c.desc}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm" style={{ color: theme.comment }}>
        Tip: Use Tab for autocomplete, Arrow keys for history, Ctrl+L to clear
      </div>
    </div>
  )
}
