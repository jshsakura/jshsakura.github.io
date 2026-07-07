import { useLanguage } from '../../i18n/useLanguage'
import { uiStrings } from '../../i18n/strings'

export default function Lang({ theme }) {
  const { lang } = useLanguage()
  const strings = uiStrings[lang].lang

  return (
    <div className="space-y-1.5 text-sm">
      <div style={{ color: theme.fg }}>{strings.current(lang)}</div>
      <div style={{ color: theme.comment }}>{strings.available}</div>
      <div className="mt-2" style={{ color: theme.comment }}>{strings.usage}</div>
    </div>
  )
}
