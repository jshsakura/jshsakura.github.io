// Career project names/descriptions are { ko, en } pairs; tech stack labels
// (e.g. 'React', 'Spring') are proper nouns and stay language-neutral.
export const experience = [
  {
    company: 'Freelancer',
    period: '2020.07 ~ Present',
    duration: '5+ years',
    role: 'Freelance Developer',
    projects: [
      {
        name: {
          ko: 'Yokogawa 차세대 비즈니스 매니지먼트 솔루션 개발',
          en: 'Yokogawa Next-Generation Business Management Solution',
        },
        period: '2026.03 ~ Present',
        description: {
          ko: 'ServiceNow App Engine Studio 기반 디지털 워크플로우 애플리케이션 개발',
          en: 'Building digital workflow applications on ServiceNow App Engine Studio',
        },
        tech: ['ServiceNow', 'App Engine'],
      },
      {
        name: {
          ko: '서린상사 트레이딩 시스템 개발 및 고도화',
          en: 'Seorin Trading Co. Trading System Development & Enhancement',
        },
        period: '2020.07 ~ 2021.12',
        description: {
          ko: 'WMS 시스템 고도화, LME 레피니티브 Python API 연동 및 선적입출고 관리 기능 개발',
          en: 'Enhanced the WMS system, integrated LME Refinitiv data via a Python API, and built shipment inbound/outbound management features',
        },
        tech: ['Python', 'API', 'WMS'],
      },
      {
        name: {
          ko: 'NC소프트 CMS, HR 시스템 고도화',
          en: 'NCSOFT CMS & HR System Enhancement',
        },
        period: '2022.01 ~ 2024.01',
        description: {
          ko: 'CMS(Charge Code Management) 시스템 개발, 넥사크로 기반 근태(HR) 시스템 React 리뉴얼 작업 투입',
          en: 'Developed the CMS (Charge Code Management) system and contributed to the React renewal of the Nexacro-based HR attendance system',
        },
        tech: ['React', 'Java', 'Spring', 'Nexacro'],
      },
      {
        name: {
          ko: '스마일게이트 재무포탈 유지보수',
          en: 'Smilegate Finance Portal Maintenance',
        },
        period: '2024.04 ~ 2024.12',
        description: {
          ko: '재무 포탈 시스템 운영 및 유지보수 담당',
          en: 'Responsible for operating and maintaining the finance portal system',
        },
        tech: ['Java', 'Spring', 'Oracle', 'PostgreSQL'],
      },
      {
        name: {
          ko: '스마일게이트 총무 시스템 구축',
          en: 'Smilegate General Affairs System Development',
        },
        period: '2025.01 ~ 2025.11',
        description: {
          ko: '총무 시스템 신규 구축, 복지포인트 관리 및 카카오 택시 API 연동 등 핵심 기능 개발',
          en: 'Built a new general affairs system from the ground up, developing core features including welfare points management and Kakao Taxi API integration',
        },
        tech: ['Java', 'Spring', 'React'],
      },
      {
        name: {
          ko: '서린정보기술 StayByMe ERP 고도화',
          en: 'Seorin Information Technology StayByMe ERP Enhancement',
        },
        period: '2025.12 ~ 2026.01',
        description: {
          ko: 'Maven 기반 Legacy 프로젝트의 마이너 업데이트 및 반응형 퍼블리싱, 대규모 코드 리팩토링 수행',
          en: 'Performed minor updates, responsive publishing, and large-scale code refactoring on a Maven-based legacy project',
        },
        tech: ['Java', 'Spring', 'Maven'],
      },
    ],
  },
  {
    company: 'C-node',
    period: '2014.10 ~ 2020.04',
    duration: '5y 7m',
    role: 'Developer',
    projects: [
      {
        name: {
          ko: '쌍용자동차 고객관리·고객센터 시스템 운영',
          en: 'SsangYong Motor Customer Management & Customer Center System Operations',
        },
        period: '2014.09 ~ 2017.07',
        description: {
          ko: 'ASP Classic 기반 SPMS 고객관리 시스템 운영 및 Java 전환 작업 투입. 2년차부터 SCMS 고객센터 시스템도 함께 담당',
          en: 'Operated the ASP Classic-based SPMS customer management system and worked on its Java migration; also took on the SCMS customer center system from year two onward',
        },
        tech: ['ASP', 'Java', 'Spring'],
      },
      {
        name: {
          ko: '종로의료기 오뷰 배란측정기 앱 개발',
          en: 'Jongno Medical O-View Ovulation Monitor App Development',
        },
        period: '2017.08 ~ 2018.02',
        description: {
          ko: 'C기반 판독 라이브러리를 연동하여 Android(Java)와 iOS(Swift) 앱을 각각 개발, 양대 스토어 배포까지 수행',
          en: 'Developed separate Android (Java) and iOS (Swift) apps integrating a C-based reading library, and handled release to both app stores',
        },
        tech: ['Android', 'iOS', 'Swift', 'Java'],
      },
      {
        name: {
          ko: '누리미디어 DBPIA ONE 논문 투고 시스템 고도화',
          en: 'Nurimedia DBPIA ONE Manuscript Submission System Enhancement',
        },
        period: '2018.01 ~ 2018.03',
        description: {
          ko: 'Java Spring 기반 논문 심사 기능 추가, 심사서 양식 다양화 및 비용/차수별 심사결과 수정 기능 개발',
          en: 'Added peer-review features to the Java Spring-based system, diversified review form templates, and built editing features for review results by cost/round',
        },
        tech: ['Java', 'Spring'],
      },
      {
        name: {
          ko: '대한건축사협회 시공자 정보 제공 서비스 개발',
          en: 'Korean Institute of Registered Architects Contractor Information Service',
        },
        period: '2018.04 ~ 2018.08',
        description: {
          ko: 'Java SpringBoot 기반 건축정보 시스템 개발. 공통 프레임워크 구축부터 인프라까지 전반 투입',
          en: 'Developed a Java SpringBoot-based construction information system, contributing across the board from the common framework to infrastructure',
        },
        tech: ['SpringBoot', 'Oracle'],
      },
      {
        name: {
          ko: '현대엔지니어링 HSE 안전관리포탈 고도화',
          en: 'Hyundai Engineering HSE Safety Management Portal Enhancement',
        },
        period: '2018.08 ~ 2019.02',
        description: {
          ko: 'ASP.NET 기반 시스템의 UI 프레임워크(DevExpress) 버전 업 및 디자인 변경, 모바일 앱 연동 API 개발',
          en: 'Upgraded the DevExpress UI framework version and redesigned the ASP.NET-based system, and developed APIs for mobile app integration',
        },
        tech: ['ASP.NET', 'DevExpress', 'API'],
      },
      {
        name: {
          ko: '누리미디어 DBPIA ONE 기능개선',
          en: 'Nurimedia DBPIA ONE Feature Improvements',
        },
        period: '2018.10 ~ 2019.02',
        description: {
          ko: '비회원 심사위원 관리, 증명서 발급, Remind 메일, 편집위원장 결재 기능 등 추가 개발',
          en: 'Added features for non-member reviewer management, certificate issuance, reminder emails, and editor-in-chief approval workflows',
        },
        tech: ['Java', 'Spring'],
      },
      {
        name: {
          ko: 'LS트랙터 딜러 포탈 SSO 개발',
          en: 'LS Tractor Dealer Portal SSO Development',
        },
        period: '2019.03 ~ 2019.03',
        description: {
          ko: '해외 딜러 주문시스템의 SSO 통합인증 기능 개발',
          en: 'Developed SSO unified authentication for the overseas dealer order system',
        },
        tech: ['Java', 'SSO', 'Spring'],
      },
      {
        name: {
          ko: '나이스디앤비 무역정보 포털 개발',
          en: 'NICE D&B Trade Information Portal Development',
        },
        period: '2019.04 ~ 2019.09',
        description: {
          ko: '웹스퀘어4 기반 UI, Java Spring + Oracle 백엔드 공통 구현 및 D&B DUNS 연동 개발',
          en: 'Implemented a WebSquare 4 UI with a common Java Spring + Oracle backend, and integrated D&B DUNS lookup',
        },
        tech: ['Java', 'Spring', 'Oracle', 'WebSquare'],
      },
      {
        name: {
          ko: 'LS전선 진단포털 DPS 개발',
          en: 'LS Cable & System Diagnostics Portal (DPS) Development',
        },
        period: '2019.10 ~ 2020.02',
        description: {
          ko: '진단포털 시스템 구축 및 카탈로그 관리용 모바일 앱 API 개발',
          en: 'Built the diagnostics portal system and developed mobile app APIs for catalog management',
        },
        tech: ['Java', 'Spring', 'API'],
      },
      {
        name: {
          ko: '삼천리 홈페이지 운영·유지보수',
          en: 'Samchully Website Operations & Maintenance',
        },
        period: '2020.02 ~ 2020.04',
        description: {
          ko: '삼천리 홈페이지 운영 및 윤리경영, 이메일 제보 기능 개발',
          en: 'Operated the Samchully corporate website and developed ethics management and email reporting features',
        },
        tech: ['Java', 'Spring'],
      },
    ],
  },
]

export const totalExperience = '11+ years'
