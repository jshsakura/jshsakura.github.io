import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Help from './commands/Help'
import Neofetch from './commands/Neofetch'
import Whoami from './commands/Whoami'
import Skills from './commands/Skills'
import Career from './commands/Career'
import Projects from './commands/Projects'
import Contact from './commands/Contact'
import MatrixRain from './commands/MatrixRain'
import HackSequence from './commands/HackSequence'
import Fortune from './commands/Fortune'
import { themes as themeMap } from '../data/resume'

function PowerlinePromptStatic({ theme }) {
  const segments = [
    { text: ' visitor ', bg: theme.accent, fg: theme.bg },
    { text: ' devterminal ', bg: theme.prompt, fg: theme.bg },
    { text: ' ~ ', bg: theme.border, fg: theme.fg },
  ]

  return (
    <span className="inline-flex items-center select-none text-xs" style={{ marginRight: '8px' }}>
      {segments.map((seg, i) => {
        const nextBg = i < segments.length - 1 ? segments[i + 1].bg : 'transparent'
        return (
          <span key={i} className="inline-flex items-stretch">
            <span
              className="flex items-center"
              style={{
                backgroundColor: seg.bg,
                color: seg.fg,
                padding: '0 6px',
                whiteSpace: 'nowrap',
                fontSize: '12px',
              }}
            >
              {seg.text}
            </span>
            <span style={{
              color: seg.bg,
              ...(i < segments.length - 1 ? { backgroundColor: nextBg } : {}),
              fontFamily: "'JetBrains Mono NF', monospace",
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '-1px',
            }}>
              {'\ue0b0'}
            </span>
          </span>
        )
      })}
    </span>
  )
}

function TypedText({ text, color, speed = 18 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count >= text.length) return
    const timer = setTimeout(() => setCount(c => c + 1), speed)
    return () => clearTimeout(timer)
  }, [count, text.length, speed])

  return (
    <span style={{ color }}>
      {text.slice(0, count).split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 1.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.06, ease: 'easeOut' }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

function CommandContent({ data, theme }) {
  switch (data.type) {
    case 'help': return <Help theme={theme} />
    case 'neofetch': return <Neofetch theme={theme} themeName={data.themeName} />
    case 'whoami': return <Whoami theme={theme} />
    case 'skills': return <Skills theme={theme} />
    case 'career': return <Career theme={theme} />
    case 'projects': return <Projects theme={theme} />
    case 'contact': return <Contact theme={theme} />
    case 'theme-list':
      return (
        <div className="space-y-1.5">
          <div style={{ color: theme.accent }} className="text-base font-semibold mb-3">
            Available Themes:
          </div>
          {Object.entries(themeMap).map(([key, t]) => (
            <div key={key} className="flex items-center gap-3 text-sm whitespace-nowrap">
              <span
                className="w-3.5 h-3.5 rounded-sm inline-block shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${t.prompt} 50%, ${t.accent} 50%)`,
                }}
              />
              <span
                className="w-32 shrink-0"
                style={{ color: key === data.current ? theme.success : theme.fg }}
              >
                {key}
              </span>
              <span className="shrink-0" style={{ color: theme.comment }}>
                {t.name}
                {key === data.current ? ' (active)' : ''}
              </span>
            </div>
          ))}
          <div className="mt-3 text-sm" style={{ color: theme.comment }}>
            Usage: theme [name]
          </div>
        </div>
      )
    case 'history':
      return (
        <div className="space-y-1">
          {data.items.length === 0 ? (
            <span className="text-sm" style={{ color: theme.comment }}>No commands in history.</span>
          ) : (
            data.items.map((cmd, i) => (
              <div key={i} className="text-sm">
                <span style={{ color: theme.comment }} className="mr-4 w-8 inline-block text-right">
                  {i + 1}
                </span>
                <span style={{ color: theme.fg }}>{cmd}</span>
              </div>
            ))
          )}
        </div>
      )
    case 'matrix':
      return <MatrixRain theme={theme} />
    case 'hack':
      return <HackSequence theme={theme} />
    case 'fortune':
      return <Fortune theme={theme} />
    case 'lolcat':
      return <LolcatText text={data.text} />
    case 'easter-sudo-rm':
      return <SudoRm theme={theme} />
    case 'easter-profile':
      return <EasterProfile theme={theme} />
    default:
      return null
  }
}

function LolcatText({ text }) {
  const colors = ['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#8800ff', '#ff00ff']
  return (
    <div className="text-sm">
      {text.split('').map((ch, i) => (
        <span key={i} style={{ color: colors[i % colors.length] }}>{ch}</span>
      ))}
    </div>
  )
}

function EasterProfile({ theme }) {
  const [stage, setStage] = useState(0)
  
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 1600),
      setTimeout(() => setStage(3), 2400),
      setTimeout(() => setStage(4), 3200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const messages = [
    { text: 'cat: reading secret.txt ...', color: theme.fg },
    { text: 'Decrypting contents...', color: theme.comment },
    { text: 'Verifying access level...', color: theme.comment },
    { text: 'Access granted. Loading profile...', color: theme.success },
  ]

  return (
    <div className="space-y-2 mt-2">
      {messages.slice(0, stage).map((msg, i) => (
        <div key={i} className="text-sm" style={{ color: msg.color }}>
          {msg.text}
        </div>
      ))}
      {stage >= 4 && (
        <>
          <iframe
            src="https://www.youtube.com/embed/rlrzUYTXOPI?autoplay=1"
            title="Secret Profile"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              maxWidth: '400px',
              width: '100%',
              aspectRatio: '9 / 16',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
            }}
          />
          <div className="text-sm" style={{ color: theme.comment }}>
            You found the secret. Not many visitors get here.
          </div>
        </>
      )}
    </div>
  )
}

function SudoRm({ theme }) {
  return (
    <div className="space-y-1.5">
      <div className="text-sm" style={{ color: theme.error }}>
        [sudo] password for visitor: ********
      </div>
      <div className="text-sm" style={{ color: theme.error }}>
        Removing /home/visitor/dignity... done
      </div>
      <div className="text-sm" style={{ color: theme.error }}>
        Removing /usr/bin/social-life... done
      </div>
      <div className="text-sm" style={{ color: theme.error }}>
        Removing /var/log/sleep-schedule... done
      </div>
      <div className="text-sm mt-3" style={{ color: theme.success }}>
        Just kidding. This devterminal is indestructible.
      </div>
    </div>
  )
}

export default function TerminalOutput({ outputs, theme }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [outputs.length])

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 min-h-0" style={{ padding: '20px 15px' }}>
      {outputs.map((entry) => (
        <div key={entry.id} className="output-line">
          {entry.type === 'command' && (
            <div className="text-sm flex items-center flex-wrap">
              <PowerlinePromptStatic theme={theme} />
              <TypedText text={entry.content} color={theme.fg} />
            </div>
          )}

          {entry.type === 'output' && (
            <div className="mt-2 mb-4">
              <CommandContent data={entry.content} theme={theme} />
            </div>
          )}

          {entry.type === 'system' && (
            <div className="text-sm whitespace-pre-wrap" style={{ color: theme.fg }}>
              {entry.content}
            </div>
          )}

          {entry.type === 'error' && (
            <div className="text-sm" style={{ color: theme.error }}>
              {entry.content}
            </div>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
