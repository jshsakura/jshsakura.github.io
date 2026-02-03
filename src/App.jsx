import { Suspense, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import Game from './components/game/Game'
import UI from './components/ui/UI'
import LoadingScreen from './components/ui/LoadingScreen'

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'run', keys: ['ShiftLeft', 'ShiftRight'] },
]

function App() {
  const [currentRoom, setCurrentRoom] = useState('welcome')
  const [isLoaded, setIsLoaded] = useState(false)
  const [playerPosition, setPlayerPosition] = useState([0, 0, 0])

  const handleLoaded = useCallback(() => {
    setTimeout(() => setIsLoaded(true), 800)
  }, [])

  return (
    <KeyboardControls map={keyboardMap}>
      <div className="w-screen h-screen overflow-hidden">
        <LoadingScreen isLoaded={isLoaded} />

        <Canvas
          shadows
          orthographic
          camera={{
            zoom: 50,
            position: [20, 20, 20],
            near: 0.1,
            far: 1000,
          }}
          onCreated={handleLoaded}
          style={{ background: 'linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)' }}
        >
          <Suspense fallback={null}>
            <Game
              setCurrentRoom={setCurrentRoom}
              setPlayerPosition={setPlayerPosition}
            />
          </Suspense>
        </Canvas>

        <UI
          currentRoom={currentRoom}
          playerPosition={playerPosition}
          isLoaded={isLoaded}
        />
      </div>
    </KeyboardControls>
  )
}

export default App
