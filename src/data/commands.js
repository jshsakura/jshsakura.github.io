// Visible command definitions, used by Help and autocomplete (VISIBLE_COMMANDS
// in useTerminal.js is derived from c.cmd.split(' ')[0]). Command names stay
// English; descriptions are localized per language.
export const commands = [
  { cmd: 'help', desc: { ko: '사용 가능한 명령어 보기', en: 'Show available commands' } },
  { cmd: 'whoami', desc: { ko: '자기소개', en: 'About me' } },
  { cmd: 'skills', desc: { ko: '기술 스택 & 전문 분야', en: 'Tech stack & expertise' } },
  { cmd: 'career', desc: { ko: '경력 타임라인', en: 'Work experience timeline' } },
  { cmd: 'projects', desc: { ko: 'GitHub 공개 프로젝트 (별칭: portfolio)', en: 'Open-source projects from GitHub (alias: portfolio)' } },
  { cmd: 'contact', desc: { ko: '연락처', en: 'How to reach me' } },
  { cmd: 'neofetch', desc: { ko: '시스템 정보 (개발자 스타일)', en: 'System info (developer style)' } },
  { cmd: 'theme [name]', desc: { ko: '터미널 테마 변경 ("theme" 입력 시 전체 19개 테마 보기)', en: 'Change terminal theme (type "theme" to see all 19 themes)' } },
  { cmd: 'lang [ko|en]', desc: { ko: '언어 변경', en: 'Switch language / 언어 변경' } },
  { cmd: 'clear', desc: { ko: '터미널 지우기', en: 'Clear terminal' } },
  { cmd: 'github', desc: { ko: 'GitHub 프로필 열기', en: 'Open GitHub profile' } },
  { cmd: 'repo', desc: { ko: '이 사이트의 저장소 열기', en: "Open this site's repository" } },
  { cmd: 'history', desc: { ko: '명령어 기록 보기', en: 'Show command history' } },
  { cmd: 'date', desc: { ko: '현재 날짜 & 시간 보기', en: 'Show current date & time' } },
  { cmd: 'echo [text]', desc: { ko: '입력한 텍스트 출력', en: 'Print text to terminal' } },
]
