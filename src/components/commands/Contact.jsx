import { useState, useRef, useEffect } from 'react'
import { resumeData } from '../../data/resume'

const FORMSPREE_URL = 'https://formspree.io/f/mdovkpkg'

function ContactInfo({ theme }) {
  const { personal } = resumeData

  const links = [
    {
      label: 'GitHub',
      value: personal.github.replace('https://', ''),
      href: personal.github,
      color: theme.fg,
      icon: (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
      ),
    },
    {
      label: 'Blog',
      value: 'opencourse.kr',
      href: 'https://opencourse.kr',
      color: theme.success,
      icon: (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="6.5" />
          <ellipse cx="8" cy="8" rx="3" ry="6.5" />
          <path d="M1.5 8h13M2.5 4.5h11M2.5 11.5h11" />
        </svg>
      ),
    },
    {
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: theme.accent,
      icon: (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
          <path d="M1.5 4.5L8 9l6.5-4.5" />
        </svg>
      ),
    },
    {
      label: 'Location',
      value: personal.location,
      href: null,
      color: theme.prompt,
      icon: (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 1.5a4.5 4.5 0 014.5 4.5c0 3.5-4.5 8.5-4.5 8.5S3.5 9.5 3.5 6A4.5 4.5 0 018 1.5z" />
          <circle cx="8" cy="6" r="1.5" />
        </svg>
      ),
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2" style={{ maxWidth: '520px' }}>
      {links.map((link) => (
        <div
          key={link.label}
          className="flex items-center gap-3 rounded-lg transition-colors"
          style={{
            padding: '10px 14px',
            backgroundColor: `${link.color}08`,
            border: `1px solid ${link.color}20`,
          }}
        >
          <div
            className="shrink-0 flex items-center justify-center rounded-md"
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: `${link.color}15`,
              color: link.color,
            }}
          >
            {link.icon}
          </div>
          <div className="min-w-0">
            <div className="text-xs" style={{ color: theme.comment }}>{link.label}</div>
            {link.href ? (
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="text-sm font-medium truncate block hover:brightness-125 transition-all"
                style={{ color: link.color }}
              >
                {link.value}
              </a>
            ) : (
              <span className="text-sm font-medium truncate block" style={{ color: link.color }}>
                {link.value}
              </span>
            )}
          </div>
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
      <div
        className="rounded-lg mt-4"
        style={{
          padding: '16px 18px',
          backgroundColor: `${theme.success}08`,
          border: `1px solid ${theme.success}25`,
          maxWidth: '520px',
        }}
      >
        <div className="text-sm font-semibold mb-1" style={{ color: theme.success }}>
          Message sent!
        </div>
        <div className="text-sm mb-3" style={{ color: theme.comment }}>
          Thanks for reaching out. I'll get back to you soon.
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm rounded cursor-pointer transition-all hover:brightness-110"
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

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          ref={nameRef}
          type="text"
          value={form.name}
          onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
          className="text-sm rounded transition-colors"
          style={{ ...inputStyle, padding: '10px 12px' }}
          onFocus={(e) => { e.target.style.borderColor = focusStyle }}
          onBlur={(e) => { e.target.style.borderColor = theme.border }}
          placeholder="Name"
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
          className="text-sm rounded transition-colors"
          style={{ ...inputStyle, padding: '10px 12px' }}
          onFocus={(e) => { e.target.style.borderColor = focusStyle }}
          onBlur={(e) => { e.target.style.borderColor = theme.border }}
          placeholder="Email"
        />
      </div>

      <textarea
        value={form.message}
        onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
        className="w-full text-sm rounded transition-colors resize-none"
        style={{ ...inputStyle, padding: '10px 12px', minHeight: '100px' }}
        onFocus={(e) => { e.target.style.borderColor = focusStyle }}
        onBlur={(e) => { e.target.style.borderColor = theme.border }}
        placeholder="What would you like to discuss?"
      />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="text-sm rounded cursor-pointer transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        style={{
          padding: '8px 24px',
          backgroundColor: theme.accent,
          color: theme.bg,
          border: 'none',
        }}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
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
        style={{ backgroundColor: theme.border, maxWidth: '520px' }}
      />

      <ContactForm theme={theme} />
    </div>
  )
}
