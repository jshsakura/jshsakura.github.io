import { useState, useEffect } from 'react'

const STEPS = [
  { text: '[*] Initializing breach protocol...', delay: 0 },
  { text: '[*] Scanning target: devterminal.seunghyeon.dev', delay: 600 },
  { text: '[*] Port scan: 22/tcp open, 80/tcp open, 443/tcp open', delay: 1200 },
  { text: '[*] Exploiting CVE-2024-FAKE-1337...', delay: 2000 },
  { text: '[*] Injecting payload... ██████████████████ 100%', delay: 3000 },
  { text: '[*] Bypassing firewall...', delay: 3800 },
  { text: '[*] Decrypting credentials...', delay: 4600 },
  { text: '[!] ROOT ACCESS OBTAINED', delay: 5400, color: 'error' },
  { text: '', delay: 5800 },
  { text: '    ╔══════════════════════════════════════╗', delay: 5800 },
  { text: '    ║     🔓  A C C E S S   G R A N T E D  ║', delay: 6000 },
  { text: '    ╚══════════════════════════════════════╝', delay: 6200 },
  { text: '', delay: 6600 },
  { text: 'Just kidding. But you looked pretty worried there.', delay: 7000, color: 'comment' },
]

export default function HackSequence({ theme }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const timers = STEPS.map((step, i) =>
      setTimeout(() => setVisibleCount(i + 1), step.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="space-y-0.5">
      {STEPS.slice(0, visibleCount).map((step, i) => {
        let color = theme.success
        if (step.color === 'error') color = theme.error
        else if (step.color === 'comment') color = theme.comment
        return (
          <div key={i} className="text-sm font-mono" style={{ color }}>
            {step.text}
          </div>
        )
      })}
    </div>
  )
}
