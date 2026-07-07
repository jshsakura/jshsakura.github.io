import { commands } from '../../data/resume'
import { useLanguage } from '../../i18n/useLanguage'
import { uiStrings } from '../../i18n/strings'

export default function Help({ theme }) {
  const { lang } = useLanguage()
  const strings = uiStrings[lang].help

  return (
    <div className="space-y-1.5">
      <div style={{ color: theme.accent }} className="mb-3 text-base font-semibold">
        {strings.title}
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
            <span style={{ color: theme.comment }}>{c.desc[lang]}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm" style={{ color: theme.comment }}>
        {strings.tip}
      </div>
    </div>
  )
}
