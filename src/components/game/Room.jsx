import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { Text } from '@react-three/drei'

import { Computer, Bookshelf, Plant, Mailbox } from '../room/decorations'
import { ROOM } from '../../constants/config'
import { theme, environmentColors } from '../../constants/colors'

/**
 * 방 장식 렌더러
 */
function RoomDecoration({ type, position }) {
  const components = {
    computer: Computer,
    bookshelf: Bookshelf,
    plant: Plant,
    mailbox: Mailbox,
  }

  const Component = components[type]
  return Component ? <Component position={position} /> : null
}

/**
 * 방별 장식 설정
 */
const roomDecorations = {
  welcome: [
    { type: 'plant', position: [-1.5, 0, -1.5] },
    { type: 'plant', position: [1.5, 0, 1.5] },
  ],
  skills: [
    { type: 'computer', position: [-1.5, 0, -1.5] },
    { type: 'computer', position: [1.5, 0, -1.5] },
    { type: 'bookshelf', position: [0, 0.9, -2.5] },
  ],
  experience: [
    { type: 'bookshelf', position: [-2, 0.9, 0] },
    { type: 'bookshelf', position: [2, 0.9, 0] },
    { type: 'plant', position: [-2, 0, -2] },
    { type: 'plant', position: [2, 0, 2] },
  ],
  contact: [
    { type: 'mailbox', position: [0, 0, 1.5] },
    { type: 'plant', position: [-1.5, 0, -0.5] },
    { type: 'plant', position: [1.5, 0, -0.5] },
  ],
}

/**
 * 젤다 스타일 방 (토이 느낌)
 */
export default function Room({ id, name, position, color, accentColor, size, onEnter }) {
  const [isPlayerInside, setIsPlayerInside] = useState(false)
  const floatRef = useRef(0)
  const accent = accentColor || theme.accent

  useFrame((state, delta) => {
    floatRef.current += delta
  })

  const handleIntersectionEnter = () => {
    setIsPlayerInside(true)
    onEnter()
  }

  const decorations = roomDecorations[id] || []

  return (
    <group position={[position[0], 0, position[1]]}>
      {/* 방 바닥 - 밝은 나무 원형 */}
      <RigidBody type="fixed" friction={1}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
          <circleGeometry args={[size / 2, 24]} />
          <meshStandardMaterial
            color={color}
            metalness={0}
            roughness={0.8}
            flatShading
          />
        </mesh>
      </RigidBody>

      {/* 나무 테두리 (두꺼운 링) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[size / 2 - 0.15, size / 2, 24]} />
        <meshStandardMaterial color={environmentColors.treeTrunkDark} flatShading />
      </mesh>

      {/* 잔디 테두리 효과 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[size / 2, size / 2 + 0.4, 24]} />
        <meshStandardMaterial
          color={environmentColors.grassDark}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* 방 이름 표지판 - 귀여운 나무 표지판 */}
      <group position={[0, 0, -size / 2 - 0.6]}>
        {/* 표지판 기둥 */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.4, 6]} />
          <meshStandardMaterial color={environmentColors.treeTrunk} flatShading />
        </mesh>

        {/* 표지판 판 - 둥근 모서리 느낌 */}
        <mesh position={[0, 1.35, 0.06]} castShadow>
          <boxGeometry args={[1.6, 0.55, 0.12]} />
          <meshStandardMaterial color={environmentColors.treeTrunkLight} flatShading />
        </mesh>

        {/* 표지판 테두리 */}
        <mesh position={[0, 1.35, 0.13]} castShadow>
          <boxGeometry args={[1.5, 0.45, 0.02]} />
          <meshStandardMaterial color={environmentColors.buildingWood} />
        </mesh>

        {/* 표지판 텍스트 */}
        <Text
          position={[0, 1.35, 0.15]}
          fontSize={0.22}
          color={theme.white}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.025}
          outlineColor={environmentColors.treeTrunkDark}
        >
          {name}
        </Text>
      </group>

      {/* Decorations */}
      {decorations.map((deco, i) => (
        <RoomDecoration key={i} {...deco} />
      ))}

      {/* Interaction trigger zone */}
      <RigidBody type="fixed" sensor>
        <CuboidCollider
          args={[size / 2 - 0.5, ROOM.TRIGGER_HEIGHT, size / 2 - 0.5]}
          position={[0, ROOM.TRIGGER_HEIGHT, 0]}
          sensor
          onIntersectionEnter={handleIntersectionEnter}
          onIntersectionExit={() => setIsPlayerInside(false)}
        />
      </RigidBody>

      {/* 활성화 효과 - 부드러운 발광 */}
      {isPlayerInside && (
        <>
          {/* 바닥 발광 */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
            <circleGeometry args={[size / 2 - 0.2, 24]} />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={0.12 + Math.sin(floatRef.current * 2) * 0.04}
            />
          </mesh>

          {/* 반짝이는 파티클 효과 */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2 + floatRef.current * 0.4
            const radius = 1.2 + Math.sin(floatRef.current * 1.5 + i) * 0.2
            const height = 0.4 + Math.sin(floatRef.current * 2.5 + i * 2) * 0.25

            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  height,
                  Math.sin(angle) * radius,
                ]}
              >
                <sphereGeometry args={[0.04, 6, 6]} />
                <meshBasicMaterial
                  color={environmentColors.glowYellow}
                  transparent
                  opacity={0.5 + Math.sin(floatRef.current * 4 + i) * 0.3}
                />
              </mesh>
            )
          })}
        </>
      )}
    </group>
  )
}
