import { forwardRef, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import * as THREE from 'three'

const Player = forwardRef(function Player({ targetPosition }, ref) {
  const rigidBody = useRef()
  const [direction, setDirection] = useState(1)
  const [isMoving, setIsMoving] = useState(false)
  const bounceRef = useRef(0)
  const blinkRef = useRef(0)
  const [isBlinking, setIsBlinking] = useState(false)

  // Cute pastel colors
  const skinColor = '#ffe4d4'
  const hairColor = '#5c4033'
  const shirtColor = '#7c9eb8'
  const pantsColor = '#6b7b8a'
  const cheekColor = '#ffb6c1'
  const eyeColor = '#2d2d2d'

  useFrame((state, delta) => {
    if (!rigidBody.current) return

    // Blinking animation
    blinkRef.current += delta
    if (blinkRef.current > 3) {
      setIsBlinking(true)
      if (blinkRef.current > 3.15) {
        setIsBlinking(false)
        blinkRef.current = 0
      }
    }

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

      if (dir.x > 0.1) setDirection(1)
      else if (dir.x < -0.1) setDirection(-1)

      setIsMoving(true)
      bounceRef.current += delta * 12
    } else {
      rigidBody.current.setLinvel({ x: 0, y: velocity.y, z: 0 })
      setIsMoving(false)
    }
  })

  const bounceOffset = isMoving ? Math.abs(Math.sin(bounceRef.current)) * 0.12 : 0
  const squishY = isMoving ? 1 - Math.abs(Math.sin(bounceRef.current)) * 0.08 : 1
  const squishX = isMoving ? 1 + Math.abs(Math.sin(bounceRef.current)) * 0.05 : 1

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

      <group scale={[direction * squishX, squishY, 1]} position={[0, bounceOffset, 0]}>
        <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
          {/* Shadow */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <ellipseGeometry args={[0.35, 0.2, 32]} />
            <meshBasicMaterial color="#000" transparent opacity={0.15} />
          </mesh>

          {/* Body - round and cute */}
          <mesh position={[0, 0.55, 0]}>
            <circleGeometry args={[0.35, 32]} />
            <meshBasicMaterial color={shirtColor} />
          </mesh>

          {/* Body highlight */}
          <mesh position={[-0.1, 0.65, 0.01]}>
            <circleGeometry args={[0.08, 32]} />
            <meshBasicMaterial color="#9bb5c9" transparent opacity={0.6} />
          </mesh>

          {/* Legs - small and stubby */}
          <mesh position={[-0.12, 0.18, 0]}>
            <capsuleGeometry args={[0.08, 0.15, 8, 16]} />
            <meshBasicMaterial color={pantsColor} />
          </mesh>
          <mesh position={[0.12, 0.18, 0]}>
            <capsuleGeometry args={[0.08, 0.15, 8, 16]} />
            <meshBasicMaterial color={pantsColor} />
          </mesh>

          {/* Shoes */}
          <mesh position={[-0.12, 0.05, 0.02]}>
            <circleGeometry args={[0.1, 32]} />
            <meshBasicMaterial color="#4a4a4a" />
          </mesh>
          <mesh position={[0.12, 0.05, 0.02]}>
            <circleGeometry args={[0.1, 32]} />
            <meshBasicMaterial color="#4a4a4a" />
          </mesh>

          {/* Head - big and round (SD style) */}
          <mesh position={[0, 1.1, 0]}>
            <circleGeometry args={[0.45, 32]} />
            <meshBasicMaterial color={skinColor} />
          </mesh>

          {/* Hair back */}
          <mesh position={[0, 1.3, -0.02]}>
            <circleGeometry args={[0.42, 32]} />
            <meshBasicMaterial color={hairColor} />
          </mesh>

          {/* Hair bangs */}
          <mesh position={[0, 1.4, 0.01]}>
            <circleGeometry args={[0.35, 32, 0, Math.PI]} />
            <meshBasicMaterial color={hairColor} />
          </mesh>

          {/* Hair side left */}
          <mesh position={[-0.35, 1.15, 0.01]}>
            <ellipseGeometry args={[0.12, 0.25, 32]} />
            <meshBasicMaterial color={hairColor} />
          </mesh>

          {/* Hair side right */}
          <mesh position={[0.35, 1.15, 0.01]}>
            <ellipseGeometry args={[0.12, 0.25, 32]} />
            <meshBasicMaterial color={hairColor} />
          </mesh>

          {/* Face area (lighter) */}
          <mesh position={[0, 1.0, 0.01]}>
            <circleGeometry args={[0.38, 32]} />
            <meshBasicMaterial color={skinColor} />
          </mesh>

          {/* Eyes - big and sparkly */}
          {!isBlinking ? (
            <>
              {/* Left eye white */}
              <mesh position={[-0.15, 1.05, 0.02]}>
                <circleGeometry args={[0.12, 32]} />
                <meshBasicMaterial color="#fff" />
              </mesh>
              {/* Left eye pupil */}
              <mesh position={[-0.15, 1.03, 0.03]}>
                <circleGeometry args={[0.08, 32]} />
                <meshBasicMaterial color={eyeColor} />
              </mesh>
              {/* Left eye sparkle */}
              <mesh position={[-0.12, 1.07, 0.04]}>
                <circleGeometry args={[0.03, 16]} />
                <meshBasicMaterial color="#fff" />
              </mesh>
              <mesh position={[-0.18, 1.02, 0.04]}>
                <circleGeometry args={[0.015, 16]} />
                <meshBasicMaterial color="#fff" />
              </mesh>

              {/* Right eye white */}
              <mesh position={[0.15, 1.05, 0.02]}>
                <circleGeometry args={[0.12, 32]} />
                <meshBasicMaterial color="#fff" />
              </mesh>
              {/* Right eye pupil */}
              <mesh position={[0.15, 1.03, 0.03]}>
                <circleGeometry args={[0.08, 32]} />
                <meshBasicMaterial color={eyeColor} />
              </mesh>
              {/* Right eye sparkle */}
              <mesh position={[0.18, 1.07, 0.04]}>
                <circleGeometry args={[0.03, 16]} />
                <meshBasicMaterial color="#fff" />
              </mesh>
              <mesh position={[0.12, 1.02, 0.04]}>
                <circleGeometry args={[0.015, 16]} />
                <meshBasicMaterial color="#fff" />
              </mesh>
            </>
          ) : (
            <>
              {/* Closed eyes - happy lines */}
              <mesh position={[-0.15, 1.05, 0.02]}>
                <planeGeometry args={[0.15, 0.03]} />
                <meshBasicMaterial color={eyeColor} />
              </mesh>
              <mesh position={[0.15, 1.05, 0.02]}>
                <planeGeometry args={[0.15, 0.03]} />
                <meshBasicMaterial color={eyeColor} />
              </mesh>
            </>
          )}

          {/* Cheeks - blush */}
          <mesh position={[-0.28, 0.95, 0.02]}>
            <circleGeometry args={[0.08, 32]} />
            <meshBasicMaterial color={cheekColor} transparent opacity={0.5} />
          </mesh>
          <mesh position={[0.28, 0.95, 0.02]}>
            <circleGeometry args={[0.08, 32]} />
            <meshBasicMaterial color={cheekColor} transparent opacity={0.5} />
          </mesh>

          {/* Mouth - small and cute */}
          <mesh position={[0, 0.88, 0.02]}>
            <circleGeometry args={[0.04, 32, 0, Math.PI]} />
            <meshBasicMaterial color="#e57373" />
          </mesh>

          {/* Arms - small and round */}
          <mesh
            position={[-0.4, 0.6, 0]}
            rotation={[0, 0, isMoving ? Math.sin(bounceRef.current * 2) * 0.4 : 0.2]}
          >
            <capsuleGeometry args={[0.07, 0.15, 8, 16]} />
            <meshBasicMaterial color={skinColor} />
          </mesh>
          <mesh
            position={[0.4, 0.6, 0]}
            rotation={[0, 0, isMoving ? -Math.sin(bounceRef.current * 2) * 0.4 : -0.2]}
          >
            <capsuleGeometry args={[0.07, 0.15, 8, 16]} />
            <meshBasicMaterial color={skinColor} />
          </mesh>

          {/* Name tag with bubble */}
          <mesh position={[0, 1.75, -0.01]}>
            <planeGeometry args={[1.2, 0.35]} />
            <meshBasicMaterial color="#fff" transparent opacity={0.9} />
          </mesh>
          <Text
            position={[0, 1.75, 0]}
            fontSize={0.2}
            color="#5c6bc0"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            Seunghyeon
          </Text>
        </Billboard>
      </group>
    </RigidBody>
  )
})

export default Player
