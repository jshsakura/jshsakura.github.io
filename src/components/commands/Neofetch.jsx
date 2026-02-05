import { useState, useEffect } from 'react'
import { resumeData, themes } from '../../data/resume'

const WEATHER_CACHE_KEY = 'devterminal_weather'

function useWeather() {
  const [weather, setWeather] = useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(WEATHER_CACHE_KEY))
      if (cached && cached.date === new Date().toISOString().slice(0, 10)) {
        return cached.value
      }
    } catch {}
    return null
  })

  useEffect(() => {
    if (weather) return
    fetch('https://wttr.in/Seoul?format=j1')
      .then(res => res.json())
      .then(data => {
        const cur = data.current_condition?.[0]
        if (cur) {
          const desc = cur.weatherDesc?.[0]?.value || ''
          const temp = cur.temp_C
          const humidity = cur.humidity
          const icons = {
            'Sunny': '☀️', 'Clear': '🌙', 'Partly cloudy': '⛅',
            'Cloudy': '☁️', 'Overcast': '☁️', 'Mist': '🌫️',
            'Rain': '🌧️', 'Light rain': '🌦️', 'Heavy rain': '🌧️',
            'Snow': '❄️', 'Light snow': '🌨️', 'Thunderstorm': '⛈️',
          }
          const icon = icons[desc] || '🌤️'
          const result = `${icon} ${desc}, ${temp}°C (${humidity}%)`
          setWeather(result)
          localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({
            date: new Date().toISOString().slice(0, 10),
            value: result,
          }))
        }
      })
      .catch(() => setWeather(null))
  }, [weather])
  return weather
}

const VISITOR_CACHE_KEY = 'devterminal_visitor'

function useVisitorInfo() {
  const [info, setInfo] = useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(VISITOR_CACHE_KEY))
      if (cached && cached.date === new Date().toISOString().slice(0, 10)) {
        return cached.value
      }
    } catch {}
    return null
  })

  useEffect(() => {
    if (info) return
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const result = {
          ip: data.ip || null,
          location: [data.city, data.region, data.country_name].filter(Boolean).join(', ') || null,
        }
        setInfo(result)
        localStorage.setItem(VISITOR_CACHE_KEY, JSON.stringify({
          date: new Date().toISOString().slice(0, 10),
          value: result,
        }))
      })
      .catch(() => setInfo({ ip: null, location: null }))
  }, [info])
  return info || { ip: null, location: null }
}

function getClientInfo() {
  const ua = navigator.userAgent
  let os = 'Unknown'
  if (ua.includes('Win')) os = 'Windows'
  else if (ua.includes('Mac')) os = 'macOS'
  else if (ua.includes('Linux')) os = 'Linux'
  else if (ua.includes('Android')) os = 'Android'
  else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS'

  let browser = 'Unknown'
  if (ua.includes('Edg/')) browser = 'Edge ' + ua.match(/Edg\/([\d.]+)/)?.[1]
  else if (ua.includes('Chrome/') && !ua.includes('Edg')) browser = 'Chrome ' + ua.match(/Chrome\/([\d.]+)/)?.[1]
  else if (ua.includes('Firefox/')) browser = 'Firefox ' + ua.match(/Firefox\/([\d.]+)/)?.[1]
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Safari ' + ua.match(/Version\/([\d.]+)/)?.[1]

  const cpu = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} cores` : 'Unknown'
  const memory = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : null

  let gpu = 'Unknown'
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (gl) {
      const ext = gl.getExtension('WEBGL_debug_renderer_info')
      if (ext) gpu = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
    }
  } catch {}

  return { os, browser, cpu, gpu, memory }
}

const ASCII_ART = [
  '    _____                        __  __                     ',
  '   / ___/___  __  ______  ____ _/ / / /_  _____  ____  ____ ',
  '   \\__ \\/ _ \\/ / / / __ \\/ __ `/ /_/ / / / / _ \\/ __ \\/ __ \\',
  '  ___/ /  __/ /_/ / / / / /_/ / __  / /_/ /  __/ /_/ / / / /',
  ' /____/\\___/\\__,_/_/ /_/\\__, /_/ /_/\\__, /\\___/\\____/_/ /_/ ',
  '                       /____/      /____/                    ',
]

export default function Neofetch({ theme, themeName }) {
  const currentTheme = themes[themeName] || themes.default
  const weather = useWeather()
  const visitor = useVisitorInfo()
  const { os, browser, cpu, gpu, memory } = getClientInfo()

  const info = [
    { label: 'visitor', value: visitor.ip ? `unknown@${visitor.ip}` : 'unknown@connecting...', color: theme.prompt },
    { label: 'Location', value: visitor.location || 'detecting...', color: theme.prompt },
    { label: 'OS', value: os, color: theme.prompt },
    { label: 'Browser', value: `${browser} (${window.screen.width}x${window.screen.height})`, color: theme.prompt },
    { label: 'CPU', value: cpu, color: theme.prompt },
    { label: 'GPU', value: gpu, color: theme.prompt },
    { label: '', value: '\u2500'.repeat(28), color: theme.border },
    { label: 'Host', value: 'GitHub Pages (Fastly CDN)' },
    { label: 'Uptime', value: resumeData.totalExperience },
    { label: 'Shell', value: 'Java / React / Python' },
    { label: 'Packages', value: 'Spring, .NET, Swift, Node.js' },
    { label: 'DE', value: 'React + Vite + Tailwind CSS' },
    { label: 'Terminal', value: 'custom-built (React)' },
    { label: 'Terminal Font', value: 'JetBrains Mono NF' },
    { label: 'Theme', value: currentTheme.name },
    { label: 'Weather', value: weather || 'fetching...' },
    { label: 'Last Update', value: __LAST_COMMIT_DATE__ },
  ]

  const palette = [
    theme.error, theme.success, theme.accent, theme.prompt,
    '#e6b450', '#a78bfa', '#f59e0b', theme.fg,
  ]

  return (
    <div className="flex flex-col gap-5" style={{ padding: '5px' }}>
      <pre className="shrink-0 leading-tight text-xs sm:text-sm" style={{ color: theme.accent }}>
        {ASCII_ART.join('\n')}
      </pre>

      <div className="space-y-1 min-w-0">
        {info.map((item, i) => (
          <div key={i} className="whitespace-nowrap text-sm">
            {item.label ? (
              <>
                <span style={{ color: item.color || theme.accent }} className="font-semibold">
                  {item.label}
                </span>
                {item.label !== '' && !/^\u2500/.test(item.value) && (
                  <span style={{ color: theme.comment }}>: </span>
                )}
                <span style={{ color: item.color || theme.fg }}>{item.value}</span>
              </>
            ) : (
              <span style={{ color: item.color || theme.border }}>{item.value}</span>
            )}
          </div>
        ))}

        <div className="flex gap-1.5 mt-4">
          {palette.map((c, i) => (
            <span
              key={i}
              className="inline-block w-5 h-5 rounded-sm"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
