import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { PLAYER } from '../constants/config'

/**
 * 플레이어 이동 로직을 관리하는 훅
 * @param {Object} rigidBodyRef - Rapier RigidBody ref
 * @param {Array|null} targetPosition - 목표 위치 [x, y, z]
 * @returns {Object} - 이동 상태 및 애니메이션 값
 */
export default function usePlayerMovement(rigidBodyRef, targetPosition) {
  const [isMoving, setIsMoving] = useState(false)
  const bounceRef = useRef(0)
  const rotationRef = useRef(0)
  const hairSwingRef = useRef(0)

  useFrame((state, delta) => {
    if (!rigidBodyRef.current || !targetPosition) return

    const currentPos = rigidBodyRef.current.translation()
    const target = new THREE.Vector3(targetPosition[0], currentPos.y, targetPosition[2])
    const current = new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z)

    const distance = current.distanceTo(target)
    const velocity = rigidBodyRef.current.linvel()

    if (distance > PLAYER.STOP_DISTANCE) {
      const dir = target.clone().sub(current).normalize()

      rigidBodyRef.current.setLinvel({
        x: dir.x * PLAYER.MOVE_SPEED,
        y: velocity.y,
        z: dir.z * PLAYER.MOVE_SPEED,
      })

      // 캐릭터가 이동 방향을 바라보도록 회전
      rotationRef.current = Math.atan2(dir.x, dir.z)

      setIsMoving(true)
      bounceRef.current += delta * PLAYER.BOUNCE_SPEED
    } else {
      rigidBodyRef.current.setLinvel({ x: 0, y: velocity.y, z: 0 })
      setIsMoving(false)
    }

    // 머리카락 애니메이션
    if (isMoving) {
      hairSwingRef.current += delta * PLAYER.HAIR_SWING_SPEED
    } else {
      hairSwingRef.current *= PLAYER.HAIR_DECAY
    }
  })

  // 애니메이션 값 계산
  const bounceOffset = isMoving ? Math.abs(Math.sin(bounceRef.current)) * 0.1 : 0
  const legSwing = isMoving ? Math.sin(bounceRef.current * PLAYER.LEG_SWING_SPEED) * PLAYER.LEG_SWING_AMOUNT : 0
  const armSwing = isMoving ? Math.sin(bounceRef.current * PLAYER.ARM_SWING_SPEED) * PLAYER.ARM_SWING_AMOUNT : 0
  const hairSwing = Math.sin(hairSwingRef.current) * PLAYER.HAIR_SWING_AMOUNT
  const hairFrontSwing = Math.sin(hairSwingRef.current + 0.5) * PLAYER.HAIR_FRONT_SWING_AMOUNT

  return {
    isMoving,
    rotation: rotationRef.current,
    bounceOffset,
    legSwing,
    armSwing,
    hairSwing,
    hairFrontSwing,
  }
}
