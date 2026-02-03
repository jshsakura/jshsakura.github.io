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
      color: '#1e66f5',
      icon: '🎨',
    },
    backend: {
      name: 'Backend',
      items: ['Java Spring', 'SpringBoot', 'ASP.NET', 'Node.js', 'Python'],
      color: '#40a02b',
      icon: '⚙️',
    },
    mobile: {
      name: 'Mobile',
      items: ['Android (Java)', 'iOS (Swift)'],
      color: '#179299',
      icon: '📱',
    },
    database: {
      name: 'Database',
      items: ['Oracle', 'MySQL', 'PostgreSQL'],
      color: '#d20f39',
      icon: '🗄️',
    },
    etc: {
      name: 'Others',
      items: ['API Gateway', 'SSO', 'REST API', 'Git'],
      color: '#8839ef',
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

// Catppuccin Latte colors for rooms
export const roomsConfig = [
  {
    id: 'welcome',
    name: 'Welcome',
    position: [0, 0],
    color: '#ccd0da', // surface0
    size: 6,
    description: 'Start here!',
  },
  {
    id: 'skills',
    name: 'Skills',
    position: [10, 0],
    color: '#bcc0cc', // surface1
    size: 8,
    description: 'My tech stack',
  },
  {
    id: 'experience',
    name: 'Experience',
    position: [0, -12],
    color: '#acb0be', // surface2
    size: 8,
    description: 'Work history',
  },
  {
    id: 'contact',
    name: 'Contact',
    position: [10, -12],
    color: '#9ca0b0', // overlay0
    size: 6,
    description: 'Get in touch',
  },
];
