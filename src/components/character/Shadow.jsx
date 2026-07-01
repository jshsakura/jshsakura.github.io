import { characterColors } from '../../constants/colors'

/**
 * 캐릭터 그림자 컴포넌트
 */
export default function Shadow() {
  const { shadow } = characterColors

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
      <circleGeometry args={[0.4, 32]} />
      <meshBasicMaterial color={shadow} transparent opacity={0.2} />
    </mesh>
  )
}
