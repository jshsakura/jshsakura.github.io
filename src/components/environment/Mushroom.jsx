import { environmentColors } from '../../constants/colors'

/**
 * 젤다 스타일 버섯
 * - 통통한 토이 느낌
 * - 파스텔 색상
 */
export default function Mushroom({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* 버섯 줄기 - 더 통통하게 */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.075, 0.24, 8]} />
        <meshStandardMaterial color={environmentColors.mushroomStem} />
      </mesh>

      {/* 버섯 갓 - 반구형 */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <sphereGeometry args={[0.14, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={environmentColors.mushroomCap} flatShading />
      </mesh>

      {/* 버섯 점 무늬 */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2 + 0.3
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.09,
              0.32,
              Math.sin(angle) * 0.09,
            ]}
          >
            <circleGeometry args={[0.025, 6]} />
            <meshStandardMaterial color={environmentColors.mushroomCapSpots} />
          </mesh>
        )
      })}

      {/* 그림자 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.1, 8]} />
        <meshBasicMaterial color="#000" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}
