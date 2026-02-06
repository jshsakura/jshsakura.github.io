import { useState } from 'react'
import Terminal from './components/Terminal'
import { themes } from './data/resume'

function DesktopView({ theme, onOpen }) {
  return (
    <div
      className="h-dvh w-screen flex flex-col items-center justify-center select-none"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div style={{ color: theme.comment, fontSize: '13px', marginBottom: '20px' }}>
        Session ended.
      </div>
      <button
        onClick={onOpen}
        className="cursor-pointer active:scale-95"
        style={{
          padding: '8px 24px',
          borderRadius: '6px',
          background: 'none',
          border: `1px solid ${theme.comment}60`,
          color: theme.comment,
          fontSize: '12px',
          fontFamily: 'monospace',
          transition: 'transform 0.1s',
        }}
      >
        &gt;_ restart
      </button>
    </div>
  )
}

function DockBar({ theme, onRestore }) {
  return (
    <div
      className="fixed left-0 right-0 flex justify-center"
      style={{ bottom: '24px', padding: '8px', zIndex: 100 }}
    >
      <button
        onClick={onRestore}
        className="flex items-center gap-2 cursor-pointer active:scale-95"
        style={{
          padding: '6px 16px',
          borderRadius: '10px',
          background: `${theme.headerBg}ee`,
          border: `1px solid ${theme.border}`,
          color: theme.fg,
          fontSize: '12px',
          backdropFilter: 'blur(10px)',
          boxShadow: `0 2px 12px rgba(0,0,0,0.3)`,
          transition: 'transform 0.1s',
        }}
      >
        <span style={{ fontSize: '13px', fontFamily: 'monospace', color: theme.comment }}>&gt;_</span>
        devterminal
      </button>
    </div>
  )
}

function App() {
  const [themeName, setThemeName] = useState('frappe')
  const [windowState, setWindowState] = useState('normal')
  const theme = themes[themeName] || themes.default

  if (windowState === 'closed') {
    return <DesktopView theme={theme} onOpen={() => setWindowState('normal')} />
  }

  const isMaximized = windowState === 'maximized'
  const isMinimized = windowState === 'minimized'

  return (
    <div
      className={`h-dvh w-screen flex items-center justify-center ${isMaximized ? '' : 'p-3 sm:p-8 md:p-12'}`}
      style={{ 
        backgroundColor: theme.headerBg, 
        paddingTop: isMaximized ? 'env(safe-area-inset-top, 0px)' : 'max(24px, env(safe-area-inset-top, 0px))', 
        paddingBottom: isMaximized ? 'env(safe-area-inset-bottom, 0px)' : 'max(24px, env(safe-area-inset-bottom, 0px))' 
      }}
    >
      <div
        className={`overflow-hidden overflow-x-hidden terminal-glow transition-all duration-300 ${
          isMaximized
            ? 'w-full h-full'
            : 'w-full h-full sm:max-w-6xl sm:max-h-[92vh] sm:rounded-2xl'
        } ${isMinimized ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        style={{
          margin: isMaximized ? 0 : '0 15px',
          border: `1px solid ${theme.border}`,
          boxShadow: `0 0 80px ${theme.accent}08, 0 0 160px ${theme.accent}04`,
          transformOrigin: 'bottom center',
        }}
      >
        <Terminal
          themeName={themeName}
          setThemeName={setThemeName}
          windowState={windowState}
          setWindowState={setWindowState}
        />
      </div>

      {isMinimized && <DockBar theme={theme} onRestore={() => setWindowState('normal')} />}

      {!isMaximized && (
        <div
          className="fixed left-0 right-0 flex items-center justify-center select-none"
          style={{
            bottom: '0px',
            padding: '4px 10px',
            color: theme.comment,
            fontSize: '10px',
            zIndex: 50,
          }}
        >
          <span>© 2025 Husband of Rebekah — Perfectionists with deadlines!</span>
        </div>
      )}
    </div>
  )
}

export default App
