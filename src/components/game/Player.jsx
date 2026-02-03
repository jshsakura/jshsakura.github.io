import { forwardRef, useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import * as THREE from 'three'

const Player = forwardRef(function Player({ targetPosition }, ref) {
  const rigidBody = useRef()
  const [direction, setDirection] = useState(1)
  const [isMoving, setIsMoving] = useState(false)
  const bounceRef = useRef(0)

  const skinColor = '#ffd8b1'
  const hairColor = '#4a3728'
  const shirtColor = '#6366f1'
  const pantsColor = '#374151'

  useFrame((state, delta) => {
    if (!rigidBody.current || !targetPosition) return

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
      bounceRef.current += delta * 10
    } else {
      rigidBody.current.setLinvel({ x: 0, y: velocity.y, z: 0 })
      setIsMoving(false)
    }
  })

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
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <circleGeometry args={[0.4, 32]} />
            <meshBasicMaterial color="#000" transparent opacity={0.2} />
          </mesh>

          <mesh position={[0, 0.7, 0]}>
            <planeGeometry args={[0.8, 0.6]} />
            <meshBasicMaterial color={shirtColor} side={THREE.DoubleSide} />
          </mesh>

          <mesh position={[0, 1.15, 0]}>
            <circleGeometry args={[0.3, 32]} />
            <meshBasicMaterial color={skinColor} side={THREE.DoubleSide} />
          </mesh>

          <mesh position={[0, 1.35, -0.01]}>
            <planeGeometry args={[0.5, 0.3]} />
            <meshBasicMaterial color={hairColor} side={THREE.DoubleSide} />
          </mesh>

          <mesh position={[-0.1, 1.15, 0.01]}>
            <circleGeometry args={[0.05, 16]} />
            <meshBasicMaterial color="#000" />
          </mesh>
          <mesh position={[0.1, 1.15, 0.01]}>
            <circleGeometry args={[0.05, 16]} />
            <meshBasicMaterial color="#000" />
          </mesh>

          <mesh position={[0, 1.0, 0.01]}>
            <planeGeometry args={[0.15, 0.05]} />
            <meshBasicMaterial color="#000" />
          </mesh>

          <mesh position={[-0.15, 0.25, 0]}>
            <planeGeometry args={[0.2, 0.5]} />
            <meshBasicMaterial color={pantsColor} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.15, 0.25, 0]}>
            <planeGeometry args={[0.2, 0.5]} />
            <meshBasicMaterial color={pantsColor} side={THREE.DoubleSide} />
          </mesh>

          <mesh position={[-0.45, 0.7, 0]} rotation={[0, 0, isMoving ? Math.sin(bounceRef.current * 2) * 0.3 : 0]}>
            <planeGeometry args={[0.15, 0.4]} />
            <meshBasicMaterial color={skinColor} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.45, 0.7, 0]} rotation={[0, 0, isMoving ? -Math.sin(bounceRef.current * 2) * 0.3 : 0]}>
            <planeGeometry args={[0.15, 0.4]} />
            <meshBasicMaterial color={skinColor} side={THREE.DoubleSide} />
          </mesh>

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
