import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Avatar({ mousePosition }) {
  const groupRef = useRef()
  const headRef = useRef()
  const bodyRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()

  const time = useRef(0)

  // Colors
  const colors = useMemo(() => ({
    skin: '#fdbcb4',
    hair: '#2d1b14',
    shirt: '#6366f1',
    pants: '#1e1e2e',
    shoes: '#1a1a2e',
  }), [])

  useFrame((state, delta) => {
    time.current += delta

    // Floating animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time.current * 0.5) * 0.1
    }

    // Head follows mouse
    if (headRef.current && mousePosition) {
      const targetRotationY = (mousePosition.x - 0.5) * 0.5
      const targetRotationX = (mousePosition.y - 0.5) * 0.3

      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        0.05
      )
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -targetRotationX,
        0.05
      )
    }

    // Arm waving animation
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(time.current * 2) * 0.2 - 0.3
      rightArmRef.current.rotation.x = Math.sin(time.current * 2) * 0.1
    }

    // Subtle body sway
    if (bodyRef.current) {
      bodyRef.current.rotation.z = Math.sin(time.current * 0.3) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={1.2}>
      {/* Body */}
      <group ref={bodyRef}>
        {/* Torso */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 1, 0.4]} />
          <meshStandardMaterial color={colors.shirt} />
        </mesh>

        {/* Shirt collar detail */}
        <mesh position={[0, 0.45, 0.15]}>
          <boxGeometry args={[0.3, 0.15, 0.15]} />
          <meshStandardMaterial color={colors.skin} />
        </mesh>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.55, 0.2, 0]}>
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[0.2, 0.6, 0.2]} />
            <meshStandardMaterial color={colors.shirt} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.7, 0]}>
            <boxGeometry args={[0.18, 0.2, 0.18]} />
            <meshStandardMaterial color={colors.skin} />
          </mesh>
        </group>

        {/* Right Arm (waving) */}
        <group ref={rightArmRef} position={[0.55, 0.2, 0]} rotation={[0, 0, -0.3]}>
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[0.2, 0.6, 0.2]} />
            <meshStandardMaterial color={colors.shirt} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.7, 0]}>
            <boxGeometry args={[0.18, 0.2, 0.18]} />
            <meshStandardMaterial color={colors.skin} />
          </mesh>
        </group>

        {/* Legs */}
        {/* Left Leg */}
        <mesh position={[-0.2, -0.8, 0]}>
          <boxGeometry args={[0.25, 0.6, 0.3]} />
          <meshStandardMaterial color={colors.pants} />
        </mesh>
        {/* Left Shoe */}
        <mesh position={[-0.2, -1.2, 0.05]}>
          <boxGeometry args={[0.25, 0.2, 0.4]} />
          <meshStandardMaterial color={colors.shoes} />
        </mesh>

        {/* Right Leg */}
        <mesh position={[0.2, -0.8, 0]}>
          <boxGeometry args={[0.25, 0.6, 0.3]} />
          <meshStandardMaterial color={colors.pants} />
        </mesh>
        {/* Right Shoe */}
        <mesh position={[0.2, -1.2, 0.05]}>
          <boxGeometry args={[0.25, 0.2, 0.4]} />
          <meshStandardMaterial color={colors.shoes} />
        </mesh>
      </group>

      {/* Head */}
      <group ref={headRef} position={[0, 0.85, 0]}>
        {/* Head base */}
        <mesh>
          <boxGeometry args={[0.5, 0.55, 0.45]} />
          <meshStandardMaterial color={colors.skin} />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.55, 0.25, 0.5]} />
          <meshStandardMaterial color={colors.hair} />
        </mesh>
        {/* Hair sides */}
        <mesh position={[-0.25, 0.05, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.45]} />
          <meshStandardMaterial color={colors.hair} />
        </mesh>
        <mesh position={[0.25, 0.05, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.45]} />
          <meshStandardMaterial color={colors.hair} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.12, 0, 0.23]}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[0.12, 0, 0.23]}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>

        {/* Eye whites */}
        <mesh position={[-0.12, 0, 0.22]}>
          <boxGeometry args={[0.12, 0.1, 0.02]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
        <mesh position={[0.12, 0, 0.22]}>
          <boxGeometry args={[0.12, 0.1, 0.02]} />
          <meshStandardMaterial color="#fff" />
        </mesh>

        {/* Eyebrows */}
        <mesh position={[-0.12, 0.12, 0.23]}>
          <boxGeometry args={[0.14, 0.03, 0.02]} />
          <meshStandardMaterial color={colors.hair} />
        </mesh>
        <mesh position={[0.12, 0.12, 0.23]}>
          <boxGeometry args={[0.14, 0.03, 0.02]} />
          <meshStandardMaterial color={colors.hair} />
        </mesh>

        {/* Nose */}
        <mesh position={[0, -0.05, 0.25]}>
          <boxGeometry args={[0.06, 0.08, 0.06]} />
          <meshStandardMaterial color={colors.skin} />
        </mesh>

        {/* Mouth (smile) */}
        <mesh position={[0, -0.15, 0.23]}>
          <boxGeometry args={[0.15, 0.04, 0.02]} />
          <meshStandardMaterial color="#d4726a" />
        </mesh>

        {/* Glasses */}
        <mesh position={[0, 0, 0.24]}>
          <boxGeometry args={[0.5, 0.02, 0.02]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[-0.12, 0, 0.25]}>
          <torusGeometry args={[0.09, 0.015, 8, 16]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[0.12, 0, 0.25]}>
          <torusGeometry args={[0.09, 0.015, 8, 16]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      </group>

      {/* Laptop in hand (optional decoration) */}
      <mesh position={[-0.4, -0.3, 0.3]} rotation={[0.3, 0.5, 0]}>
        <boxGeometry args={[0.4, 0.02, 0.3]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      <mesh position={[-0.4, -0.2, 0.15]} rotation={[-0.5, 0.5, 0]}>
        <boxGeometry args={[0.38, 0.25, 0.02]} />
        <meshStandardMaterial color="#1a1a2e" emissive="#6366f1" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}
