import { environmentColors } from '../../constants/colors'

/**
 * 젤다 스타일 바위
 * - 둥근 구형 조합
 * - 부드러운 토이 느낌
 */
export default function Rock({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* 메인 바위 - 납작한 구 */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <sphereGeometry args={[0.28, 7, 5]} />
        <meshStandardMaterial color={environmentColors.rock} flatShading />
      </mesh>

      {/* 옆 바위 (큰) */}
      <mesh position={[0.22, 0.12, 0.12]} scale={[0.75, 0.65, 0.75]} castShadow>
        <sphereGeometry args={[0.2, 6, 5]} />
        <meshStandardMaterial color={environmentColors.rockLight} flatShading />
      </mesh>

      {/* 작은 바위 1 */}
      <mesh position={[-0.15, 0.08, 0.15]} castShadow>
        <sphereGeometry args={[0.1, 5, 4]} />
        <meshStandardMaterial color={environmentColors.rockMid} flatShading />
      </mesh>

      {/* 작은 바위 2 */}
      <mesh position={[0.1, 0.06, -0.12]}>
        <sphereGeometry args={[0.07, 5, 4]} />
        <meshStandardMaterial color={environmentColors.rockDark} flatShading />
      </mesh>

      {/* 그림자 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.25, 8]} />
        <meshBasicMaterial color="#000" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}
