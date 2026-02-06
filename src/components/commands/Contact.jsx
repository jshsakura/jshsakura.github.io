import { useState, useRef, useEffect } from 'react'
import { resumeData } from '../../data/resume'

const FORMSPREE_URL = 'https://formspree.io/f/mdovkpkg'

function ContactInfo({ theme }) {
  const { personal } = resumeData

  const links = [
    { label: 'GitHub', value: personal.github.replace('https://', ''), href: personal.github, color: theme.fg },
    { label: 'Blog', value: 'opencourse.kr', href: 'https://opencourse.kr', color: theme.success },
    { label: 'Email', value: personal.email, href: `mailto:${personal.email}`, color: theme.accent },
    { label: 'Location', value: personal.location, href: null, color: theme.prompt },
  ]

  return (
    <div className="space-y-1.5">
      {links.map((link) => (
        <div key={link.label} className="flex items-center gap-3">
          <span className="w-20 shrink-0 font-medium text-sm" style={{ color: theme.comment }}>
            {link.label}:
          </span>
          {link.href ? (
            <a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-2 hover:brightness-125 transition-all"
              style={{ color: link.color }}
            >
              {link.value}
            </a>
          ) : (
            <span className="text-sm" style={{ color: link.color }}>{link.value}</span>
          )}
        </div>
      ))}
    </div>
  )
}

function ContactForm({ theme }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const nameRef = useRef(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('validation')
      return
    }

    setStatus('sending')

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    backgroundColor: `${theme.fg}08`,
    border: `1px solid ${theme.border}`,
    color: theme.fg,
    fontFamily: 'inherit',
    outline: 'none',
  }

  const focusStyle = `${theme.accent}`

  if (status === 'sent') {
    return (
      <div className="space-y-2 mt-4">
        <div className="text-sm font-semibold" style={{ color: theme.success }}>
          Message sent!
        </div>
        <div className="text-sm" style={{ color: theme.comment }}>
          Thanks for reaching out. I'll get back to you soon.
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm mt-2 rounded cursor-pointer transition-all hover:brightness-110"
          style={{
            padding: '6px 16px',
            backgroundColor: `${theme.accent}20`,
            color: theme.accent,
            border: `1px solid ${theme.accent}40`,
          }}
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
      <div className="text-sm font-semibold" style={{ color: theme.accent, marginBottom: '10px' }}>
        Send me a message:
      </div>

      {status === 'validation' && (
        <div className="text-sm" style={{ color: theme.error }}>
          All fields are required.
        </div>
      )}

      {status === 'error' && (
        <div className="text-sm" style={{ color: theme.error }}>
          Failed to send. Please try again or use the email above.
        </div>
      )}

      <div>
        <div className="flex items-center gap-3">
          <label className="shrink-0 text-sm font-medium" style={{ color: theme.comment, width: '64px' }}>
            Name
          </label>
          <input
            ref={nameRef}
            type="text"
            value={form.name}
            onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
            className="flex-1 text-sm rounded transition-colors"
            style={{ ...inputStyle, padding: '8px 12px' }}
            onFocus={(e) => { e.target.style.borderColor = focusStyle }}
            onBlur={(e) => { e.target.style.borderColor = theme.border }}
            placeholder="Your name"
          />
        </div>

        <div style={{ height: '10px' }} />

        <div className="flex items-center gap-3">
          <label className="shrink-0 text-sm font-medium" style={{ color: theme.comment, width: '64px' }}>
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
            className="flex-1 text-sm rounded transition-colors"
            style={{ ...inputStyle, padding: '8px 12px' }}
            onFocus={(e) => { e.target.style.borderColor = focusStyle }}
            onBlur={(e) => { e.target.style.borderColor = theme.border }}
            placeholder="your@email.com"
          />
        </div>

        <div style={{ height: '10px' }} />

        <div className="flex items-start gap-3">
          <label className="shrink-0 text-sm font-medium" style={{ color: theme.comment, width: '64px', marginTop: '8px' }}>
            Message
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
            className="flex-1 text-sm rounded transition-colors resize-none"
            style={{ ...inputStyle, padding: '8px 12px', minHeight: '100px' }}
            onFocus={(e) => { e.target.style.borderColor = focusStyle }}
            onBlur={(e) => { e.target.style.borderColor = theme.border }}
            placeholder="What would you like to discuss?"
          />
        </div>

        <div style={{ height: '10px' }} />
      </div>

      <div style={{ paddingLeft: '76px' }}>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="text-sm rounded cursor-pointer transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          style={{
            padding: '8px 20px',
            backgroundColor: theme.accent,
            color: theme.bg,
            border: 'none',
          }}
        >
          {status === 'sending' ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  )
}

export default function Contact({ theme }) {
  return (
    <div className="space-y-4">
      <div className="text-base font-semibold" style={{ color: theme.accent }}>
        Get in Touch
      </div>

      <ContactInfo theme={theme} />

      <div
        className="h-px w-full my-3"
        style={{ backgroundColor: theme.border }}
      />

      <ContactForm theme={theme} />
    </div>
  )
}
