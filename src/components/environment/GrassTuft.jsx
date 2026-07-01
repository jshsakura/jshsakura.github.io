import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { environmentColors } from '../../constants/colors'

/**
 * 젤다 스타일 잔디 뭉치
 * - 단순한 삼각 잎
 */
export default function GrassTuft({ position = [0, 0, 0] }) {
  const grassRef = useRef()
  const seed = position[0] * 50 + position[2]

  useFrame((state) => {
    if (grassRef.current) {
      grassRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5 + seed) * 0.08
    }
  })

  return (
    <group ref={grassRef} position={position}>
      {[-0.025, 0, 0.025].map((offset, i) => (
        <mesh
          key={i}
          position={[offset, 0.07, offset * 0.5]}
          rotation={[0.08 * (i - 1), 0, 0.12 * (i - 1)]}
        >
          <coneGeometry args={[0.018, 0.16, 4]} />
          <meshStandardMaterial
            color={i === 1 ? environmentColors.grassLight : environmentColors.grass}
            flatShading
          />
        </mesh>
      ))}
    </group>
  )
}
