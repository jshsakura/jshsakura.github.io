import { forwardRef, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

import { PLAYER } from '../../constants/config'
import { theme, characterColors } from '../../constants/colors'
import { resumeData } from '../../data/resume'

/**
 * 귀여운 로우폴리 늑대 캐릭터 (Wolf Link 스타일)
 */
const Player = forwardRef(function Player({ targetPosition }, ref) {
  const rigidBody = useRef()
  const characterRef = useRef()
  const tailRef = useRef()
  const headRef = useRef()
  const [isMoving, setIsMoving] = useState(false)

  const animRef = useRef({
    bounce: 0,
    rotation: 0,
    tailWag: 0,
    headBob: 0,
  })

  useFrame((state, delta) => {
    if (!rigidBody.current) return
    if (!targetPosition) return

    const currentPos = rigidBody.current.translation()
    const target = new THREE.Vector3(targetPosition[0], currentPos.y, targetPosition[2])
    const current = new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z)

    const distance = current.distanceTo(target)
    const velocity = rigidBody.current.linvel()
    const anim = animRef.current

    if (distance > PLAYER.STOP_DISTANCE) {
      const dir = target.clone().sub(current).normalize()

      rigidBody.current.setLinvel({
        x: dir.x * PLAYER.MOVE_SPEED,
        y: velocity.y,
        z: dir.z * PLAYER.MOVE_SPEED,
      })

      anim.rotation = Math.atan2(dir.x, dir.z)
      anim.bounce += delta * 12
      anim.tailWag += delta * 15
      anim.headBob += delta * 8

      if (!isMoving) setIsMoving(true)
    } else {
      rigidBody.current.setLinvel({ x: 0, y: velocity.y, z: 0 })
      anim.tailWag += delta * 5 // 가만히 있을 때도 살랑살랑
      if (isMoving) setIsMoving(false)
    }

    // 캐릭터 회전
    if (characterRef.current) {
      characterRef.current.rotation.y = anim.rotation
    }

    // 꼬리 흔들기
    if (tailRef.current) {
      const wagAmount = isMoving ? 0.6 : 0.3
      tailRef.current.rotation.z = Math.sin(anim.tailWag) * wagAmount
      tailRef.current.rotation.x = Math.sin(anim.tailWag * 0.5) * 0.2
    }

    // 머리 움직임
    if (headRef.current && isMoving) {
      headRef.current.rotation.x = Math.sin(anim.headBob) * 0.05
    }
  })

  const anim = animRef.current
  const bounceY = isMoving ? Math.abs(Math.sin(anim.bounce)) * 0.06 : 0
  const legAnim = isMoving ? Math.sin(anim.bounce * 2) * 0.4 : 0

  const { furMain, furLight, furDark, furBelly, eyes, eyesPupil, eyesHighlight, nose, earInner } = characterColors

  return (
    <RigidBody
      ref={(node) => {
        rigidBody.current = node
        if (ref) ref.current = node
      }}
      position={PLAYER.INITIAL_POSITION}
      enabledRotations={[false, false, false]}
      linearDamping={PLAYER.LINEAR_DAMPING}
      mass={PLAYER.MASS}
      type="dynamic"
      colliders={false}
    >
      <CapsuleCollider args={[0.25, 0.35]} position={[0, 0.6, 0]} />

      <group ref={characterRef} position={[0, bounceY, 0]}>
        {/* 그림자 */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ellipseGeometry args={[0.5, 0.35, 32]} />
          <meshBasicMaterial color="#000" transparent opacity={0.3} />
        </mesh>

        {/* === 몸통 === */}
        <group position={[0, 0.5, 0]}>
          {/* 메인 몸통 */}
          <mesh castShadow>
            <capsuleGeometry args={[0.28, 0.4, 8, 16]} />
            <meshStandardMaterial color={furMain} flatShading />
          </mesh>
          {/* 배 부분 */}
          <mesh position={[0, -0.05, 0.15]} castShadow>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshStandardMaterial color={furBelly} flatShading />
          </mesh>
        </group>

        {/* === 머리 === */}
        <group ref={headRef} position={[0, 0.85, 0.35]}>
          {/* 머리 메인 */}
          <mesh castShadow>
            <sphereGeometry args={[0.28, 12, 12]} />
            <meshStandardMaterial color={furMain} flatShading />
          </mesh>

          {/* 주둥이 */}
          <mesh position={[0, -0.05, 0.22]} rotation={[0.3, 0, 0]} castShadow>
            <coneGeometry args={[0.12, 0.25, 8]} />
            <meshStandardMaterial color={furLight} flatShading />
          </mesh>

          {/* 코 */}
          <mesh position={[0, -0.02, 0.38]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={nose} />
          </mesh>

          {/* 눈 - 왼쪽 */}
          <group position={[-0.12, 0.05, 0.2]}>
            <mesh>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshBasicMaterial color={eyes} />
            </mesh>
            <mesh position={[0.01, 0, 0.04]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color={eyesPupil} />
            </mesh>
            <mesh position={[0.02, 0.02, 0.06]}>
              <sphereGeometry args={[0.015, 6, 6]} />
              <meshBasicMaterial color={eyesHighlight} />
            </mesh>
          </group>

          {/* 눈 - 오른쪽 */}
          <group position={[0.12, 0.05, 0.2]}>
            <mesh>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshBasicMaterial color={eyes} />
            </mesh>
            <mesh position={[-0.01, 0, 0.04]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color={eyesPupil} />
            </mesh>
            <mesh position={[-0.02, 0.02, 0.06]}>
              <sphereGeometry args={[0.015, 6, 6]} />
              <meshBasicMaterial color={eyesHighlight} />
            </mesh>
          </group>

          {/* 귀 - 왼쪽 */}
          <group position={[-0.18, 0.22, -0.05]} rotation={[0, 0, -0.3]}>
            <mesh castShadow>
              <coneGeometry args={[0.08, 0.2, 4]} />
              <meshStandardMaterial color={furDark} flatShading />
            </mesh>
            <mesh position={[0, -0.02, 0.02]}>
              <coneGeometry args={[0.05, 0.12, 4]} />
              <meshStandardMaterial color={earInner} flatShading />
            </mesh>
          </group>

          {/* 귀 - 오른쪽 */}
          <group position={[0.18, 0.22, -0.05]} rotation={[0, 0, 0.3]}>
            <mesh castShadow>
              <coneGeometry args={[0.08, 0.2, 4]} />
              <meshStandardMaterial color={furDark} flatShading />
            </mesh>
            <mesh position={[0, -0.02, 0.02]}>
              <coneGeometry args={[0.05, 0.12, 4]} />
              <meshStandardMaterial color={earInner} flatShading />
            </mesh>
          </group>

          {/* 이마 무늬 (Wolf Link 스타일) */}
          <mesh position={[0, 0.15, 0.22]} rotation={[0.5, 0, 0]}>
            <planeGeometry args={[0.08, 0.12]} />
            <meshBasicMaterial color={theme.accent} side={2} />
          </mesh>
        </group>

        {/* === 다리 === */}
        {/* 앞다리 왼쪽 */}
        <group position={[-0.15, 0.25, 0.2]} rotation={[legAnim, 0, 0]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.06, 0.2, 6, 8]} />
            <meshStandardMaterial color={furMain} flatShading />
          </mesh>
          <mesh position={[0, -0.15, 0.02]} castShadow>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={furDark} flatShading />
          </mesh>
        </group>

        {/* 앞다리 오른쪽 */}
        <group position={[0.15, 0.25, 0.2]} rotation={[-legAnim, 0, 0]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.06, 0.2, 6, 8]} />
            <meshStandardMaterial color={furMain} flatShading />
          </mesh>
          <mesh position={[0, -0.15, 0.02]} castShadow>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={furDark} flatShading />
          </mesh>
        </group>

        {/* 뒷다리 왼쪽 */}
        <group position={[-0.15, 0.25, -0.2]} rotation={[-legAnim, 0, 0]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.07, 0.2, 6, 8]} />
            <meshStandardMaterial color={furMain} flatShading />
          </mesh>
          <mesh position={[0, -0.15, 0.02]} castShadow>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={furDark} flatShading />
          </mesh>
        </group>

        {/* 뒷다리 오른쪽 */}
        <group position={[0.15, 0.25, -0.2]} rotation={[legAnim, 0, 0]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.07, 0.2, 6, 8]} />
            <meshStandardMaterial color={furMain} flatShading />
          </mesh>
          <mesh position={[0, -0.15, 0.02]} castShadow>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={furDark} flatShading />
          </mesh>
        </group>

        {/* === 꼬리 === */}
        <group ref={tailRef} position={[0, 0.55, -0.35]} rotation={[-0.5, 0, 0]}>
          <mesh castShadow>
            <coneGeometry args={[0.08, 0.35, 6]} />
            <meshStandardMaterial color={furMain} flatShading />
          </mesh>
          {/* 꼬리 끝 (흰색) */}
          <mesh position={[0, 0.18, 0]} castShadow>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={furBelly} flatShading />
          </mesh>
        </group>

        {/* 이름표 */}
        <Text
          position={[0, 1.4, 0]}
          fontSize={0.18}
          color={theme.accent}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.025}
          outlineColor={theme.gray900}
        >
          {resumeData.personal.name}
        </Text>
      </group>
    </RigidBody>
  )
})

export default Player
