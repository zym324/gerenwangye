export interface Skill {
  name: string;
  level: 'expert' | 'proficient' | 'familiar';
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: '前端',
    skills: [
      { name: 'React / Next.js', level: 'expert' },
      { name: 'TypeScript', level: 'expert' },
      { name: 'Tailwind CSS', level: 'expert' },
      { name: 'Vue', level: 'proficient' },
      { name: 'CSS / SCSS', level: 'expert' },
      { name: 'Webpack / Vite', level: 'proficient' },
    ],
  },
  {
    category: '后端',
    skills: [
      { name: 'Node.js', level: 'expert' },
      { name: 'Python', level: 'proficient' },
      { name: 'GraphQL', level: 'proficient' },
      { name: 'REST API 设计', level: 'expert' },
      { name: 'PostgreSQL', level: 'proficient' },
      { name: 'Redis', level: 'familiar' },
    ],
  },
  {
    category: '工具 & 运维',
    skills: [
      { name: 'Git / GitHub', level: 'expert' },
      { name: 'Docker', level: 'proficient' },
      { name: 'CI/CD', level: 'proficient' },
      { name: 'Linux', level: 'proficient' },
      { name: 'Nginx', level: 'familiar' },
    ],
  },
  {
    category: '设计',
    skills: [
      { name: 'Figma', level: 'proficient' },
      { name: 'UI/UX 设计', level: 'familiar' },
      { name: '动效设计', level: 'familiar' },
    ],
  },
];
