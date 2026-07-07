// UI copy that isn't part of the resume data itself (labels, hints, form text).
// Keyed by language, then by feature area.
export const uiStrings = {
  ko: {
    boot: {
      helpHint: "'help'를 입력해 사용 가능한 명령어를 확인하세요. 아래 단축키를 클릭하거나 바로 입력을 시작해보세요.",
    },
    help: {
      title: '사용 가능한 명령어:',
      tip: 'Tip: Tab으로 자동완성, 방향키로 기록 탐색, Ctrl+L로 화면 지우기',
    },
    portfolio: {
      // '{user}' is replaced with a linked <a> element by the component.
      introTemplate: 'GitHub @{user} 의 공개 프로젝트입니다.',
      loading: 'GitHub에서 저장소를 불러오는 중...',
      error: '저장소를 불러오지 못했습니다.',
      viewOnGithub: 'GitHub에서 보기',
      empty: '공개 저장소가 없습니다.',
      active: '활발히 개발 중',
      popular: '인기 프로젝트',
    },
    contact: {
      title: '연락하기',
      github: 'GitHub',
      blog: '블로그',
      email: '이메일',
      location: '위치',
      formTitle: '메시지 보내기:',
      namePlaceholder: '이름',
      emailPlaceholder: '이메일',
      messagePlaceholder: '어떤 이야기를 나누고 싶으신가요?',
      validation: '모든 항목을 입력해 주세요.',
      sendError: '전송에 실패했습니다. 위의 이메일로 다시 시도해 주세요.',
      sending: '전송 중...',
      sendMessage: '메시지 보내기',
      sentTitle: '메시지가 전송되었습니다!',
      sentBody: '연락 주셔서 감사합니다. 곧 답변 드리겠습니다.',
      sendAnother: '다시 보내기',
    },
    skills: {
      title: '기술 스택 & 전문 분야',
    },
    career: {
      title: (years) => `커리어 타임라인 (${years})`,
      freelancerLabel: '프로젝트',
    },
    lang: {
      current: (lang) => `현재 언어: ${lang}`,
      available: '사용 가능한 언어: ko, en',
      usage: '사용법: lang [ko|en]',
      switched: (lang) => `언어가 ${lang === 'ko' ? '한국어' : '영어'}로 변경되었습니다.`,
      invalid: (arg) => `알 수 없는 언어입니다: '${arg}'. 사용 가능한 언어: ko, en`,
    },
  },
  en: {
    boot: {
      helpHint: "Type 'help' for available commands. Click the shortcuts below or just start typing.",
    },
    help: {
      title: 'Available Commands:',
      tip: 'Tip: Use Tab for autocomplete, Arrow keys for history, Ctrl+L to clear',
    },
    portfolio: {
      // '{user}' is replaced with a linked <a> element by the component.
      introTemplate: 'Public projects from GitHub @{user}.',
      loading: 'Fetching repositories from GitHub...',
      error: 'Failed to load repositories.',
      viewOnGithub: 'View on GitHub',
      empty: 'No public repositories found.',
      active: 'Actively Developing',
      popular: 'Popular',
    },
    contact: {
      title: 'Get in Touch',
      github: 'GitHub',
      blog: 'Blog',
      email: 'Email',
      location: 'Location',
      formTitle: 'Send me a message:',
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
      messagePlaceholder: 'What would you like to discuss?',
      validation: 'All fields are required.',
      sendError: 'Failed to send. Please try again or use the email above.',
      sending: 'Sending...',
      sendMessage: 'Send Message',
      sentTitle: 'Message sent!',
      sentBody: "Thanks for reaching out. I'll get back to you soon.",
      sendAnother: 'Send another',
    },
    skills: {
      title: 'Tech Stack & Expertise',
    },
    career: {
      title: (years) => `Career Timeline (${years})`,
      freelancerLabel: 'Projects',
    },
    lang: {
      current: (lang) => `Current language: ${lang}`,
      available: 'Available languages: ko, en',
      usage: 'Usage: lang [ko|en]',
      switched: (lang) => `Language switched to ${lang === 'ko' ? 'Korean' : 'English'}.`,
      invalid: (arg) => `Unknown language: '${arg}'. Available: ko, en`,
    },
  },
}
