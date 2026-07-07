function yearsSinceStart() {
  const now = new Date()
  let years = now.getFullYear() - 2014
  if (now.getMonth() + 1 < 9) years--
  return years
}

export const personal = {
  name: 'Seunghyeon',
  nameKo: '승현',
  title: 'Developer',
  tagline: {
    ko: '"훌륭한 목수는 보이지 않는 곳이라고 해서 썩은 나무를 덧대지 않는다."',
    en: '"A great carpenter never patches rotten wood, even where no one would see it."',
  },
  bio: {
    ko: [
      `${yearsSinceStart()}년차, 여전히 무엇보다 소통을 중요시 생각하는 개발자입니다.`,
      'Java/Spring 백엔드를 주력으로 다루고 있으며 React 프론트엔드, Python API,',
      '모바일 앱(Android/iOS)까지 다양한 플랫폼의 프로젝트에 참여해왔습니다.',
      '',
      '쌍용자동차 고객관리 시스템 운영을 시작으로,',
      'NC소프트 HR 시스템 React 리뉴얼, 현대엔지니어링 안전관리 포탈,',
      '스마일게이트 재무·총무 시스템까지 다양한 도메인을 경험했습니다.',
      '',
      '2020년부터 프리랜서로 독립해 협업하고 있으며,',
      '각종 서버장비나 휴대기기, 리눅스에 관심이 많아 다양한 기기를 다뤄본 경험이 있고',
      '일부는 직접 개발해 사용하고 있습니다.',
      '',
      'Claude Code, Codex, Gemini, GLM 등 AI 도구를 꾸준히 활용하고 있습니다.',
    ],
    en: [
      `${yearsSinceStart()} years in, and still a developer who values communication above all else.`,
      'My core strength is Java/Spring backend development, complemented by experience across',
      'React frontends, Python APIs, and mobile apps (Android/iOS).',
      '',
      "Starting with Ssangyong Motor's customer management system, I've since worked across",
      "a wide range of domains — NCSOFT's HR system React renewal, Hyundai Engineering's",
      "safety management portal, and Smilegate's finance & general affairs systems.",
      '',
      "I've been working independently as a freelancer since 2020. I'm also into servers,",
      "mobile devices, and Linux, and have hands-on experience with a variety of hardware —",
      'some of which I build and run myself.',
      '',
      'I regularly work with AI tools such as Claude Code, Codex, Gemini, and GLM.',
    ],
  },
  github: 'https://github.com/jshsakura',
  email: 'support@opencourse.kr',
  location: 'Seoul, Korea',
}
