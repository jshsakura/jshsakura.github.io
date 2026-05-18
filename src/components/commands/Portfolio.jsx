import { useState, useEffect } from 'react'
import { getTechColor } from '../../data/techColors'

const GITHUB_USER = 'jshsakura'
const CACHE_KEY = 'portfolio_repos_v1'
const CACHE_TTL_MS = 60 * 60 * 1000
const MAX_REPOS = 8

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

function pickRepos(raw) {
  return raw
    .filter(r => !r.fork && r.description && r.name !== GITHUB_USER)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count
      return new Date(b.pushed_at) - new Date(a.pushed_at)
    })
    .slice(0, MAX_REPOS)
    .map(r => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage && /^https?:\/\//.test(r.homepage) ? r.homepage : null,
      stars: r.stargazers_count,
      language: r.language,
      topics: Array.isArray(r.topics) ? r.topics : [],
    }))
}

export default function Portfolio({ theme }) {
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
        GitHub <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: theme.success }}>@{GITHUB_USER}</a> 의 공개 프로젝트입니다.
      </div>

      {status === 'loading' && (
        <div className="text-sm" style={{ color: theme.comment }}>
          Fetching repositories from GitHub...
        </div>
      )}

      {status === 'error' && (
        <div className="text-sm" style={{ color: theme.error }}>
          Failed to load repositories. <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: theme.accent }}>View on GitHub</a>
        </div>
      )}

      {status === 'ready' && repos && repos.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {repos.map((repo) => {
            const techs = [repo.language, ...repo.topics].filter(Boolean)
            return (
              <div
                key={repo.name}
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
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-1 text-xs shrink-0" style={{ color: theme.comment }}>
                      <StarIcon color={theme.comment} />
                      {repo.stars}
                    </span>
                  )}
                </div>

                <div className="text-xs sm:text-sm mb-2.5 leading-relaxed flex-1" style={{ color: theme.fg }}>
                  {repo.description}
                </div>

                {techs.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {techs.map(t => <TechBadge key={t} tech={t} theme={theme} />)}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-auto">
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
          })}
        </div>
      )}

      {status === 'ready' && repos && repos.length === 0 && (
        <div className="text-sm" style={{ color: theme.comment }}>
          No public repositories found.
        </div>
      )}
    </div>
  )
}
