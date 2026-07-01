import { characterColors } from '../../constants/colors'

/**
 * 캐릭터 얼굴 컴포넌트 (머리, 눈, 볼, 입)
 */
export default function Face() {
  const { skin, hair, cheeks, mouth } = characterColors

  return (
    <>
      {/* Head */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={skin} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.1, 1.22, 0.25]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={hair} />
      </mesh>
      <mesh position={[0.1, 1.22, 0.25]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={hair} />
      </mesh>

      {/* Cheeks */}
      <mesh position={[-0.2, 1.15, 0.22]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={cheeks} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.2, 1.15, 0.22]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={cheeks} transparent opacity={0.5} />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 1.1, 0.28]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={mouth} />
      </mesh>
    </>
  )
}
