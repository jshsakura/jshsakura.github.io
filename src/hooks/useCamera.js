import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CAMERA } from '../constants/config'

/**
 * 카메라가 플레이어를 따라가도록 하는 훅
 * @param {Object} playerRef - 플레이어 RigidBody ref
 * @param {Object} camera - Three.js camera
 * @param {Function} onPositionUpdate - 플레이어 위치 업데이트 콜백
 */
export default function useCamera(playerRef, camera, onPositionUpdate) {
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    if (!playerRef.current) return

    const playerPos = playerRef.current.translation()

    // 부드러운 카메라 추적
    cameraTarget.current.lerp(
      new THREE.Vector3(playerPos.x, playerPos.y, playerPos.z),
      CAMERA.LERP_FACTOR
    )

    // 카메라 위치 및 방향 설정
    camera.position.x = cameraTarget.current.x + CAMERA.OFFSET_X
    camera.position.y = CAMERA.OFFSET_Y
    camera.position.z = cameraTarget.current.z + CAMERA.OFFSET_Z
    camera.lookAt(cameraTarget.current)

    // 위치 업데이트 콜백
    if (onPositionUpdate) {
      onPositionUpdate([playerPos.x, playerPos.y, playerPos.z])
    }
  })
}
