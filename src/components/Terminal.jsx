import { useState, useCallback, useEffect, useMemo } from 'react'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'
import ShortcutBar from './ShortcutBar'
import useTerminal from '../hooks/useTerminal'
import { themes } from '../data/resume'

function RickrollPopup({ onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* 상단 에러 헤더 + 닫기 버튼 */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          background: '#c41e3a',
          color: '#fff',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700 }}>Unhandled Runtime Error</div>
          <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>
            Error: ERR_UNEXPECTED_RICKROLL
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '12px',
            padding: '4px 12px',
            borderRadius: '4px',
          }}
        >
          ✕ Close
        </button>
      </div>

      {/* 배경: 콜스택 오류 메시지 */}
      <div style={{
        position: 'absolute',
        top: '48px',
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>

        <div
          style={{
            padding: '20px 24px',
            fontFamily: 'monospace',
            fontSize: '13px',
            lineHeight: 2,
            opacity: 0.4,
            columns: '2',
            columnGap: '40px',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <div style={{ color: '#ff6b6b' }}>
            <span style={{ color: '#fff', opacity: 0.7 }}>Call Stack:</span><br/>
            at UserTrust (./src/components/Terminal.jsx:42:7)<br/>
            at NeverGonnaGiveYouUp (./src/easter/rick.js:1:1)<br/>
            at NeverGonnaLetYouDown (./src/easter/rick.js:2:1)<br/>
            at NeverGonnaRunAround (./src/easter/rick.js:3:1)<br/>
            at AndDesertYou (./src/easter/rick.js:4:1)<br/>
            at NeverGonnaMakeYouCry (./src/easter/rick.js:5:1)<br/>
            at NeverGonnaSayGoodbye (./src/easter/rick.js:6:1)<br/>
            at NeverGonnaTellALie (./src/easter/rick.js:7:1)<br/>
            at AndHurtYou (./src/easter/rick.js:8:1)<br/>
          </div>
          <div style={{ color: '#e5c07b', marginTop: '8px' }}>
            ⚠ Warning: Cannot update a component while rendering<br/>
            &nbsp;&nbsp;a different component. (found in RickAstley)<br/>
            ⚠ Warning: Each child in a list should have a unique<br/>
            &nbsp;&nbsp;"key" prop. Check the render method of `Feelings`.<br/>
            ⚠ Warning: componentWillMount has been renamed.<br/>
            &nbsp;&nbsp;Please update NeverGonnaGiveYouUp component.<br/>
          </div>
          <div style={{ color: '#ff6b6b', marginTop: '8px' }}>
            at WeveKnownEachOther (./src/promises/forever.js:10:3)<br/>
            at ForSoLong (./src/promises/forever.js:11:3)<br/>
            at YourHeartsBeenAching (./src/promises/forever.js:12:3)<br/>
            at ButYoureTooShy (./src/promises/forever.js:13:3)<br/>
            at ToSayIt (./src/promises/forever.js:14:3)<br/>
          </div>
          <div style={{ color: '#f44747', marginTop: '8px' }}>
            TypeError: Cannot read properties of undefined<br/>
            &nbsp;&nbsp;(reading 'yourHeart')<br/>
            &nbsp;&nbsp;at FullCommitment (./src/love/rules.js:1:1)<br/>
            &nbsp;&nbsp;at WouldntGetThis (./src/love/rules.js:2:1)<br/>
            &nbsp;&nbsp;at FromAnyOtherGuy (./src/love/rules.js:3:1)<br/>
          </div>
          <div style={{ color: '#e5c07b', marginTop: '8px' }}>
            ⚠ Warning: Detected infinite loop in useHeartbeat()<br/>
            ⚠ Warning: Memory leak detected in EmotionalState<br/>
            &nbsp;&nbsp;subscription. Unsubscribe in cleanup function.<br/>
            ⚠ Warning: Failed prop type: Invalid prop `trust`<br/>
            &nbsp;&nbsp;of type `boolean` supplied to `Stranger`.<br/>
          </div>
          <div style={{ color: '#ff6b6b', marginTop: '8px' }}>
            at InsideWeBothKnow (./src/state/feelings.js:20:5)<br/>
            at WhatsBeenGoingOn (./src/state/feelings.js:21:5)<br/>
            at WeKnowTheGame (./src/state/feelings.js:22:5)<br/>
            at AndWereGonnaPlayIt (./src/state/feelings.js:23:5)<br/>
          </div>
          <div style={{ color: '#f44747', marginTop: '8px' }}>
            RangeError: Maximum call stack size exceeded<br/>
            &nbsp;&nbsp;at NeverGonna.recursive (./src/loop/forever.js:∞)<br/>
            &nbsp;&nbsp;at Promise.resolve.then.catch.finally<br/>
            &nbsp;&nbsp;at async GiveYouUp (./src/easter/rick.js:1:1)<br/>
            &nbsp;&nbsp;at async LetYouDown (./src/easter/rick.js:2:1)<br/>
          </div>
          <div style={{ color: '#e5c07b', marginTop: '8px' }}>
            ⚠ Warning: Can't perform state update on unmounted<br/>
            &nbsp;&nbsp;component: Relationship. This is a no-op.<br/>
            ⚠ Warning: Encountered two children with same key<br/>
            &nbsp;&nbsp;`rick-astley`. Keys should be unique.<br/>
          </div>
          <div style={{ color: '#ff6b6b', marginTop: '8px' }}>
            at IJustWannaTellYou (./src/confession/index.js:7:1)<br/>
            at HowImFeeling (./src/confession/index.js:8:1)<br/>
            at GottaMakeYou (./src/confession/index.js:9:1)<br/>
            at Understand (./src/confession/index.js:10:1)<br/>
          </div>
          <div style={{ color: '#f44747', marginTop: '8px' }}>
            Error: ERICKROLL - unexpected emotional damage<br/>
            &nbsp;&nbsp;errno: -42, code: 'RICKROLLED',<br/>
            &nbsp;&nbsp;syscall: 'trust', path: '/dev/heart'<br/>
            <br/>
            Uncaught (in promise) DOMException:<br/>
            &nbsp;&nbsp;play() request was interrupted by a call<br/>
            &nbsp;&nbsp;to rickroll(). AbortError<br/>
          </div>
          <div style={{ color: '#ff6b6b', marginTop: '8px' }}>
            at RickrollProvider (./src/hooks/useTerminal.js:120:13)<br/>
            at EmotionalDamage (./src/utils/gotcha.js:69:420)<br/>
            at Object.apply (react-dom.development.js:4321:12)<br/>
            at processChild (react-dom.development.js:6891:14)<br/>
            at performUnitOfWork (react-dom.development.js:7023:7)<br/>
            at workLoopSync (react-dom.development.js:7112:5)<br/>
            at renderRoot (react-dom.development.js:7193:7)<br/>
            at performWork (react-dom.development.js:7432:9)<br/>
          </div>
          <div style={{ color: '#e5c07b', marginTop: '8px' }}>
            console.warn: [Deprecation] SharedArrayBuffer will<br/>
            &nbsp;&nbsp;require cross-origin isolation as of M91.<br/>
            console.error: [React] Hydration mismatch in<br/>
            &nbsp;&nbsp;&lt;RickRoll&gt;. Server: "gonna" Client: "never"<br/>
          </div>
        </div>
      </div>


      {/* 중앙: 영상 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        pointerEvents: 'none',
      }}>
        <div style={{ width: '100%', maxWidth: '640px', pointerEvents: 'auto' }}>
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Error Recovery"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '8px',
              border: 'none',
            }}
          />
        </div>
      </div>
    </div>
  )
}

function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export default function Terminal({ themeName, setThemeName, windowState, setWindowState }) {
  const theme = themes[themeName] || themes.default
  const [focusTrigger, setFocusTrigger] = useState(0)
  const now = useClock()
  const timeStr = useMemo(() => {
    const h = now.getHours().toString().padStart(2, '0')
    const m = now.getMinutes().toString().padStart(2, '0')
    const s = now.getSeconds().toString().padStart(2, '0')
    return `${h}:${m}:${s}`
  }, [now])

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
      addOutput('system', "Type 'help' for available commands. Click the shortcuts below or just start typing.")
    }, 300)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCommand = useCallback((cmd) => {
    executeCommand(cmd)
    setFocusTrigger(prev => prev + 1)
  }, [executeCommand])

  const handleTerminalClick = useCallback(() => {
    setFocusTrigger(prev => prev + 1)
  }, [])

  return (
    <div
      className="flex flex-col h-full max-h-full overflow-x-hidden"
      style={{ '--scrollbar-color': theme.scrollbar }}
    >
      <div
        className="flex items-center gap-3 shrink-0 select-none"
        style={{
          padding: '6px 10px',
          backgroundColor: theme.headerBg,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div className="flex gap-2.5 window-buttons">
          <button
            className="rounded-full bg-[#ff5f57] window-btn cursor-pointer"
            onClick={() => setWindowState('closed')}
            title="Close"
          >
            <span className="window-btn-icon">✕</span>
          </button>
          <button
            className="rounded-full bg-[#febc2e] window-btn cursor-pointer"
            onClick={() => setWindowState('minimized')}
            title="Minimize"
          >
            <span className="window-btn-icon">−</span>
          </button>
          <button
            className="rounded-full bg-[#28c840] window-btn cursor-pointer"
            onClick={() => setWindowState(windowState === 'maximized' ? 'normal' : 'maximized')}
            title={windowState === 'maximized' ? 'Restore' : 'Maximize'}
          >
            <span className="window-btn-icon">{windowState === 'maximized' ? '⤓' : '⤢'}</span>
          </button>
        </div>
        <div
          className="flex-1 text-center text-sm"
          style={{ color: theme.comment }}
        >
          visitor@devterminal:~
        </div>
        <div className="shrink-0" style={{ color: theme.comment, fontSize: '10px', fontVariantNumeric: 'tabular-nums' }}>
          {timeStr}
        </div>
      </div>

      <div
        className="flex-1 flex flex-col min-h-0 relative"
        style={{ backgroundColor: theme.bg }}
        onClick={handleTerminalClick}
      >
        <div className="scanline-overlay" />
        <TerminalOutput outputs={outputs} theme={theme} />
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
        <RickrollPopup onClose={() => setShowRickroll(false)} />
      )}
    </div>
  )
}
