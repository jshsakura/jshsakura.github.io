import { useState, useEffect } from 'react'

export default function TypeWriter({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000
}) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentText = texts[currentIndex]

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseTime)
      return () => clearTimeout(timeout)
    }

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % texts.length)
        return
      }

      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1))
      }, deleteSpeed)
      return () => clearTimeout(timeout)
    }

    if (displayText === currentText) {
      setIsPaused(true)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText(currentText.slice(0, displayText.length + 1))
    }, speed)

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isDeleting, isPaused, texts, speed, deleteSpeed, pauseTime])

  return (
    <span className="inline-flex items-center">
      <span>{displayText}</span>
      <span className="ml-1 w-0.5 h-6 bg-indigo-500 animate-pulse" />
    </span>
  )
}
