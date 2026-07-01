import { Ground, Tree, Cloud, Flower, Path, Mushroom, Rock, GrassTuft } from '../environment'
import Room from './Room'
import { roomsConfig } from '../../data/resume'
import { environmentColors } from '../../constants/colors'

/**
 * 젤다 스타일 - 섬 가장자리를 따라 나무 배치
 */
const treeConfig = [
  // 섬 가장자리 큰 나무들
  { position: [-18, 0, 0], variant: 'large' },
  { position: [18, 0, 0], variant: 'large' },
  { position: [0, 0, 18], variant: 'large' },
  { position: [0, 0, -18], variant: 'large' },

  // 대각선 방향
  { position: [-14, 0, 14], variant: 'large' },
  { position: [14, 0, 14], variant: 'large' },
  { position: [-14, 0, -14], variant: 'normal' },
  { position: [14, 0, -14], variant: 'normal' },

  // 중간 나무들 (방 주변)
  { position: [-16, 0, 8], variant: 'normal' },
  { position: [16, 0, 8], variant: 'normal' },
  { position: [-8, 0, 15], variant: 'normal' },
  { position: [8, 0, 15], variant: 'normal' },

  // 작은 나무들 (장식)
  { position: [-6, 0, 10], variant: 'small' },
  { position: [6, 0, 10], variant: 'small' },
  { position: [-12, 0, -8], variant: 'small' },
  { position: [12, 0, -8], variant: 'small' },
]

/**
 * 꽃 배치 (방 주변)
 */
const flowerConfig = [
  // Welcome 방 주변
  { position: [3, 0, 2], color: environmentColors.flowerPink },
  { position: [-3, 0, 2], color: environmentColors.flowerYellow },
  { position: [2, 0, -3], color: environmentColors.flowerBlue },

  // Skills 방 주변
  { position: [13, 0, 8], color: environmentColors.flowerPink },
  { position: [7, 0, 9], color: environmentColors.flowerWhite },

  // Experience 방 주변
  { position: [-13, 0, 8], color: environmentColors.flowerYellow },
  { position: [-7, 0, 9], color: environmentColors.flowerBlue },

  // Contact 방 주변
  { position: [3, 0, -14], color: environmentColors.flowerPink },
  { position: [-3, 0, -14], color: environmentColors.flowerWhite },

  // 추가 꽃들
  { position: [10, 0, -5], color: environmentColors.flowerYellow },
  { position: [-10, 0, -5], color: environmentColors.flowerBlue },
]

/**
 * 버섯 배치
 */
const mushroomConfig = [
  { position: [-5, 0, 12], scale: 1.0 },
  { position: [5, 0, 12], scale: 0.8 },
  { position: [-15, 0, 3], scale: 1.2 },
  { position: [15, 0, 3], scale: 0.9 },
  { position: [8, 0, -10], scale: 1.0 },
  { position: [-8, 0, -10], scale: 0.8 },
]

/**
 * 바위 배치 (섬 가장자리)
 */
const rockConfig = [
  { position: [-20, 0, 5], scale: 1.5 },
  { position: [20, 0, 5], scale: 1.3 },
  { position: [-20, 0, -5], scale: 1.2 },
  { position: [20, 0, -5], scale: 1.4 },
  { position: [12, 0, -16], scale: 1.0 },
  { position: [-12, 0, -16], scale: 1.1 },
]

/**
 * 잔디 뭉치 배치
 */
const grassConfig = [
  // 중앙 영역
  [2, 0, 5], [-2, 0, 5], [5, 0, 3], [-5, 0, 3],
  // 북쪽
  [0, 0, 12], [4, 0, 11], [-4, 0, 11],
  // 동쪽/서쪽
  [15, 0, 0], [-15, 0, 0], [12, 0, 4], [-12, 0, 4],
  // 남쪽
  [5, 0, -8], [-5, 0, -8], [0, 0, -16],
]

/**
 * 구름 배치 (섬 주변)
 */
const cloudPositions = [
  [-15, 12, -15],
  [15, 14, -10],
  [-10, 13, 15],
  [10, 11, 18],
  [0, 15, -20],
  [20, 12, 5],
]

/**
 * 경로 배치 (방들을 연결)
 */
const pathConfig = [
  // Welcome → Skills
  { from: [0, 0], to: [10, 6] },
  // Welcome → Experience
  { from: [0, 0], to: [-10, 6] },
  // Welcome → Contact
  { from: [0, 0], to: [0, -12] },
  // Skills → Experience (북쪽 연결)
  { from: [10, 6], to: [-10, 6] },
]

/**
 * 젤다 꿈꾸는 섬 스타일 월드
 */
export default function World({ setCurrentRoom }) {
  return (
    <>
      {/* 떠있는 섬 지형 */}
      <Ground />

      {/* 방 배치 */}
      {roomsConfig.map((room) => (
        <Room
          key={room.id}
          {...room}
          onEnter={() => setCurrentRoom(room.id)}
        />
      ))}

      {/* 경로 */}
      {pathConfig.map((path, i) => (
        <Path key={i} from={path.from} to={path.to} />
      ))}

      {/* 나무 */}
      {treeConfig.map((tree, i) => (
        <Tree key={i} position={tree.position} variant={tree.variant} />
      ))}

      {/* 꽃 */}
      {flowerConfig.map((flower, i) => (
        <Flower key={i} position={flower.position} color={flower.color} />
      ))}

      {/* 버섯 */}
      {mushroomConfig.map((mushroom, i) => (
        <Mushroom key={i} position={mushroom.position} scale={mushroom.scale} />
      ))}

      {/* 바위 */}
      {rockConfig.map((rock, i) => (
        <Rock key={i} position={rock.position} scale={rock.scale} />
      ))}

      {/* 잔디 뭉치 */}
      {grassConfig.map((pos, i) => (
        <GrassTuft key={i} position={pos} />
      ))}

      {/* 구름 */}
      {cloudPositions.map((pos, i) => (
        <Cloud key={i} position={pos} />
      ))}
    </>
  )
}
