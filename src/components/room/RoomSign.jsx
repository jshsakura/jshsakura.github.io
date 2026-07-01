import { Text } from '@react-three/drei'

/**
 * 방 이름 표지판 컴포넌트
 * @param {Object} props
 * @param {string} props.name - 방 이름
 * @param {string} props.color - 표지판 배경색
 */
export default function RoomSign({ name, color }) {
  return (
    <group position={[0, 2, 0]}>
      {/* Sign post */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 1, 8]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>

      {/* Sign board */}
      <mesh castShadow>
        <boxGeometry args={[2, 0.6, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <Text
        position={[0, 0, 0.06]}
        fontSize={0.3}
        color="#374151"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  )
}
