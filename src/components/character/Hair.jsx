import { forwardRef } from 'react'
import { theme } from '../../constants/colors'

/**
 * 캐릭터 모자 컴포넌트 (비니 스타일)
 * @param {Object} props
 * @param {React.Ref} hatRef - 모자 그룹 ref
 */
const Hat = forwardRef(function Hat(_, ref) {
  return (
    <group ref={ref} position={[0, 1.38, 0]}>
      {/* 비니 메인 */}
      <mesh castShadow>
        <sphereGeometry args={[0.33, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
        <meshStandardMaterial color={theme.primary} />
      </mesh>

      {/* 비니 밴드 (아래쪽) */}
      <mesh position={[0, -0.08, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.34, 0.12, 16]} />
        <meshStandardMaterial color={theme.primaryDark} />
      </mesh>

      {/* 비니 꼭대기 폼폼 */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={theme.white} />
      </mesh>

      {/* 비니 줄무늬 디테일 */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <torusGeometry args={[0.28, 0.02, 8, 32]} />
        <meshStandardMaterial color={theme.primaryLight} />
      </mesh>

      {/* 뒤쪽 머리카락 살짝 보이게 */}
      <mesh position={[0, -0.15, -0.2]} castShadow>
        <sphereGeometry args={[0.12, 10, 10]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[-0.1, -0.18, -0.15]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0.1, -0.18, -0.15]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  )
})

export default Hat
