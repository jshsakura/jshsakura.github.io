import { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Player from './Player'
import World from './World'
import * as THREE from 'three'

export default function Game({ setCurrentRoom, setPlayerPosition }) {
  const { camera } = useThree()
  const playerRef = useRef()
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    if (playerRef.current) {
      const playerPos = playerRef.current.translation()

      // Smooth camera follow
      cameraTarget.current.lerp(
        new THREE.Vector3(playerPos.x, playerPos.y, playerPos.z),
        0.05
      )

      camera.position.x = cameraTarget.current.x + 20
      camera.position.y = 20
      camera.position.z = cameraTarget.current.z + 20
      camera.lookAt(cameraTarget.current)

      setPlayerPosition([playerPos.x, playerPos.y, playerPos.z])
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <hemisphereLight
        skyColor="#87ceeb"
        groundColor="#f0e68c"
        intensity={0.4}
      />

      {/* Fog for depth */}
      <fog attach="fog" args={['#e0f7fa', 30, 80]} />

      <Physics gravity={[0, -20, 0]}>
        <Player ref={playerRef} />
        <World setCurrentRoom={setCurrentRoom} />
      </Physics>
    </>
  )
}
