import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Scene from '../3d/Scene'
import TypeWriter from '../ui/TypeWriter'
import { resumeData } from '../../data/resume'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = useCallback((e) => {
    setMousePosition({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  const typewriterTexts = [
    'Python & Java 개발자',
    'React 프론트엔드',
    '서비스를 만드는 사람',
    '협업을 중시하는 팀원',
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Scene mousePosition={mousePosition} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0f1a] z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.p
            className="text-indigo-400 text-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            안녕하세요, 저는
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span className="gradient-text">{resumeData.personal.name}</span>
          </motion.h1>

          <motion.div
            className="text-xl md:text-2xl text-gray-300 mb-6 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <TypeWriter texts={typewriterTexts} speed={80} deleteSpeed={40} pauseTime={2500} />
          </motion.div>

          <motion.p
            className="text-gray-400 text-lg italic mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {resumeData.personal.tagline}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <motion.a
              href="#contact"
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              연락하기
            </motion.a>
            <motion.a
              href="#about"
              className="px-8 py-3 glass rounded-full font-medium hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              더 알아보기
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
