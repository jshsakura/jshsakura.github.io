/**
 * 책장 장식 컴포넌트
 * @param {Object} props
 * @param {Array} props.position - 위치 [x, y, z]
 */
export default function Bookshelf({ position = [0, 0, 0] }) {
  const bookColors = ['#e57373', '#64b5f6', '#81c784', '#ffb74d', '#ba68c8']
  const shelfRows = [0, 0.4, 0.8, 1.2]
  const bookPositions = [-0.4, -0.2, 0, 0.2, 0.4]

  return (
    <group position={position}>
      {/* Shelf frame */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 1.8, 0.4]} />
        <meshStandardMaterial color="#a1887f" />
      </mesh>

      {/* Books */}
      {shelfRows.map((y, rowIndex) => (
        <group key={rowIndex} position={[0, y - 0.5, 0.1]}>
          {bookPositions.map((x, bookIndex) => (
            <mesh key={bookIndex} position={[x, 0, 0]} castShadow>
              <boxGeometry args={[0.15, 0.3, 0.2]} />
              <meshStandardMaterial color={bookColors[bookIndex]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}
