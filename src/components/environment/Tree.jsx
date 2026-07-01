import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { environmentColors } from '../../constants/colors'

/**
 * 젤다 꿈꾸는 섬 스타일 나무
 * - 구형 잎사귀 (토이 느낌)
 * - 통통한 줄기
 */
export default function Tree({ position = [0, 0, 0], variant = 'normal' }) {
  const leavesRef = useRef()
  const seed = position[0] * 100 + position[2]

  useFrame((state) => {
    if (leavesRef.current) {
      // 바람에 흔들리는 효과 (부드럽게)
      leavesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6 + seed) * 0.02
      leavesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 + seed) * 0.015
    }
  })

  const scale = variant === 'large' ? 1.4 : variant === 'small' ? 0.7 : 1

  return (
    <group position={position} scale={scale}>
      {/* 나무 줄기 - 통통하게 */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.32, 1.4, 8]} />
        <meshStandardMaterial color={environmentColors.treeTrunk} flatShading />
      </mesh>

      {/* 줄기 디테일 (작은 가지) */}
      <mesh position={[0.15, 0.5, 0.1]} rotation={[0.3, 0.5, 0.4]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 0.35, 6]} />
        <meshStandardMaterial color={environmentColors.treeTrunkLight} flatShading />
      </mesh>

      {/* 잎사귀 그룹 - 구형으로 변경 */}
      <group ref={leavesRef}>
        {/* 메인 잎사귀 (큰 구) */}
        <mesh position={[0, 1.8, 0]} castShadow>
          <sphereGeometry args={[1.1, 8, 6]} />
          <meshStandardMaterial color={environmentColors.treeLeaves} flatShading />
        </mesh>

        {/* 상단 잎사귀 */}
        <mesh position={[0, 2.6, 0]} castShadow>
          <sphereGeometry args={[0.7, 7, 5]} />
          <meshStandardMaterial color={environmentColors.treeLeavesLight} flatShading />
        </mesh>

        {/* 측면 잎사귀 (왼쪽) */}
        <mesh position={[-0.6, 1.6, 0.3]} castShadow>
          <sphereGeometry args={[0.5, 6, 5]} />
          <meshStandardMaterial color={environmentColors.treeLeavesLight} flatShading />
        </mesh>

        {/* 측면 잎사귀 (오른쪽) */}
        <mesh position={[0.5, 1.5, -0.2]} castShadow>
          <sphereGeometry args={[0.45, 6, 5]} />
          <meshStandardMaterial color={environmentColors.treeLeavesDark} flatShading />
        </mesh>

        {/* 최상단 작은 구 */}
        <mesh position={[0.1, 3.1, 0]} castShadow>
          <sphereGeometry args={[0.35, 6, 5]} />
          <meshStandardMaterial color={environmentColors.treeLeavesLight} flatShading />
        </mesh>
      </group>

      {/* 그림자 (바닥) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.8, 12]} />
        <meshBasicMaterial color="#000" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}
