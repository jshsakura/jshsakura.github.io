import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function SkillBox({ position, color, label, delay = 0 }) {
  const meshRef = useRef()
  const time = useRef(delay)

  useFrame((state, delta) => {
    time.current += delta
    if (meshRef.current) {
      meshRef.current.rotation.y = time.current * 0.5
      meshRef.current.rotation.x = Math.sin(time.current * 0.3) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(time.current * 0.5 + delay) * 0.2
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.7}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.55]}
        fontSize={0.15}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {label}
      </Text>
    </group>
  )
}

export default function FloatingIcons() {
  const skills = [
    { label: 'React', color: '#61dafb', position: [-3, 1, -2] },
    { label: 'Java', color: '#f89820', position: [3, 0.5, -2] },
    { label: 'Python', color: '#3776ab', position: [-2, -1, -3] },
    { label: 'Spring', color: '#6db33f', position: [2, 1.5, -2.5] },
    { label: 'Node.js', color: '#68a063', position: [0, -1.5, -2] },
  ]

  return (
    <group>
      {skills.map((skill, index) => (
        <SkillBox
          key={skill.label}
          position={skill.position}
          color={skill.color}
          label={skill.label}
          delay={index * 0.5}
        />
      ))}
    </group>
  )
}
