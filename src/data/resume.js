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
      color: '#61dafb',
      icon: '🎨',
    },
    backend: {
      name: 'Backend',
      items: ['Java Spring', 'SpringBoot', 'ASP.NET', 'Node.js', 'Python'],
      color: '#68a063',
      icon: '⚙️',
    },
    mobile: {
      name: 'Mobile',
      items: ['Android (Java)', 'iOS (Swift)'],
      color: '#a4c639',
      icon: '📱',
    },
    database: {
      name: 'Database',
      items: ['Oracle', 'MySQL', 'PostgreSQL'],
      color: '#f80000',
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

export const roomsConfig = [
  {
    id: 'welcome',
    name: 'Welcome',
    position: [0, 0],
    color: '#a8e6cf',
    size: 6,
    description: 'Start here!',
  },
  {
    id: 'skills',
    name: 'Skills',
    position: [10, 0],
    color: '#dcedc1',
    size: 8,
    description: 'My tech stack',
  },
  {
    id: 'experience',
    name: 'Experience',
    position: [0, -12],
    color: '#ffd3b6',
    size: 8,
    description: 'Work history',
  },
  {
    id: 'contact',
    name: 'Contact',
    position: [10, -12],
    color: '#ffaaa5',
    size: 6,
    description: 'Get in touch',
  },
];
