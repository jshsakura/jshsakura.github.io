import { Text } from '@react-three/drei'
import { characterColors } from '../../constants/colors'

/**
 * 캐릭터 이름표 컴포넌트
 * @param {Object} props
 * @param {string} props.name - 표시할 이름
 */
export default function NameTag({ name = 'Player' }) {
  const { nameTag, nameOutline } = characterColors

  return (
    <Text
      position={[0, 1.8, 0]}
      fontSize={0.2}
      color={nameTag}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor={nameOutline}
    >
      {name}
    </Text>
  )
}
