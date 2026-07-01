/**
 * 우편함 장식 컴포넌트
 * @param {Object} props
 * @param {Array} props.position - 위치 [x, y, z]
 */
export default function Mailbox({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Post */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>

      {/* Box */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[0.4, 0.3, 0.25]} />
        <meshStandardMaterial color="#e53935" />
      </mesh>
    </group>
  )
}
