export const resumeData = {
  personal: {
    name: 'jshsakura',
    title: '프리랜서 개발자',
    tagline: '"훌륭한 목수는 보이지 않는 곳이라고 해서 썩은 나무를 덧대지 않는다."',
    github: 'https://github.com/jshsakura',
    location: 'Seoul, Korea',
  },

  about: {
    title: '긍정적인 사고로 협업을 주도하는 개발자입니다.',
    description: [
      'Python과 Java를 중심으로 개발을 하는 웹 개발자입니다. 협업과 원활한 커뮤니케이션을 강조하며, 항상 팀원들과의 긍정적인 관계를 가장 중요하게 생각합니다. 다양한 프로젝트에서의 경험을 통해 얻은 능력을 토대로, 팀원들과 함께 목표를 달성하는 데 기여하고 있습니다.',
      '제 개발 스타일은 해결책 중심이며, 문제를 빠르게 파악하고 효과적으로 대응하는 것을 중요하게 생각합니다. AI를 통해 해결책을 찾는 것을 꺼리지 않지만, 동시에 동료들과의 협업을 통해 더 나은 결과물을 만들기 위해 힘쓰고 있습니다.',
      '제 소통 스타일은 열린 마음과 존중을 기반으로 하며, 어려운 상황에서도 차분하게 해결 방안을 모색하는 재주가 있습니다. 부정적인 태도보다 긍정적으로 문제를 접근하며, 팀의 분위기를 즐겁게 유지하고자 노력합니다.',
    ],
  },

  skills: {
    frontend: {
      name: 'Frontend',
      items: ['React', 'Next.js', '넥사크로', '웹스퀘어'],
      color: '#61dafb',
    },
    backend: {
      name: 'Backend',
      items: ['Java Spring', 'SpringBoot', 'ASP.NET', 'Node.js', 'Python'],
      color: '#68a063',
    },
    mobile: {
      name: 'Mobile',
      items: ['Android (Java)', 'iOS (Swift)'],
      color: '#a4c639',
    },
    database: {
      name: 'Database',
      items: ['Oracle'],
      color: '#f80000',
    },
    etc: {
      name: '기타',
      items: ['API Gateway', 'SSO', 'REST API'],
      color: '#8b5cf6',
    },
  },

  experience: [
    {
      company: '프리랜서',
      period: '2020.07 ~ 현재',
      duration: '5년+',
      role: '프리랜서 개발자',
      projects: [
        {
          name: '서린상사 트레이딩 시스템',
          description: 'WMS, LME Python API 개발',
          tech: ['Python', 'API'],
        },
        {
          name: 'NC 소프트 CMS, HR 시스템',
          description: '넥사크로 → React 리뉴얼',
          tech: ['React', 'Java'],
        },
        {
          name: '스마일 게이트 재무포탈',
          description: '유지보수',
          tech: ['Java', 'Spring'],
        },
        {
          name: '스마일 게이트 총무 시스템',
          description: '신규 개발',
          tech: ['Java', 'Spring'],
        },
      ],
    },
    {
      company: 'C-node',
      period: '2014.10 ~ 2020.04',
      duration: '5년 7개월',
      role: '개발자',
      projects: [
        {
          name: '쌍용자동차 SPMS/SCMS',
          description: '고객관리 시스템 (ASP → Java 전환)',
          tech: ['Java', 'Spring'],
        },
        {
          name: '종로의료기 오뷰 앱',
          description: 'Android/iOS 앱 개발',
          tech: ['Android', 'iOS', 'Swift'],
        },
        {
          name: '누리미디어 DBPIA ONE',
          description: '논문 투고 시스템 고도화',
          tech: ['Java'],
        },
        {
          name: '대한건설협회 시공자 정보 서비스',
          description: 'SpringBoot 기반 개발',
          tech: ['SpringBoot'],
        },
        {
          name: '현대엔지니어링 HSE 안전관리 포털',
          description: '.NET 기반 개발',
          tech: ['.NET'],
        },
        {
          name: 'LS 트랙터 딜러 포털 SSO',
          description: 'SSO 시스템 개발',
          tech: ['Java', 'SSO'],
        },
        {
          name: '나이스디앤비 무역정보 포털',
          description: '무역정보 서비스 개발',
          tech: ['Java'],
        },
        {
          name: 'LS 전선 진단 포털 시스템',
          description: '포털 시스템 개발',
          tech: ['Java'],
        },
        {
          name: '삼천리 홈페이지 운영',
          description: '웹사이트 운영 및 유지보수',
          tech: ['Java'],
        },
      ],
    },
  ],

  totalExperience: '11년+',
};
