import { Suspense, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'

import Game from './components/game/Game'
import UI from './components/ui/UI'
import LoadingScreen from './components/ui/LoadingScreen'
import { CAMERA } from './constants/config'

/**
 * 젤다 꿈꾸는 섬 스타일 메인 앱
 */
function App() {
  const [currentRoom, setCurrentRoom] = useState('welcome')
  const [isLoaded, setIsLoaded] = useState(false)
  const [playerPosition, setPlayerPosition] = useState([0, 0, 0])

  const handleLoaded = useCallback(() => {
    setTimeout(() => setIsLoaded(true), 800)
  }, [])

  return (
    <div className="w-screen h-screen overflow-hidden cursor-pointer bg-sky-200">
      <LoadingScreen isLoaded={isLoaded} />

      <Canvas
        shadows
        orthographic
        camera={{
          zoom: CAMERA.ZOOM,
          position: [CAMERA.OFFSET_X, CAMERA.OFFSET_Y, CAMERA.OFFSET_Z],
          near: CAMERA.NEAR,
          far: CAMERA.FAR,
        }}
        onCreated={handleLoaded}
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
