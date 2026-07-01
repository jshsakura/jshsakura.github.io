import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { environmentColors } from '../../constants/colors'

/**
 * 젤다 스타일 뭉게구름
 * - 부드러운 구형 조합
 */
export default function Cloud({ position = [0, 10, 0] }) {
  const cloudRef = useRef()
  const initialX = position[0]

  useFrame((state) => {
    if (cloudRef.current) {
      // 천천히 떠다니는 효과
      cloudRef.current.position.x = initialX + Math.sin(state.clock.elapsedTime * 0.08 + position[2]) * 1.5
      cloudRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.15) * 0.2
    }
  })

  return (
    <group ref={cloudRef} position={position}>
      {/* 메인 구름 */}
      <mesh>
        <sphereGeometry args={[1.0, 8, 6]} />
        <meshStandardMaterial
          color={environmentColors.cloudWhite}
          transparent
          opacity={0.9}
          flatShading
        />
      </mesh>

      {/* 오른쪽 */}
      <mesh position={[0.8, -0.1, 0]}>
        <sphereGeometry args={[0.7, 7, 5]} />
        <meshStandardMaterial
          color={environmentColors.cloudWhite}
          transparent
          opacity={0.9}
          flatShading
        />
      </mesh>

      {/* 왼쪽 */}
      <mesh position={[-0.7, 0, 0.1]}>
        <sphereGeometry args={[0.6, 7, 5]} />
        <meshStandardMaterial
          color={environmentColors.cloudShadow}
          transparent
          opacity={0.85}
          flatShading
        />
      </mesh>

      {/* 상단 */}
      <mesh position={[0.2, 0.4, -0.1]}>
        <sphereGeometry args={[0.5, 6, 5]} />
        <meshStandardMaterial
          color={environmentColors.cloudWhite}
          transparent
          opacity={0.9}
          flatShading
        />
      </mesh>
    </group>
  )
}
