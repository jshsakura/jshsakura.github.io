import { RigidBody } from '@react-three/rapier'
import Room from './Room'
import { roomsConfig } from '../../data/resume'

function Ground() {
  return (
    <RigidBody type="fixed" friction={1}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -0.1, -6]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#90caf9" />
      </mesh>
    </RigidBody>
  )
}

function Path({ from, to }) {
  const midX = (from[0] + to[0]) / 2
  const midZ = (from[1] + to[1]) / 2
  const length = Math.sqrt(
    Math.pow(to[0] - from[0], 2) + Math.pow(to[1] - from[1], 2)
  )
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0])

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, -angle]}
      position={[midX, 0.02, midZ]}
      receiveShadow
    >
      <planeGeometry args={[length, 2]} />
      <meshStandardMaterial color="#e8d5b7" />
    </mesh>
  )
}

function Tree({ position }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.8, 8]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#81c784" />
      </mesh>
      <mesh position={[0.3, 1.0, 0.2]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#66bb6a" />
      </mesh>
      <mesh position={[-0.2, 0.9, -0.2]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#a5d6a7" />
      </mesh>
    </group>
  )
}

function Cloud({ position }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#fff" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.8, 0.2, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#fff" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.7, 0.1, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#fff" transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

function Flower({ position, color = '#ff6b6b' }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#66bb6a" />
      </mesh>
      <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, 6]} />
        <meshStandardMaterial color={color} side={2} />
      </mesh>
      <mesh position={[0, 0.35, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.05, 16]} />
        <meshStandardMaterial color="#ffeb3b" side={2} />
      </mesh>
    </group>
  )
}

export default function World({ setCurrentRoom }) {
  return (
    <>
      <Ground />

      {/* Rooms */}
      {roomsConfig.map((room) => (
        <Room
          key={room.id}
          {...room}
          onEnter={() => setCurrentRoom(room.id)}
        />
      ))}

      {/* Paths between rooms */}
      <Path from={[0, 0]} to={[10, 0]} />
      <Path from={[0, 0]} to={[0, -12]} />
      <Path from={[10, 0]} to={[10, -12]} />
      <Path from={[0, -12]} to={[10, -12]} />

      {/* Decorations */}
      <Tree position={[-4, 0, 3]} />
      <Tree position={[15, 0, 3]} />
      <Tree position={[-4, 0, -15]} />
      <Tree position={[15, 0, -15]} />
      <Tree position={[5, 0, 5]} />
      <Tree position={[-3, 0, -6]} />

      {/* Flowers */}
      <Flower position={[2, 0, 2]} color="#ff6b6b" />
      <Flower position={[3, 0, 2.5]} color="#ffd93d" />
      <Flower position={[2.5, 0, 3]} color="#6bcb77" />
      <Flower position={[12, 0, -5]} color="#4d96ff" />
      <Flower position={[13, 0, -5.5]} color="#ff6b6b" />
      <Flower position={[-2, 0, -10]} color="#ffd93d" />
      <Flower position={[-1.5, 0, -9]} color="#6bcb77" />

      {/* Clouds */}
      <Cloud position={[-5, 12, -10]} />
      <Cloud position={[15, 14, 5]} />
      <Cloud position={[8, 13, -20]} />
    </>
  )
}
