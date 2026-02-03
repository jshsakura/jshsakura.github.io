import { forwardRef, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import * as THREE from 'three'

const Player = forwardRef(function Player({ targetPosition }, ref) {
  const rigidBody = useRef()
  const characterRef = useRef()
  const [isMoving, setIsMoving] = useState(false)
  const bounceRef = useRef(0)
  const rotationRef = useRef(0)

  // Catppuccin Latte colors
  const skinColor = '#dce0e8'
  const hairColor = '#4c4f69'
  const shirtColor = '#7287fd'
  const pantsColor = '#5c5f77'
  const shoeColor = '#4c4f69'

  useFrame((state, delta) => {
    if (!rigidBody.current) return

    if (!targetPosition) return

    const currentPos = rigidBody.current.translation()
    const target = new THREE.Vector3(targetPosition[0], currentPos.y, targetPosition[2])
    const current = new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z)

    const distance = current.distanceTo(target)
    const velocity = rigidBody.current.linvel()

    if (distance > 0.5) {
      const dir = target.clone().sub(current).normalize()
      const speed = 5

      rigidBody.current.setLinvel({
        x: dir.x * speed,
        y: velocity.y,
        z: dir.z * speed,
      })

      // Rotate character to face movement direction
      rotationRef.current = Math.atan2(dir.x, dir.z)

      setIsMoving(true)
      bounceRef.current += delta * 10
    } else {
      rigidBody.current.setLinvel({ x: 0, y: velocity.y, z: 0 })
      setIsMoving(false)
    }

    // Apply rotation to character
    if (characterRef.current) {
      characterRef.current.rotation.y = rotationRef.current
    }
  })

  const bounceOffset = isMoving ? Math.abs(Math.sin(bounceRef.current)) * 0.1 : 0
  const legSwing = isMoving ? Math.sin(bounceRef.current * 2) * 0.4 : 0
  const armSwing = isMoving ? Math.sin(bounceRef.current * 2) * 0.3 : 0

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

      <group ref={characterRef} position={[0, bounceOffset, 0]}>
        {/* Shadow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <circleGeometry args={[0.4, 32]} />
          <meshBasicMaterial color="#4c4f69" transparent opacity={0.2} />
        </mesh>

        {/* Body */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <capsuleGeometry args={[0.25, 0.3, 8, 16]} />
          <meshStandardMaterial color={shirtColor} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 1.35, 0]} castShadow>
          <sphereGeometry args={[0.32, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
        {/* Hair front */}
        <mesh position={[0, 1.25, 0.2]} castShadow>
          <boxGeometry args={[0.5, 0.15, 0.1]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.1, 1.22, 0.25]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#4c4f69" />
        </mesh>
        <mesh position={[0.1, 1.22, 0.25]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#4c4f69" />
        </mesh>

        {/* Cheeks */}
        <mesh position={[-0.2, 1.15, 0.22]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#ea76cb" transparent opacity={0.5} />
        </mesh>
        <mesh position={[0.2, 1.15, 0.22]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#ea76cb" transparent opacity={0.5} />
        </mesh>

        {/* Mouth */}
        <mesh position={[0, 1.1, 0.28]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#d20f39" />
        </mesh>

        {/* Left Arm */}
        <group position={[-0.35, 0.7, 0]} rotation={[armSwing, 0, 0]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.08, 0.25, 8, 8]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group position={[0.35, 0.7, 0]} rotation={[-armSwing, 0, 0]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.08, 0.25, 8, 8]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
        </group>

        {/* Left Leg */}
        <group position={[-0.12, 0.25, 0]} rotation={[-legSwing, 0, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <capsuleGeometry args={[0.08, 0.2, 8, 8]} />
            <meshStandardMaterial color={pantsColor} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.18, 0.05]} castShadow>
            <boxGeometry args={[0.12, 0.08, 0.18]} />
            <meshStandardMaterial color={shoeColor} />
          </mesh>
        </group>

        {/* Right Leg */}
        <group position={[0.12, 0.25, 0]} rotation={[legSwing, 0, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <capsuleGeometry args={[0.08, 0.2, 8, 8]} />
            <meshStandardMaterial color={pantsColor} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.18, 0.05]} castShadow>
            <boxGeometry args={[0.12, 0.08, 0.18]} />
            <meshStandardMaterial color={shoeColor} />
          </mesh>
        </group>

        {/* Name tag */}
        <Text
          position={[0, 1.8, 0]}
          fontSize={0.2}
          color="#8839ef"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#eff1f5"
        >
          Seunghyeon
        </Text>
      </group>
    </RigidBody>
  )
})

export default Player
