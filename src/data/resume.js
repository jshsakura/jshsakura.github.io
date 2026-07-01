export const resumeData = {
  personal: {
    name: 'Seunghyeon',
    title: 'Freelance Developer',
    tagline: '"A good craftsman never uses rotten wood, even in places that cannot be seen."',
    github: 'https://github.com/jshsakura',
    email: 'contact@example.com',
    location: 'Seoul, Korea',
  },

  skills: {
    frontend: {
      name: 'Frontend',
      items: ['React', 'Next.js', 'Nexacro', 'WebSquare'],
      color: '#6366f1',
      icon: '🎨',
    },
    backend: {
      name: 'Backend',
      items: ['Java Spring', 'SpringBoot', 'ASP.NET', 'Node.js', 'Python'],
      color: '#22c55e',
      icon: '⚙️',
    },
    mobile: {
      name: 'Mobile',
      items: ['Android (Java)', 'iOS (Swift)'],
      color: '#06b6d4',
      icon: '📱',
    },
    database: {
      name: 'Database',
      items: ['Oracle', 'MySQL', 'PostgreSQL'],
      color: '#f59e0b',
      icon: '🗄️',
    },
    etc: {
      name: 'Others',
      items: ['API Gateway', 'SSO', 'REST API', 'Git'],
      color: '#8b5cf6',
      icon: '🔧',
    },
  },

  experience: [
    {
      company: 'Freelancer',
      period: '2020.07 ~ Present',
      duration: '5+ years',
      role: 'Freelance Developer',
      projects: [
        {
          name: 'Seorin Trading System',
          description: 'WMS, LME Python API Development',
          tech: ['Python', 'API'],
        },
        {
          name: 'NC Soft CMS, HR System',
          description: 'Nexacro → React Renewal',
          tech: ['React', 'Java'],
        },
        {
          name: 'Smilegate Finance Portal',
          description: 'Maintenance & Support',
          tech: ['Java', 'Spring'],
        },
        {
          name: 'Smilegate General Affairs',
          description: 'New Development',
          tech: ['Java', 'Spring'],
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
          name: 'Ssangyong Motor SPMS/SCMS',
          description: 'Customer Management (ASP → Java)',
          tech: ['Java', 'Spring'],
        },
        {
          name: 'Jongro Medical O-View App',
          description: 'Android/iOS App Development',
          tech: ['Android', 'iOS', 'Swift'],
        },
        {
          name: 'Nurimedia DBPIA ONE',
          description: 'Paper Submission System',
          tech: ['Java'],
        },
        {
          name: 'Korea Construction Association',
          description: 'SpringBoot Development',
          tech: ['SpringBoot'],
        },
        {
          name: 'Hyundai E&C HSE Portal',
          description: '.NET Development',
          tech: ['.NET'],
        },
        {
          name: 'LS Tractor Dealer Portal SSO',
          description: 'SSO System Development',
          tech: ['Java', 'SSO'],
        },
      ],
    },
  ],

  totalExperience: '11+ years',
};

/**
 * 젤다 스타일 방 설정 (섬 중심 배치)
 */
export const roomsConfig = [
  {
    id: 'welcome',
    name: 'Welcome',
    position: [0, 0],
    color: '#C49A6C',
    accentColor: '#FFD93D',
    size: 5,
    description: 'Start here!',
  },
  {
    id: 'skills',
    name: 'Skills',
    position: [10, 6],
    color: '#C49A6C',
    accentColor: '#69F0AE',
    size: 6,
    description: 'My tech stack',
  },
  {
    id: 'experience',
    name: 'Experience',
    position: [-10, 6],
    color: '#C49A6C',
    accentColor: '#FFD93D',
    size: 6,
    description: 'Work history',
  },
  {
    id: 'contact',
    name: 'Contact',
    position: [0, -12],
    color: '#C49A6C',
    accentColor: '#A8D8FF',
    size: 5,
    description: 'Get in touch',
  },
];
