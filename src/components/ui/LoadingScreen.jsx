import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ isLoaded }) {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)',
          }}
        >
          <div className="text-center">
            {/* Character loading animation */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mb-6"
            >
              <div className="relative inline-block">
                {/* Simple character */}
                <div className="w-16 h-16 bg-indigo-500 rounded-full relative">
                  {/* Eyes */}
                  <div className="absolute top-5 left-3 w-2 h-2 bg-white rounded-full" />
                  <div className="absolute top-5 right-3 w-2 h-2 bg-white rounded-full" />
                  {/* Smile */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-2 border-b-2 border-white rounded-full" />
                </div>
                {/* Shadow */}
                <motion.div
                  animate={{
                    scale: [1, 0.8, 1],
                    opacity: [0.3, 0.15, 0.3],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-12 h-3 bg-black/20 rounded-full mx-auto mt-2"
                />
              </div>
            </motion.div>

            <h1 className="text-2xl font-bold text-gray-700 mb-2">
              Seunghyeon&apos;s World
            </h1>
            <p className="text-gray-500">Loading...</p>

            {/* Loading dots */}
            <div className="flex justify-center gap-1 mt-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  className="w-2 h-2 bg-indigo-400 rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
