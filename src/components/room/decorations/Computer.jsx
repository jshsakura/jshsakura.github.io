/**
 * 컴퓨터 장식 컴포넌트
 * @param {Object} props
 * @param {Array} props.position - 위치 [x, y, z]
 */
export default function Computer({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Desk */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.2, 0.1, 0.6]} />
        <meshStandardMaterial color="#d7ccc8" />
      </mesh>

      {/* Monitor */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.05]} />
        <meshStandardMaterial color="#424242" />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.75, 0.03]}>
        <planeGeometry args={[0.7, 0.4]} />
        <meshBasicMaterial color="#1e88e5" />
      </mesh>

      {/* Desk legs */}
      <mesh position={[-0.5, 0.2, -0.2]} castShadow>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      <mesh position={[0.5, 0.2, -0.2]} castShadow>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
    </group>
  )
}
