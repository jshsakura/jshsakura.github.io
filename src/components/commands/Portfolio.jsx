import { useState, useEffect } from 'react'
import { getTechColor } from '../../data/techColors'
import { useLanguage } from '../../i18n/useLanguage'
import { uiStrings } from '../../i18n/strings'

const GITHUB_USER = 'jshsakura'
const CACHE_KEY = 'portfolio_repos_v4'
const CACHE_TTL_MS = 60 * 60 * 1000
const ACTIVE_WINDOW_MS = 180 * 24 * 60 * 60 * 1000
const MAX_ACTIVE_REPOS = 16
const MAX_POPULAR_REPOS = 8

function timeAgo(iso) {
  if (!iso) return null
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (days < 1) return 'today'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

function TechBadge({ tech, theme }) {
  const color = getTechColor(tech)
  return (
    <span
      className="text-xs rounded"
      style={{
        padding: '1px 6px',
        backgroundColor: color ? `${color}30` : `${theme.accent}25`,
        color: color || theme.comment,
      }}
    >
      {tech}
    </span>
  )
}

function StarIcon({ color }) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill={color}>
      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
    </svg>
  )
}

function ForkIcon({ color }) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill={color}>
      <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2h4v4M14 2L7 9M12 9v4a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4" />
    </svg>
  )
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.ts || Date.now() - parsed.ts > CACHE_TTL_MS) return null
    if (!parsed.repos || !Array.isArray(parsed.repos.active) || !Array.isArray(parsed.repos.popular)) return null
    return parsed.repos
  } catch {
    return null
  }
}

function writeCache(repos) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), repos }))
  } catch {
    /* ignore quota errors */
  }
}

function toCard(r) {
  return {
    name: r.name,
    description: r.description,
    url: r.html_url,
    homepage: r.homepage && /^https?:\/\//.test(r.homepage) ? r.homepage : null,
    stars: r.stargazers_count,
    forks: r.forks_count,
    updatedAt: r.pushed_at,
    language: r.language,
    topics: Array.isArray(r.topics) ? r.topics : [],
  }
}

function pickRepos(raw) {
  const candidates = raw.filter(
    r => r.description && r.name !== GITHUB_USER && (!r.fork || r.stargazers_count > 0)
  )

  const isActive = r => Date.now() - new Date(r.pushed_at).getTime() < ACTIVE_WINDOW_MS

  const active = candidates
    .filter(isActive)
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, MAX_ACTIVE_REPOS)
    .map(toCard)

  const activeNames = new Set(active.map(r => r.name))

  const popular = candidates
    .filter(r => r.stargazers_count > 0 && !activeNames.has(r.name))
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count
      return new Date(b.pushed_at) - new Date(a.pushed_at)
    })
    .slice(0, MAX_POPULAR_REPOS)
    .map(toCard)

  return { active, popular }
}

export default function Portfolio({ theme }) {
  const { lang } = useLanguage()
  const strings = uiStrings[lang].portfolio
  const [repos, setRepos] = useState(() => readCache())
  const [status, setStatus] = useState(() => (readCache() ? 'ready' : 'loading'))

  useEffect(() => {
    if (status === 'ready') return

    let cancelled = false

    async function load() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
          { headers: { Accept: 'application/vnd.github+json' } }
        )
        if (!res.ok) throw new Error(`GitHub API ${res.status}`)
        const data = await res.json()
        if (cancelled) return
        const picked = pickRepos(data)
        writeCache(picked)
        setRepos(picked)
        setStatus('ready')
      } catch {
        if (cancelled) return
        setStatus('error')
      }
    }

    load()
    return () => { cancelled = true }
  }, [status])

  return (
    <div className="space-y-3">
      <div className="text-base font-semibold" style={{ color: theme.accent }}>
        Portfolio
      </div>
      <div className="text-sm" style={{ color: theme.comment }}>
        {strings.introTemplate.split('{user}').map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && (
              <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: theme.success }}>@{GITHUB_USER}</a>
            )}
          </span>
        ))}
      </div>

      {status === 'loading' && (
        <div className="text-sm" style={{ color: theme.comment }}>
          {strings.loading}
        </div>
      )}

      {status === 'error' && (
        <div className="text-sm" style={{ color: theme.error }}>
          {strings.error} <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: theme.accent }}>{strings.viewOnGithub}</a>
        </div>
      )}

      {status === 'ready' && repos && (
        <>
          <RepoSection title={strings.active} repos={repos.active} theme={theme} accentColor={theme.success} />
          <RepoSection title={strings.popular} repos={repos.popular} theme={theme} accentColor={theme.accent} />
          {repos.active.length === 0 && repos.popular.length === 0 && (
            <div className="text-sm" style={{ color: theme.comment }}>
              {strings.empty}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function RepoSection({ title, repos, theme, accentColor }) {
  if (repos.length === 0) return null
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-semibold" style={{ color: accentColor }}>{title}</span>
        <span className="text-xs" style={{ color: theme.comment }}>({repos.length})</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {repos.map(repo => <RepoCard key={repo.name} repo={repo} theme={theme} />)}
      </div>
    </div>
  )
}

function RepoCard({ repo, theme }) {
  const techs = [repo.language, ...repo.topics].filter(Boolean)
  return (
    <div
      className="rounded-lg transition-colors duration-200 flex flex-col"
      style={{
        padding: '14px 16px',
        backgroundColor: `${theme.fg}06`,
        border: `1px solid ${theme.border}`,
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-sm hover:underline truncate"
          style={{ color: theme.accent }}
        >
          {repo.name}
        </a>
        <span className="flex items-center gap-2 text-xs shrink-0" style={{ color: theme.comment }}>
          {repo.stars > 0 && (
            <span className="flex items-center gap-1">
              <StarIcon color={theme.comment} />
              {repo.stars}
            </span>
          )}
          {repo.forks > 0 && (
            <span className="flex items-center gap-1">
              <ForkIcon color={theme.comment} />
              {repo.forks}
            </span>
          )}
        </span>
      </div>

      <div className="text-xs sm:text-sm mb-2.5 leading-relaxed flex-1" style={{ color: theme.fg }}>
        {repo.description}
      </div>

      {techs.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {techs.map(t => <TechBadge key={t} tech={t} theme={theme} />)}
        </div>
      )}

      {repo.updatedAt && (
        <div className="text-xs mb-2 mt-auto" style={{ color: theme.comment }}>
          Updated {timeAgo(repo.updatedAt)}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs rounded transition-all hover:brightness-110"
          style={{
            padding: '4px 10px',
            color: theme.fg,
            border: `1px solid ${theme.border}`,
            backgroundColor: `${theme.fg}08`,
          }}
        >
          GitHub <ExternalIcon />
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs rounded transition-all hover:brightness-110"
            style={{
              padding: '4px 10px',
              color: theme.accent,
              border: `1px solid ${theme.accent}40`,
              backgroundColor: `${theme.accent}15`,
            }}
          >
            Demo <ExternalIcon />
          </a>
        )}
      </div>
    </div>
  )
}
