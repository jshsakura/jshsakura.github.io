/**
 * 화분 장식 컴포넌트
 * @param {Object} props
 * @param {Array} props.position - 위치 [x, y, z]
 */
export default function Plant({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.4, 8]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>

      {/* Plant leaves */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>
    </group>
  )
}
