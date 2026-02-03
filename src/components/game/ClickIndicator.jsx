import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function ClickIndicator({ position }) {
  const ref = useRef()
  const scaleRef = useRef(1)
  const opacityRef = useRef(1)

  useFrame((state, delta) => {
    if (ref.current) {
      scaleRef.current += delta * 2
      opacityRef.current -= delta * 1.5

      if (opacityRef.current <= 0) {
        scaleRef.current = 1
        opacityRef.current = 1
      }

      ref.current.scale.setScalar(scaleRef.current)
      ref.current.material.opacity = Math.max(0, opacityRef.current)
    }
  })

  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[position[0], 0.05, position[2]]}
    >
      <ringGeometry args={[0.3, 0.5, 32]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.8} />
    </mesh>
  )
}
