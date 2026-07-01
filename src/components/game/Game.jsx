import { useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Sky } from '@react-three/drei'
import * as THREE from 'three'

import Player from './Player'
import World from './World'
import ClickIndicator from './ClickIndicator'
import { PLAYER, CAMERA, WORLD, LIGHTS } from '../../constants/config'
import { environmentColors } from '../../constants/colors'

/**
 * 젤다 꿈꾸는 섬 스타일 게임
 */
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
        CAMERA.LERP_FACTOR
      )

      camera.position.x = cameraTarget.current.x + CAMERA.OFFSET_X
      camera.position.y = CAMERA.OFFSET_Y
      camera.position.z = cameraTarget.current.z + CAMERA.OFFSET_Z
      camera.lookAt(cameraTarget.current)

      setPlayerPosition([playerPos.x, playerPos.y, playerPos.z])
    }
  })

  return (
    <>
      {/* 밝고 맑은 하늘 */}
      <Sky
        distance={450000}
        sunPosition={[80, 60, 50]}
        inclination={0.5}
        azimuth={0.25}
        turbidity={4}
        rayleigh={0.2}
        mieCoefficient={0.002}
        mieDirectionalG={0.8}
      />

      {/* 하늘색 배경 (Sky 보완) */}
      <color attach="background" args={[environmentColors.skyTop]} />

      {/* === 조명 - 밝고 따뜻한 햇살 === */}

      {/* 환경광 - 밝고 따뜻하게 */}
      <ambientLight
        intensity={LIGHTS.AMBIENT_INTENSITY}
        color={LIGHTS.AMBIENT_COLOR}
      />

      {/* 주광 - 태양 */}
      <directionalLight
        position={[30, 40, 20]}
        intensity={LIGHTS.DIRECTIONAL_INTENSITY}
        color={LIGHTS.DIRECTIONAL_COLOR}
        castShadow
        shadow-mapSize={[LIGHTS.SHADOW_MAP_SIZE, LIGHTS.SHADOW_MAP_SIZE]}
        shadow-camera-far={LIGHTS.SHADOW_CAMERA_FAR}
        shadow-camera-left={-LIGHTS.SHADOW_CAMERA_BOUNDS}
        shadow-camera-right={LIGHTS.SHADOW_CAMERA_BOUNDS}
        shadow-camera-top={LIGHTS.SHADOW_CAMERA_BOUNDS}
        shadow-camera-bottom={-LIGHTS.SHADOW_CAMERA_BOUNDS}
      />

      {/* 림 라이트 - 윤곽 강조 */}
      <directionalLight
        position={[-25, 15, -25]}
        intensity={0.3}
        color="#FFE4B5"
      />

      {/* 반구광 - 하늘/땅 반사 */}
      <hemisphereLight
        skyColor={LIGHTS.HEMISPHERE_SKY}
        groundColor={LIGHTS.HEMISPHERE_GROUND}
        intensity={LIGHTS.HEMISPHERE_INTENSITY}
      />

      {/* 포인트 라이트 - 중앙 따뜻한 빛 */}
      <pointLight
        position={[0, 10, 0]}
        intensity={0.2}
        color="#FFD93D"
        distance={40}
      />

      {/* 옅은 안개 (하늘색) */}
      <fog attach="fog" args={[environmentColors.fog, WORLD.FOG_NEAR, WORLD.FOG_FAR]} />

      {/* 클릭 감지 평면 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onClick={handleClick}
      >
        <planeGeometry args={[WORLD.GROUND_SIZE, WORLD.GROUND_SIZE]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* 물리 월드 */}
      <Physics gravity={[0, PLAYER.GRAVITY, 0]}>
        <Player ref={playerRef} targetPosition={targetPosition} />
        <World setCurrentRoom={setCurrentRoom} />
      </Physics>

      {/* 클릭 인디케이터 */}
      {targetPosition && <ClickIndicator position={targetPosition} />}
    </>
  )
}
