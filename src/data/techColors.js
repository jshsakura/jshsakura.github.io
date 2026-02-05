const techColors = {
  'Java': '#f89820',
  'Spring': '#6db33f',
  'SpringBoot': '#6db33f',
  'React': '#61dafb',
  'Python': '#3776ab',
  'Oracle': '#f80000',
  'MySQL': '#4479a1',
  'PostgreSQL': '#336791',
  'ASP': '#512bd4',
  'ASP.NET': '#512bd4',
  'Android': '#3ddc84',
  'iOS': '#147efb',
  'Swift': '#fa7343',
  'Node.js': '#339933',
  'Docker': '#2496ed',
  'API': '#ff6c37',
  'SSO': '#a78bfa',
  'WMS': '#f59e0b',
  'Nexacro': '#0ea5e9',
  'WebSquare': '#8b5cf6',
  'DevExpress': '#ff7200',
  'CI/CD': '#e6b450',
  'Git': '#f05032',
  'REST API': '#ff6c37',
}

export function getTechColor(tech) {
  return techColors[tech] || null
}
