export default function RickrollPopup({ onClose }) {
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
            padding: '15px 20px',
            fontFamily: 'monospace',
            fontSize: '15px',
            lineHeight: 1.8,
            opacity: 0.5,
            columns: '2',
            columnGap: '30px',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <div style={{ color: '#ff6b6b' }}>
            <span style={{ color: '#fff', opacity: 0.7 }}>Call Stack:</span><br/>
            at UserTrust (&lt;anonymous&gt;:42:7)<br/>
            at NeverGonnaGiveYouUp (node_modules/.pnpm/♫:1:1)<br/>
            at NeverGonnaLetYouDown (node_modules/.pnpm/♫:2:1)<br/>
            at NeverGonnaRunAround (node_modules/.pnpm/♫:3:1)<br/>
            at AndDesertYou (node_modules/.pnpm/♫:4:1)<br/>
            at NeverGonnaMakeYouCry (node_modules/.pnpm/♫:5:1)<br/>
            at NeverGonnaSayGoodbye (node_modules/.pnpm/♫:6:1)<br/>
            at NeverGonnaTellALie (node_modules/.pnpm/♫:7:1)<br/>
            at AndHurtYou (node_modules/.pnpm/♫:8:1)<br/>
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
