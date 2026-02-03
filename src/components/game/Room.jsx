import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { Text, Html } from '@react-three/drei'

function RoomSign({ name, color }) {
  return (
    <group position={[0, 2, 0]}>
      {/* Sign post */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 1, 8]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      {/* Sign board */}
      <mesh castShadow>
        <boxGeometry args={[2, 0.6, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.3}
        color="#374151"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  )
}

function RoomDecoration({ type, position }) {
  switch (type) {
    case 'computer':
      return (
        <group position={position}>
          {/* Desk */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[1.2, 0.1, 0.6]} />
            <meshStandardMaterial color="#d7ccc8" />
          </mesh>
          {/* Monitor */}
          <mesh position={[0, 0.75, 0]} castShadow>
            <boxGeometry args={[0.8, 0.5, 0.05]} />
            <meshStandardMaterial color="#424242" />
          </mesh>
          <mesh position={[0, 0.75, 0.03]}>
            <planeGeometry args={[0.7, 0.4]} />
            <meshBasicMaterial color="#1e88e5" />
          </mesh>
          {/* Desk legs */}
          <mesh position={[-0.5, 0.2, -0.2]} castShadow>
            <boxGeometry args={[0.05, 0.4, 0.05]} />
            <meshStandardMaterial color="#8d6e63" />
          </mesh>
          <mesh position={[0.5, 0.2, -0.2]} castShadow>
            <boxGeometry args={[0.05, 0.4, 0.05]} />
            <meshStandardMaterial color="#8d6e63" />
          </mesh>
        </group>
      )
    case 'bookshelf':
      return (
        <group position={position}>
          <mesh castShadow>
            <boxGeometry args={[1.5, 1.8, 0.4]} />
            <meshStandardMaterial color="#a1887f" />
          </mesh>
          {/* Books */}
          {[0, 0.4, 0.8, 1.2].map((y, i) => (
            <group key={i} position={[0, y - 0.5, 0.1]}>
              {[-0.4, -0.2, 0, 0.2, 0.4].map((x, j) => (
                <mesh key={j} position={[x, 0, 0]} castShadow>
                  <boxGeometry args={[0.15, 0.3, 0.2]} />
                  <meshStandardMaterial
                    color={['#e57373', '#64b5f6', '#81c784', '#ffb74d', '#ba68c8'][j]}
                  />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      )
    case 'plant':
      return (
        <group position={position}>
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.15, 0.4, 8]} />
            <meshStandardMaterial color="#8d6e63" />
          </mesh>
          <mesh position={[0, 0.6, 0]} castShadow>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial color="#4caf50" />
          </mesh>
        </group>
      )
    case 'mailbox':
      return (
        <group position={position}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
            <meshStandardMaterial color="#5d4037" />
          </mesh>
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[0.4, 0.3, 0.25]} />
            <meshStandardMaterial color="#e53935" />
          </mesh>
        </group>
      )
    default:
      return null
  }
}

export default function Room({ id, name, position, color, size, onEnter }) {
  const [isPlayerInside, setIsPlayerInside] = useState(false)
  const floatRef = useRef(0)

  useFrame((state, delta) => {
    floatRef.current += delta
  })

  const handleIntersectionEnter = () => {
    setIsPlayerInside(true)
    onEnter()
  }

  const decorations = {
    welcome: [
      { type: 'plant', position: [-2, 0, -2] },
      { type: 'plant', position: [2, 0, 2] },
    ],
    skills: [
      { type: 'computer', position: [-2, 0, -2] },
      { type: 'computer', position: [2, 0, -2] },
      { type: 'bookshelf', position: [0, 0.9, -3.5] },
    ],
    experience: [
      { type: 'bookshelf', position: [-3, 0.9, 0] },
      { type: 'bookshelf', position: [3, 0.9, 0] },
      { type: 'plant', position: [-3, 0, -3] },
      { type: 'plant', position: [3, 0, 3] },
    ],
    contact: [
      { type: 'mailbox', position: [0, 0, 2] },
      { type: 'plant', position: [-2, 0, -1] },
      { type: 'plant', position: [2, 0, -1] },
    ],
  }

  return (
    <group position={[position[0], 0, position[1]]}>
      {/* Room floor */}
      <RigidBody type="fixed" friction={1}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
          <planeGeometry args={[size, size]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </RigidBody>

      {/* Room border/edge */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[size / 2 - 0.2, size / 2, 4]} />
        <meshStandardMaterial color="#fff" transparent opacity={0.5} />
      </mesh>

      {/* Sign */}
      <group position={[0, 0, -size / 2 - 0.5]}>
        <RoomSign name={name} color={color} />
      </group>

      {/* Decorations */}
      {decorations[id]?.map((deco, i) => (
        <RoomDecoration key={i} {...deco} />
      ))}

      {/* Interaction trigger zone */}
      <RigidBody type="fixed" sensor>
        <CuboidCollider
          args={[size / 2 - 0.5, 2, size / 2 - 0.5]}
          position={[0, 2, 0]}
          sensor
          onIntersectionEnter={handleIntersectionEnter}
          onIntersectionExit={() => setIsPlayerInside(false)}
        />
      </RigidBody>

      {/* Glowing effect when player is inside */}
      {isPlayerInside && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <planeGeometry args={[size - 0.5, size - 0.5]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3 + Math.sin(floatRef.current * 3) * 0.1}
          />
        </mesh>
      )}
    </group>
  )
}
