import { characterColors } from '../../constants/colors'

/**
 * 캐릭터 팔 컴포넌트
 * @param {Object} props
 * @param {number} props.swing - 팔 흔들림 값
 */
export function Arms({ swing = 0 }) {
  const { skin } = characterColors

  return (
    <>
      {/* Left Arm */}
      <group position={[-0.35, 0.7, 0]} rotation={[swing, 0, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.08, 0.25, 8, 8]} />
          <meshStandardMaterial color={skin} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.35, 0.7, 0]} rotation={[-swing, 0, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.08, 0.25, 8, 8]} />
          <meshStandardMaterial color={skin} />
        </mesh>
      </group>
    </>
  )
}

/**
 * 캐릭터 다리 컴포넌트
 * @param {Object} props
 * @param {number} props.swing - 다리 흔들림 값
 */
export function Legs({ swing = 0 }) {
  const { pants, shoes } = characterColors

  return (
    <>
      {/* Left Leg */}
      <group position={[-0.12, 0.25, 0]} rotation={[-swing, 0, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.2, 8, 8]} />
          <meshStandardMaterial color={pants} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -0.18, 0.05]} castShadow>
          <boxGeometry args={[0.12, 0.08, 0.18]} />
          <meshStandardMaterial color={shoes} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.12, 0.25, 0]} rotation={[swing, 0, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.2, 8, 8]} />
          <meshStandardMaterial color={pants} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -0.18, 0.05]} castShadow>
          <boxGeometry args={[0.12, 0.08, 0.18]} />
          <meshStandardMaterial color={shoes} />
        </mesh>
      </group>
    </>
  )
}
