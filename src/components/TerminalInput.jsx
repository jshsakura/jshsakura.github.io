import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const charVariants = {
  initial: { opacity: 0, scale: 1.4 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.08, ease: 'easeOut' },
  },
  exit: { opacity: 0, scale: 0.6, transition: { duration: 0.05 } },
}

function PowerlinePrompt({ theme }) {
  const segments = [
    { text: ' visitor ', bg: theme.accent, fg: theme.bg },
    { text: ' devterminal ', bg: theme.prompt, fg: theme.bg },
    { text: ' ~ ', bg: theme.border, fg: theme.fg },
  ]

  return (
    <div className="flex items-center shrink-0 select-none text-xs" style={{ marginRight: '10px' }}>
      {segments.map((seg, i) => {
        const nextBg = i < segments.length - 1 ? segments[i + 1].bg : 'transparent'
        return (
          <span key={i} className="flex items-stretch">
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
    </div>
  )
}

export default function TerminalInput({ onExecute, onNavigateHistory, onAutocomplete, theme, isFocusRequested }) {
  const [input, setInput] = useState('')
  const [prevLength, setPrevLength] = useState(0)
  const [cursorPos, setCursorPos] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [isFocusRequested])

  const syncCursor = useCallback(() => {
    requestAnimationFrame(() => {
      if (inputRef.current) {
        setCursorPos(inputRef.current.selectionStart ?? inputRef.current.value.length)
      }
    })
  }, [])

  const handleChange = useCallback((e) => {
    setPrevLength(input.length)
    setInput(e.target.value)
    syncCursor()
  }, [input.length, syncCursor])

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        if (input.trim()) {
          onExecute(input)
          setInput('')
          setPrevLength(0)
          setCursorPos(0)
        }
        break

      case 'ArrowUp': {
        e.preventDefault()
        const prevCmd = onNavigateHistory('up')
        if (prevCmd !== null) {
          setPrevLength(0)
          setInput(prevCmd)
          setCursorPos(prevCmd.length)
          requestAnimationFrame(() => {
            if (inputRef.current) {
              inputRef.current.selectionStart = prevCmd.length
              inputRef.current.selectionEnd = prevCmd.length
            }
          })
        }
        break
      }

      case 'ArrowDown': {
        e.preventDefault()
        const nextCmd = onNavigateHistory('down')
        if (nextCmd !== null) {
          setPrevLength(0)
          setInput(nextCmd)
          setCursorPos(nextCmd.length)
          requestAnimationFrame(() => {
            if (inputRef.current) {
              inputRef.current.selectionStart = nextCmd.length
              inputRef.current.selectionEnd = nextCmd.length
            }
          })
        }
        break
      }

      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Home':
      case 'End':
        syncCursor()
        break

      case 'Tab': {
        e.preventDefault()
        const result = onAutocomplete(input)
        if (typeof result === 'string') {
          setPrevLength(0)
          setInput(result)
          setCursorPos(result.length)
        }
        break
      }

      case 'a':
        if (e.ctrlKey) {
          e.preventDefault()
          if (inputRef.current) {
            inputRef.current.selectionStart = 0
            inputRef.current.selectionEnd = 0
            setCursorPos(0)
          }
        }
        break

      case 'e':
        if (e.ctrlKey) {
          e.preventDefault()
          if (inputRef.current) {
            inputRef.current.selectionStart = input.length
            inputRef.current.selectionEnd = input.length
            setCursorPos(input.length)
          }
        }
        break

      case 'l':
        if (e.ctrlKey) {
          e.preventDefault()
          onExecute('clear')
        }
        break
    }
  }, [input, onExecute, onNavigateHistory, onAutocomplete, syncCursor])

  const handleSelect = useCallback(() => {
    if (inputRef.current) {
      setCursorPos(inputRef.current.selectionStart ?? input.length)
    }
  }, [input.length])

  const isTyping = input.length > prevLength

  return (
    <div
      className="flex items-center shrink-0"
      style={{ padding: '12px 10px', borderTop: `1px solid ${theme.border}` }}
      onClick={() => inputRef.current?.focus()}
    >
      <PowerlinePrompt theme={theme} />
      <div className="relative flex-1" style={{ minHeight: '24px' }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onSelect={handleSelect}
          className="absolute inset-0 w-full bg-transparent outline-none text-sm caret-transparent"
          style={{ color: 'transparent', fontFamily: 'inherit' }}
          lang="en"
          inputMode="latin"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <div
          className="flex items-center pointer-events-none text-sm"
          style={{ fontFamily: 'inherit', minHeight: '24px' }}
        >
          <AnimatePresence mode="popLayout">
            {input.split('').map((char, i) => (
              <motion.span
                key={`${i}-${char}`}
                variants={charVariants}
                initial={isTyping && i >= prevLength ? 'initial' : false}
                animate="animate"
                exit="exit"
                style={{
                  color: i === cursorPos ? theme.bg : theme.fg,
                  backgroundColor: i === cursorPos ? theme.cursorColor : 'transparent',
                  display: 'inline-block',
                  whiteSpace: 'pre',
                }}
              >
                {char}
              </motion.span>
            ))}
          </AnimatePresence>
          <motion.span
            className={cursorPos >= input.length ? 'cursor-blink' : ''}
            style={{
              color: theme.cursorColor,
              fontSize: '14px',
              display: 'inline-block',
              marginLeft: '2px',
              opacity: cursorPos >= input.length ? 1 : 0,
            }}
          >
            _
          </motion.span>
        </div>
      </div>
    </div>
  )
}
