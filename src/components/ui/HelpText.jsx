import { motion } from 'framer-motion'

export default function HelpText() {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="absolute bottom-4 left-4"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-md">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">W</kbd>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">A</kbd>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">S</kbd>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">D</kbd>
            </div>
            <span>Move</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">Shift</kbd>
            <span>Run</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
