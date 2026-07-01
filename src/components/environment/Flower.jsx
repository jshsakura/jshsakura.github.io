import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { environmentColors } from '../../constants/colors'

/**
 * 젤다 스타일 꽃
 * - 단순하고 귀여운 형태
 * - 5장 꽃잎
 */
export default function Flower({ position = [0, 0, 0], color = environmentColors.flowerPink }) {
  const flowerRef = useRef()

  useFrame((state) => {
    if (flowerRef.current) {
      // 살랑살랑 흔들림 (부드럽게)
      flowerRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5 + position[0] * 10) * 0.08
    }
  })

  return (
    <group ref={flowerRef} position={position}>
      {/* 줄기 */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.018, 0.028, 0.36, 5]} />
        <meshStandardMaterial color={environmentColors.flowerStem} />
      </mesh>

      {/* 잎 */}
      <mesh position={[0.06, 0.12, 0]} rotation={[0, 0, 0.5]} scale={[1, 0.6, 0.3]}>
        <sphereGeometry args={[0.05, 5, 4]} />
        <meshStandardMaterial color={environmentColors.grassLight} flatShading />
      </mesh>

      {/* 꽃잎들 (5장) */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2
        const x = Math.cos(angle) * 0.07
        const z = Math.sin(angle) * 0.07
        return (
          <mesh
            key={i}
            position={[x, 0.38, z]}
            castShadow
          >
            <sphereGeometry args={[0.055, 5, 4]} />
            <meshStandardMaterial color={color} flatShading />
          </mesh>
        )
      })}

      {/* 꽃 중심 */}
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.045, 6, 6]} />
        <meshStandardMaterial color={environmentColors.flowerCenter} />
      </mesh>
    </group>
  )
}
