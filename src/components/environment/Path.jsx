import { useMemo } from 'react'
import { environmentColors } from '../../constants/colors'
import { WORLD } from '../../constants/config'

/**
 * 젤다 스타일 흙길
 * - 밝은 황토색
 * - 부드러운 느낌
 */
export default function Path({ from, to }) {
  const midX = (from[0] + to[0]) / 2
  const midZ = (from[1] + to[1]) / 2
  const length = Math.sqrt(
    Math.pow(to[0] - from[0], 2) + Math.pow(to[1] - from[1], 2)
  )
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0])

  // 길 위의 돌들 (고정된 위치)
  const stones = useMemo(() => {
    const stoneCount = Math.floor(length / 2.5)
    return Array.from({ length: stoneCount }).map((_, i) => {
      const t = (i + 0.5) / stoneCount
      const offsetX = (Math.sin(i * 1234.5) * 0.5 - 0.25) * 0.6
      const offsetZ = (Math.cos(i * 5678.9) * 0.5 - 0.25) * 0.6
      return {
        x: from[0] + (to[0] - from[0]) * t + offsetX,
        z: from[1] + (to[1] - from[1]) * t + offsetZ,
        size: 0.06 + (Math.sin(i * 9876.5) * 0.5 + 0.5) * 0.04,
        rotation: Math.sin(i * 3456.7) * Math.PI,
      }
    })
  }, [from, to, length])

  return (
    <group>
      {/* 길 테두리 (어두운 부분) */}
      <mesh
        rotation={[-Math.PI / 2, 0, -angle]}
        position={[midX, 0.02, midZ]}
      >
        <planeGeometry args={[length, WORLD.PATH_WIDTH + 0.25]} />
        <meshStandardMaterial
          color={environmentColors.pathAccent}
          metalness={0}
          roughness={0.9}
        />
      </mesh>

      {/* 메인 흙길 */}
      <mesh
        rotation={[-Math.PI / 2, 0, -angle]}
        position={[midX, 0.025, midZ]}
        receiveShadow
      >
        <planeGeometry args={[length, WORLD.PATH_WIDTH]} />
        <meshStandardMaterial
          color={environmentColors.path}
          metalness={0}
          roughness={0.85}
        />
      </mesh>

      {/* 길 위의 작은 돌들 */}
      {stones.map((stone, i) => (
        <mesh
          key={i}
          position={[stone.x, 0.03, stone.z]}
          rotation={[-Math.PI / 2, stone.rotation, 0]}
        >
          <circleGeometry args={[stone.size, 6]} />
          <meshStandardMaterial
            color={environmentColors.pathStone}
            flatShading
          />
        </mesh>
      ))}
    </group>
  )
}
