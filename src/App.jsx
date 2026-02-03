import { Suspense, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import Game from './components/game/Game'
import UI from './components/ui/UI'
import LoadingScreen from './components/ui/LoadingScreen'

function App() {
  const [currentRoom, setCurrentRoom] = useState('welcome')
  const [isLoaded, setIsLoaded] = useState(false)
  const [playerPosition, setPlayerPosition] = useState([0, 0, 0])

  const handleLoaded = useCallback(() => {
    setTimeout(() => setIsLoaded(true), 800)
  }, [])

  return (
    <div className="w-screen h-screen overflow-hidden cursor-pointer">
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
        style={{ background: 'linear-gradient(180deg, #eff1f5 0%, #e6e9ef 50%, #dce0e8 100%)' }}
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
  )
}

export default App
