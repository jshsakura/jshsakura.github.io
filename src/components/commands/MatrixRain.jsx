import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]|;:<>,.?/~`'
const DURATION = 6000

export default function MatrixRain({ theme }) {
  const canvasRef = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const fontSize = 14
    const w = canvas.width = canvas.parentElement.offsetWidth
    const h = canvas.height = 200
    const cols = Math.floor(w / fontSize)
    const drops = Array(cols).fill(1)

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = theme.success || '#00ff41'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }, 40)

    const timer = setTimeout(() => {
      clearInterval(interval)
      setDone(true)
    }, DURATION)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [theme.success])

  return (
    <div className="space-y-2">
      <div className="text-sm" style={{ color: theme.success }}>
        Wake up, visitor...
      </div>
      <div style={{ borderRadius: '4px', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '200px', background: '#000' }} />
      </div>
      {done && (
        <div className="text-sm" style={{ color: theme.success }}>
          The Matrix has you. Follow the white rabbit.
        </div>
      )}
    </div>
  )
}
