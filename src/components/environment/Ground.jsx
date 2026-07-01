import { RigidBody } from '@react-three/rapier'
import { environmentColors } from '../../constants/colors'
import { WORLD } from '../../constants/config'

/**
 * 젤다 꿈꾸는 섬 스타일 떠있는 섬 지형
 */
export default function Ground({ position = [0, 0, 0] }) {
  return (
    <RigidBody type="fixed" friction={1}>
      <group position={position}>
        {/* === 상단 잔디 평면 (플레이 영역) === */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[WORLD.ISLAND_RADIUS, WORLD.ISLAND_RADIUS, 0.5, 32]} />
          <meshStandardMaterial
            color={environmentColors.grass}
            metalness={0}
            roughness={0.9}
            flatShading
          />
        </mesh>

        {/* 잔디 하이라이트 (상단) */}
        <mesh position={[0, 0.26, 0]} receiveShadow>
          <cylinderGeometry args={[WORLD.ISLAND_RADIUS - 0.5, WORLD.ISLAND_RADIUS - 0.3, 0.02, 32]} />
          <meshStandardMaterial
            color={environmentColors.grassLight}
            metalness={0}
            roughness={0.8}
          />
        </mesh>

        {/* === 중간 흙층 (위가 넓고 아래가 좁음) === */}
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[WORLD.ISLAND_RADIUS, WORLD.ISLAND_RADIUS - 3, 2.5, 16]} />
          <meshStandardMaterial
            color={environmentColors.dirtLight}
            metalness={0}
            roughness={1}
            flatShading
          />
        </mesh>

        {/* 흙층 테두리 디테일 */}
        <mesh position={[0, -0.5, 0]}>
          <torusGeometry args={[WORLD.ISLAND_RADIUS - 0.2, 0.3, 8, 32]} />
          <meshStandardMaterial
            color={environmentColors.dirtMid}
            flatShading
          />
        </mesh>

        {/* === 하단 바위층 (절벽 느낌) === */}
        <mesh position={[0, -4, 0]}>
          <cylinderGeometry args={[WORLD.ISLAND_RADIUS - 3, WORLD.ISLAND_RADIUS - 8, 3, 12]} />
          <meshStandardMaterial
            color={environmentColors.rockMid}
            metalness={0}
            roughness={1}
            flatShading
          />
        </mesh>

        {/* === 최하단 뾰족한 부분 === */}
        <mesh position={[0, -7, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[WORLD.ISLAND_RADIUS - 8, 4, 8]} />
          <meshStandardMaterial
            color={environmentColors.rockDark}
            metalness={0}
            roughness={1}
            flatShading
          />
        </mesh>

        {/* === 섬 가장자리 장식 바위들 === */}
        <EdgeRocks radius={WORLD.ISLAND_RADIUS} />

        {/* === 작은 언덕들 (지형 변화) === */}
        <TerrainHill position={[-12, 0.4, 8]} scale={1.2} />
        <TerrainHill position={[14, 0.3, -5]} scale={0.9} />
        <TerrainHill position={[-8, 0.25, -12]} scale={0.7} />
        <TerrainHill position={[10, 0.35, 10]} scale={1.0} />
      </group>
    </RigidBody>
  )
}

/**
 * 섬 가장자리 바위 장식
 */
function EdgeRocks({ radius }) {
  const rocks = []
  const rockCount = 12

  for (let i = 0; i < rockCount; i++) {
    const angle = (i / rockCount) * Math.PI * 2
    const r = radius - 1 + Math.random() * 2
    const x = Math.cos(angle) * r
    const z = Math.sin(angle) * r
    const scale = 0.5 + Math.random() * 1

    rocks.push(
      <group key={i} position={[x, -0.5 - Math.random() * 1.5, z]}>
        {/* 큰 바위 */}
        <mesh castShadow>
          <sphereGeometry args={[0.8 * scale, 6, 5]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? environmentColors.rockLight : environmentColors.rock}
            flatShading
          />
        </mesh>
        {/* 작은 바위 */}
        <mesh position={[0.4 * scale, -0.2, 0.3 * scale]}>
          <sphereGeometry args={[0.4 * scale, 5, 4]} />
          <meshStandardMaterial
            color={environmentColors.rockDark}
            flatShading
          />
        </mesh>
      </group>
    )
  }

  return <>{rocks}</>
}

/**
 * 작은 언덕 (지형 변화)
 */
function TerrainHill({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* 언덕 본체 - 납작한 반구 */}
      <mesh receiveShadow>
        <sphereGeometry args={[2.5, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={environmentColors.grassLight}
          flatShading
        />
      </mesh>
      {/* 언덕 테두리 */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.15, 6, 16]} />
        <meshStandardMaterial
          color={environmentColors.grassDark}
          flatShading
        />
      </mesh>
      {/* 흙 노출 부분 */}
      <mesh position={[1.2, 0.3, 0.8]} rotation={[0.3, 0.5, 0.2]}>
        <boxGeometry args={[0.6, 0.25, 0.4]} />
        <meshStandardMaterial
          color={environmentColors.dirtExposed}
          flatShading
        />
      </mesh>
    </group>
  )
}
