import { useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

/**
 * 클릭 시 이동 목표 위치를 설정하는 훅
 * @param {Object} camera - Three.js camera
 * @param {Object} gl - WebGL renderer
 * @returns {Object} - 목표 위치 및 클릭 핸들러
 */
export default function useClickToMove(camera, gl) {
  const [targetPosition, setTargetPosition] = useState(null)
  const floorPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0))
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())

  const handleClick = useCallback((event) => {
    const rect = gl.domElement.getBoundingClientRect()
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.current.setFromCamera(mouse.current, camera)
    const intersectPoint = new THREE.Vector3()
    raycaster.current.ray.intersectPlane(floorPlane.current, intersectPoint)

    if (intersectPoint) {
      setTargetPosition([intersectPoint.x, 0, intersectPoint.z])
    }
  }, [camera, gl])

  return {
    targetPosition,
    handleClick,
  }
}
