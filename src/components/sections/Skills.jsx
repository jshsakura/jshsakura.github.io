import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, RoundedBox, Text, Float } from '@react-three/drei'
import { Suspense } from 'react'
import SectionTitle from '../ui/SectionTitle'
import { resumeData } from '../../data/resume'

function SkillCube({ position, color, items, name }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <RoundedBox args={[2, 2, 2]} radius={0.2} smoothness={4}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.1}
            roughness={0.3}
            metalness={0.5}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        <Text
          position={[0, 0, 1.1]}
          fontSize={0.25}
          color="#fff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {name}
        </Text>
      </group>
    </Float>
  )
}

function Skills3D() {
  const skillsArray = Object.values(resumeData.skills)
  const positions = [
    [-3, 1, 0],
    [0, 1, 0],
    [3, 1, 0],
    [-1.5, -1.5, 0],
    [1.5, -1.5, 0],
  ]

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />

        {skillsArray.map((skill, index) => (
          <SkillCube
            key={skill.name}
            position={positions[index]}
            color={skill.color}
            items={skill.items}
            name={skill.name}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  )
}

function SkillCard({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="glass rounded-xl p-6 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
        style={{ backgroundColor: `${skill.color}20` }}
      >
        <div
          className="w-6 h-6 rounded-md"
          style={{ backgroundColor: skill.color }}
        />
      </div>
      <h3 className="text-xl font-semibold mb-3" style={{ color: skill.color }}>
        {skill.name}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skill.items.map((item) => (
          <span
            key={item}
            className="px-3 py-1 text-sm rounded-full bg-white/5 text-gray-300"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const skillsArray = Object.values(resumeData.skills)

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="What I work with">기술 스택</SectionTitle>

        {/* 3D Visualization - Hidden on mobile */}
        <div className="hidden lg:block h-[400px] mb-12">
          <Skills3D />
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsArray.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
