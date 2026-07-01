/**
 * 젤다 꿈꾸는 섬 스타일 색상 팔레트
 * - 게임보이 컬러 느낌의 파스텔톤
 * - 부드럽고 따뜻한 색감
 */
export const theme = {
  // Primary - 파스텔 녹색
  primary: '#7EC850',
  primaryLight: '#A8E060',
  primaryDark: '#5EAA3C',

  // Accent - 따뜻한 황금빛
  accent: '#FFD93D',
  accentLight: '#FFE87C',
  accentDark: '#F5C000',

  // Secondary - 하늘색
  secondary: '#87CEEB',
  secondaryLight: '#B8E0F0',

  // Earth tones
  brown: '#C49A6C',
  brownLight: '#D4A574',
  brownDark: '#8B6B4A',

  // Status colors
  success: '#69F0AE',
  warning: '#FFD93D',
  error: '#FF6B6B',
  info: '#6ECFF6',

  // Neutrals
  white: '#FFFFFF',
  black: '#2D3436',

  // Soft grays
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#2D3436',
}

/**
 * 늑대 캐릭터 색상 (토이 느낌으로 조정)
 */
export const characterColors = {
  // 메인 털 색상 (부드러운 회청색)
  furMain: '#8094A8',
  furLight: '#A0B4C8',
  furDark: '#607080',

  // 배 부분 (밝은 색)
  furBelly: '#F0F4F8',

  // 눈
  eyes: '#4AADD6',
  eyesPupil: '#2D3436',
  eyesHighlight: '#FFFFFF',

  // 코
  nose: '#404040',

  // 귀 안쪽
  earInner: '#FFB8C8',

  // 이름표
  nameTag: '#FFD93D',
  nameOutline: '#5EAA3C',

  // 그림자
  shadow: '#000000',
}

/**
 * 젤다 스타일 환경 색상
 */
export const environmentColors = {
  // === 잔디/지형 ===
  grass: '#7EC850',
  grassLight: '#A8E060',
  grassDark: '#5EAA3C',
  grassTop: '#7EC850',
  grassMid: '#5EAA3C',
  ground: '#5EAA3C',
  groundAccent: '#3E8A2C',

  // === 흙/절벽 (섬 레이어) ===
  dirtLight: '#D4A574',
  dirtMid: '#B8956C',
  dirtDark: '#8B6B4A',
  dirtExposed: '#C49660',
  cliffFace: '#706858',

  // === 바위/절벽 ===
  rock: '#A8A090',
  rockLight: '#C0B8A8',
  rockMid: '#787068',
  rockDark: '#585048',
  rockBottom: '#706858',

  // === 경로 ===
  path: '#D4A574',
  pathAccent: '#B8956C',
  pathStone: '#C0B8A8',

  // === 하늘 ===
  skyTop: '#87CEEB',
  skyBottom: '#C8E8F8',
  fog: '#C8E8F8',

  // === 물/바다 ===
  water: '#6ECFF6',
  waterLight: '#A8E4FF',
  waterMid: '#4AADD6',
  waterDark: '#2A8DB6',
  waterFoam: '#E0F4FF',

  // === 나무 ===
  treeTrunk: '#9B7653',
  treeTrunkLight: '#B8956C',
  treeTrunkDark: '#7B5633',
  treeLeaves: '#68C040',
  treeLeavesLight: '#8BD860',
  treeLeavesLighter: '#A8E060',
  treeLeavesLightAlt: '#8BD860',
  treeLeavesLightest: '#B8F070',
  treeLeavesMiddle: '#68C040',
  treeLeavesMiddleAlt: '#58B030',
  treeLeavesMiddleDark: '#48A020',
  treeLeavesLightMiddle: '#78D050',
  treeLeavesLightMiddleAlt: '#68C040',
  treeLeavesLightDark: '#58B030',
  treeLeavesLighterMiddle: '#98E870',
  treeLeavesLighterDark: '#88D860',
  treeLeavesLightestMiddle: '#A8F080',
  treeLeavesLightestDark: '#98E070',
  treeLeavesLightestDarkAlt: '#88D060',
  treeLeavesLightestDarkMiddle: '#78C050',
  treeLeavesMiddle2: '#58B030',
  treeLeavesMiddle3: '#48A020',
  treeLeavesMiddle4: '#388010',
  treeLeavesMiddle5: '#287000',
  treeLeavesBottom: '#48A020',
  treeLeavesBottomAlt: '#388010',
  treeLeavesBottomDark: '#287000',
  treeLeavesBottomDarkAlt: '#206000',
  treeLeavesBottomDarkMiddle: '#185000',
  treeLeavesBottomDarkMiddleAlt: '#104000',
  treeLeavesBottomDarkMiddleDark: '#083000',
  treeLeavesDark: '#48A020',

  // === 구름 ===
  cloud: '#FFFFFF',
  cloudWhite: '#FFFFFF',
  cloudShadow: '#E8E8F0',

  // === 꽃 ===
  flowerStem: '#5EAA3C',
  flowerPink: '#FFB8D0',
  flowerYellow: '#FFE87C',
  flowerBlue: '#A8D8FF',
  flowerWhite: '#FFF8F0',
  flowerCenter: '#FFD700',

  // === 버섯 ===
  mushroomCap: '#FF6B6B',
  mushroomCapSpots: '#FFFACD',
  mushroomStem: '#FFF8E0',

  // === 방/건물 ===
  buildingWood: '#C49A6C',
  buildingRoof: '#8B4513',
  buildingAccent: '#FFD93D',

  // === 효과 ===
  glowYellow: '#FFEE58',
  glowGreen: '#69F0AE',
}

/**
 * UI 색상 설정 (젤다 스타일)
 */
export const uiColors = {
  background: 'rgba(45, 52, 54, 0.95)',
  backgroundLight: 'rgba(94, 170, 60, 0.9)',
  border: 'rgba(126, 200, 80, 0.3)',
  borderLight: 'rgba(168, 224, 96, 0.2)',
  text: '#FFF8E0',
  textMuted: '#A8E060',
  textAccent: '#FFD93D',
  glassBg: 'rgba(45, 52, 54, 0.85)',
  glassLight: 'rgba(94, 170, 60, 0.6)',
}
