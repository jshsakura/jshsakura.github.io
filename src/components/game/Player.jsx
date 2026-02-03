import { forwardRef, useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls, Billboard, Text } from '@react-three/drei'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import * as THREE from 'three'

const Player = forwardRef(function Player(props, ref) {
  const rigidBody = useRef()
  const [direction, setDirection] = useState(1) // 1 = right, -1 = left
  const [isMoving, setIsMoving] = useState(false)
  const bounceRef = useRef(0)

  const [, getKeys] = useKeyboardControls()

  // Character colors
  const skinColor = '#ffd8b1'
  const hairColor = '#4a3728'
  const shirtColor = '#6366f1'
  const pantsColor = '#374151'

  useFrame((state, delta) => {
    if (!rigidBody.current) return

    const { forward, backward, left, right, run } = getKeys()
    const velocity = rigidBody.current.linvel()

    // Movement speed
    const speed = run ? 8 : 5

    // Calculate movement direction (isometric adjustment)
    let moveX = 0
    let moveZ = 0

    if (forward) moveZ -= 1
    if (backward) moveZ += 1
    if (left) moveX -= 1
    if (right) moveX += 1

    // Normalize diagonal movement
    if (moveX !== 0 && moveZ !== 0) {
      moveX *= 0.707
      moveZ *= 0.707
    }

    // Apply velocity
    rigidBody.current.setLinvel({
      x: moveX * speed,
      y: velocity.y,
      z: moveZ * speed,
    })

    // Update direction for sprite flip
    if (moveX > 0) setDirection(1)
    else if (moveX < 0) setDirection(-1)

    // Update moving state for animation
    const moving = moveX !== 0 || moveZ !== 0
    setIsMoving(moving)

    // Bounce animation
    if (moving) {
      bounceRef.current += delta * (run ? 15 : 10)
    }
  })

  // Bounce offset for walking animation
  const bounceOffset = isMoving ? Math.abs(Math.sin(bounceRef.current)) * 0.15 : 0

  return (
    <RigidBody
      ref={(node) => {
        rigidBody.current = node
        if (ref) ref.current = node
      }}
      position={[0, 2, 0]}
      enabledRotations={[false, false, false]}
      linearDamping={4}
      mass={1}
      type="dynamic"
      colliders={false}
    >
      <CapsuleCollider args={[0.3, 0.3]} position={[0, 0.6, 0]} />

      <group scale={[direction, 1, 1]} position={[0, bounceOffset, 0]}>
        <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
          {/* Shadow under character */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <circleGeometry args={[0.4, 32]} />
            <meshBasicMaterial color="#000" transparent opacity={0.2} />
          </mesh>

          {/* Body */}
          <mesh position={[0, 0.7, 0]}>
            <planeGeometry args={[0.8, 0.6]} />
            <meshBasicMaterial color={shirtColor} side={THREE.DoubleSide} />
          </mesh>

          {/* Head */}
          <mesh position={[0, 1.15, 0]}>
            <circleGeometry args={[0.3, 32]} />
            <meshBasicMaterial color={skinColor} side={THREE.DoubleSide} />
          </mesh>

          {/* Hair */}
          <mesh position={[0, 1.35, -0.01]}>
            <planeGeometry args={[0.5, 0.3]} />
            <meshBasicMaterial color={hairColor} side={THREE.DoubleSide} />
          </mesh>

          {/* Eyes */}
          <mesh position={[-0.1, 1.15, 0.01]}>
            <circleGeometry args={[0.05, 16]} />
            <meshBasicMaterial color="#000" />
          </mesh>
          <mesh position={[0.1, 1.15, 0.01]}>
            <circleGeometry args={[0.05, 16]} />
            <meshBasicMaterial color="#000" />
          </mesh>

          {/* Smile */}
          <mesh position={[0, 1.0, 0.01]}>
            <planeGeometry args={[0.15, 0.05]} />
            <meshBasicMaterial color="#000" />
          </mesh>

          {/* Legs */}
          <mesh position={[-0.15, 0.25, 0]}>
            <planeGeometry args={[0.2, 0.5]} />
            <meshBasicMaterial color={pantsColor} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.15, 0.25, 0]}>
            <planeGeometry args={[0.2, 0.5]} />
            <meshBasicMaterial color={pantsColor} side={THREE.DoubleSide} />
          </mesh>

          {/* Arms */}
          <mesh position={[-0.45, 0.7, 0]} rotation={[0, 0, isMoving ? Math.sin(bounceRef.current * 2) * 0.3 : 0]}>
            <planeGeometry args={[0.15, 0.4]} />
            <meshBasicMaterial color={skinColor} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.45, 0.7, 0]} rotation={[0, 0, isMoving ? -Math.sin(bounceRef.current * 2) * 0.3 : 0]}>
            <planeGeometry args={[0.15, 0.4]} />
            <meshBasicMaterial color={skinColor} side={THREE.DoubleSide} />
          </mesh>

          {/* Name tag */}
          <Text
            position={[0, 1.7, 0]}
            fontSize={0.25}
            color="#374151"
            anchorX="center"
            anchorY="middle"
          >
            Seunghyeon
          </Text>
        </Billboard>
      </group>
    </RigidBody>
  )
})

export default Player
