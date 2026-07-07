import { useState, useCallback, useEffect, useMemo, lazy, Suspense } from 'react'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'
import ShortcutBar from './ShortcutBar'
import useTerminal from '../hooks/useTerminal'
import { themes } from '../data/resume'
import { isCoarsePointer } from '../utils/pointer'
import { useLanguage } from '../i18n/useLanguage'
import { uiStrings } from '../i18n/strings'

const RickrollPopup = lazy(() => import('./RickrollPopup'))

function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

function HeaderClock({ theme }) {
  const now = useClock()
  const timeStr = useMemo(() => {
    const h = now.getHours().toString().padStart(2, '0')
    const m = now.getMinutes().toString().padStart(2, '0')
    const s = now.getSeconds().toString().padStart(2, '0')
    return `${h}:${m}:${s}`
  }, [now])

  return (
    <div className="shrink-0" style={{ color: theme.comment, fontSize: '10px', fontVariantNumeric: 'tabular-nums' }}>
      {timeStr}
    </div>
  )
}

export default function Terminal({ themeName, setThemeName, windowState, setWindowState }) {
  const theme = themes[themeName] || themes.default
  const [focusTrigger, setFocusTrigger] = useState(0)
  const { lang } = useLanguage()

  const {
    outputs,
    executeCommand,
    navigateHistory,
    getAutocomplete,
    addOutput,
    showRickroll,
    setShowRickroll,
  } = useTerminal({ theme: themeName, setThemeName, themes })

  useEffect(() => {
    const timer = setTimeout(() => {
      addOutput('output', { type: 'neofetch', themeName })
      addOutput('system', uiStrings[lang].boot.helpHint)
    }, 300)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCommand = useCallback((cmd) => {
    executeCommand(cmd)
    if (!isCoarsePointer()) setFocusTrigger(prev => prev + 1)
  }, [executeCommand])

  const handleTerminalClick = useCallback(() => {
    if (!isCoarsePointer()) setFocusTrigger(prev => prev + 1)
  }, [])

  const handleCloseRickroll = useCallback(() => {
    setShowRickroll(false)
  }, [setShowRickroll])

  return (
    <div
      className="flex flex-col h-full max-h-full overflow-x-hidden"
      style={{ '--scrollbar-color': theme.scrollbar }}
    >
      <div
        className="flex items-center gap-2 sm:gap-3 shrink-0 select-none"
        style={{
          padding: '6px 10px',
          backgroundColor: theme.headerBg,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div className="flex gap-2 sm:gap-2.5 window-buttons">
          <button
            className="rounded-full bg-[#ff5f57] window-btn cursor-pointer"
            onClick={() => setWindowState('closed')}
            title="Close"
          >
            <svg className="window-btn-icon" viewBox="0 0 12 12" width="10" height="10">
              <path d="M3.5 3.5l5 5M8.5 3.5l-5 5" stroke="rgba(0,0,0,0.8)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <button
            className="rounded-full bg-[#febc2e] window-btn cursor-pointer"
            onClick={() => setWindowState('minimized')}
            title="Minimize"
          >
            <svg className="window-btn-icon" viewBox="0 0 12 12" width="10" height="10">
              <path d="M3 6h6" stroke="rgba(0,0,0,0.8)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <button
            className="rounded-full bg-[#28c840] window-btn cursor-pointer hidden sm:flex"
            onClick={() => setWindowState(windowState === 'maximized' ? 'normal' : 'maximized')}
            title={windowState === 'maximized' ? 'Restore' : 'Maximize'}
          >
            <svg className="window-btn-icon" viewBox="0 0 12 12" width="10" height="10">
              {windowState === 'maximized' ? (
                <path d="M3 8V5.5a1 1 0 011-1H7M9 4V6.5a1 1 0 01-1 1H5" stroke="rgba(0,0,0,0.8)" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M3.5 3.5l5 5M3.5 3.5v4M3.5 3.5h4" stroke="rgba(0,0,0,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
        <div
          className="flex-1 text-center text-xs sm:text-sm truncate"
          style={{ color: theme.comment }}
        >
          <span className="hidden sm:inline">visitor@devterminal:~</span>
          <span className="sm:hidden">devterminal</span>
        </div>
        <HeaderClock theme={theme} />
      </div>

      <div
        className="flex-1 flex flex-col min-h-0 relative"
        style={{ backgroundColor: theme.bg }}
        onClick={handleTerminalClick}
      >
        <div className="scanline-overlay" />
        <TerminalOutput outputs={outputs} theme={theme} onCommand={handleCommand} />
        <TerminalInput
          onExecute={handleCommand}
          onNavigateHistory={navigateHistory}
          onAutocomplete={getAutocomplete}
          theme={theme}
          isFocusRequested={focusTrigger}
        />
      </div>

      <ShortcutBar onCommand={handleCommand} theme={theme} />

      {showRickroll && (
        <Suspense fallback={null}>
          <RickrollPopup onClose={handleCloseRickroll} />
        </Suspense>
      )}
    </div>
  )
}
