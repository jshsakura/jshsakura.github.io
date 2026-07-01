import { characterColors } from '../../constants/colors'

/**
 * 캐릭터 몸통 컴포넌트
 */
export default function Body() {
  const { shirt } = characterColors

  return (
    <mesh position={[0, 0.65, 0]} castShadow>
      <capsuleGeometry args={[0.25, 0.3, 8, 16]} />
      <meshStandardMaterial color={shirt} />
    </mesh>
  )
}
