import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { theme } from '../../constants/colors'

/**
 * 숲 테마 클릭 인디케이터 (발자국 느낌)
 */
export default function ClickIndicator({ position }) {
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const animRef = useRef({ scale1: 0.3, scale2: 0.5, opacity1: 1, opacity2: 0.7 })

  useFrame((state, delta) => {
    const anim = animRef.current

    anim.scale1 += delta * 2.5
    anim.opacity1 -= delta * 1.5

    anim.scale2 += delta * 2
    anim.opacity2 -= delta * 1.2

    if (anim.opacity1 <= 0) {
      anim.scale1 = 0.3
      anim.opacity1 = 1
    }
    if (anim.opacity2 <= 0) {
      anim.scale2 = 0.5
      anim.opacity2 = 0.7
    }

    if (ring1Ref.current) {
      ring1Ref.current.scale.setScalar(anim.scale1)
      ring1Ref.current.material.opacity = Math.max(0, anim.opacity1)
    }
    if (ring2Ref.current) {
      ring2Ref.current.scale.setScalar(anim.scale2)
      ring2Ref.current.material.opacity = Math.max(0, anim.opacity2 * 0.5)
    }
  })

  return (
    <group position={[position[0], 0.05, position[2]]}>
      {/* 메인 링 - 녹색 */}
      <mesh ref={ring1Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.4, 32]} />
        <meshBasicMaterial color={theme.primary} transparent opacity={1} />
      </mesh>

      {/* 글로우 링 - 황금색 */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.6, 32]} />
        <meshBasicMaterial color={theme.accent} transparent opacity={0.4} />
      </mesh>

      {/* 중심 - 발자국 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.08, 8]} />
        <meshBasicMaterial color={theme.accent} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}
