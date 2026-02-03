import { useEffect, useState } from 'react'
import Navigation from './components/ui/Navigation'
import Footer from './components/ui/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#0f0f1a] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  )
}

function WebGLError() {
  return (
    <div className="fixed inset-0 bg-[#0f0f1a] flex items-center justify-center z-50 p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 text-yellow-500">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">WebGL Not Supported</h2>
        <p className="text-gray-400">
          Your browser doesn&apos;t support WebGL which is required for 3D graphics.
          Please try a different browser.
        </p>
      </div>
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [webGLSupported, setWebGLSupported] = useState(true)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setWebGLSupported(false)
      }
    } catch (e) {
      setWebGLSupported(false)
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!webGLSupported) {
    return <WebGLError />
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div
        className={`transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
