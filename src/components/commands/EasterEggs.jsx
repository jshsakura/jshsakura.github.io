import { useState, useEffect } from 'react'

export function EasterProfile({ theme }) {
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

export function SudoRm({ theme }) {
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
