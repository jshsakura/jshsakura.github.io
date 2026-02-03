import { useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Player from './Player'
import World from './World'
import ClickIndicator from './ClickIndicator'
import * as THREE from 'three'

export default function Game({ setCurrentRoom, setPlayerPosition }) {
  const { camera, gl } = useThree()
  const playerRef = useRef()
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0))
  const [targetPosition, setTargetPosition] = useState(null)
  const floorPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0))
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())

  const handleClick = (event) => {
    const rect = gl.domElement.getBoundingClientRect()
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.current.setFromCamera(mouse.current, camera)
    const intersectPoint = new THREE.Vector3()
    raycaster.current.ray.intersectPlane(floorPlane.current, intersectPoint)

    if (intersectPoint) {
      setTargetPosition([intersectPoint.x, 0, intersectPoint.z])
    }
  }

  useFrame(() => {
    if (playerRef.current) {
      const playerPos = playerRef.current.translation()

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

      <fog attach="fog" args={['#e0f7fa', 30, 80]} />

      {/* Click detection plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[5, 0, -6]}
        onClick={handleClick}
        visible={false}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <Physics gravity={[0, -20, 0]}>
        <Player ref={playerRef} targetPosition={targetPosition} />
        <World setCurrentRoom={setCurrentRoom} />
      </Physics>

      {targetPosition && <ClickIndicator position={targetPosition} />}
    </>
  )
}
