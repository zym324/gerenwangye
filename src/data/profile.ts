export interface Social {
  label: string;
  url: string;
  icon: 'github' | 'twitter' | 'linkedin' | 'weibo' | 'email';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  current?: boolean;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  avatar: string;
  bio: string;
  email: string;
  location: string;
  resumeUrl?: string;
  socials: Social[];
  experiences: Experience[];
  education: Education[];
}

export const profile: Profile = {
  name: '张三',
  title: '全栈工程师',
  tagline: '热爱代码与设计，用技术创造价值',
  avatar: '/images/avatar.png',
  bio: '拥有 5 年全栈开发经验，专注于构建高性能 Web 应用。热衷于开源社区，分享技术见解。相信好的产品源于对细节的极致追求。',
  email: 'zhangsan@example.com',
  location: '北京',
  socials: [
    { label: 'GitHub', url: 'https://github.com/zhangsan', icon: 'github' },
    { label: 'Twitter', url: 'https://twitter.com/zhangsan', icon: 'twitter' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/zhangsan', icon: 'linkedin' },
    { label: '微博', url: 'https://weibo.com/zhangsan', icon: 'weibo' },
    { label: '邮箱', url: 'mailto:zhangsan@example.com', icon: 'email' },
  ],
  experiences: [
    {
      company: '某科技有限公司',
      role: '高级前端工程师',
      period: '2023 - 至今',
      description: '负责核心产品前端架构设计与性能优化，主导微前端方案落地。',
      current: true,
    },
    {
      company: '某互联网公司',
      role: '全栈工程师',
      period: '2021 - 2023',
      description: '独立负责多个 B 端项目全栈开发，从需求到上线全流程把控。',
    },
    {
      company: '某创业公司',
      role: '前端工程师',
      period: '2019 - 2021',
      description: '参与 0→1 产品搭建，建立前端工程化体系。',
    },
  ],
  education: [
    {
      school: '某大学',
      degree: '计算机科学 学士',
      period: '2015 - 2019',
    },
  ],
};
