export interface Project {
  slug: string;
  title: string;
  description: string;
  cover: string;
  tags: string[];
  year: number;
  featured?: boolean;
  links?: { demo?: string; repo?: string };
  details?: string;
}

export const projects: Project[] = [
  {
    slug: 'smart-dashboard',
    title: '智能数据看板',
    description: '实时数据可视化平台，支持自定义图表、告警与团队协作。',
    cover: '/images/projects/dashboard.png',
    tags: ['React', 'Node.js', 'WebSocket', 'D3.js'],
    year: 2024,
    featured: true,
    links: { demo: '#', repo: '#' },
    details:
      '## 项目背景\n\n为团队打造一套实时数据看板，替代原有 Excel 报表流程。\n\n## 技术方案\n\n- **前端**：React + D3.js 自定义图表组件\n- **实时通信**：WebSocket 推送，断线自动重连\n- **后端**：Node.js + Redis 缓存热点数据\n\n## 个人职责\n\n- 主导前端架构设计与性能优化\n- 实现图表拖拽布局与数据绑定\n- 搭建 WebSocket 长连接与心跳保活机制',
  },
  {
    slug: 'ai-blog',
    title: 'AI 写作助手',
    description: '基于 LLM 的博客写作助手，支持续写、改写、摘要生成。',
    cover: '/images/projects/ai-blog.png',
    tags: ['Next.js', 'OpenAI', 'Markdown'],
    year: 2024,
    featured: true,
    links: { demo: '#', repo: '#' },
    details:
      '## 项目背景\n\n提升博客写作效率，集成 AI 能力。\n\n## 技术亮点\n\n- 流式输出（SSE）打字机效果\n- 上下文窗口管理\n- 多模型切换',
  },
  {
    slug: 'mini-shop',
    title: '迷你电商系统',
    description: '完整的前后端分离电商 demo，含购物车、订单、支付模拟。',
    cover: '/images/projects/shop.png',
    tags: ['Vue', 'Express', 'PostgreSQL'],
    year: 2023,
    links: { repo: '#' },
    details: '## 简介\n\n个人练习项目，涵盖电商核心流程。',
  },
  {
    slug: 'md-notes',
    title: 'Markdown 笔记',
    description: '开源轻量笔记工具，支持双向链接与全文搜索。',
    cover: '/images/projects/notes.png',
    tags: ['TypeScript', 'IndexedDB'],
    year: 2023,
    links: { repo: '#' },
    details: '## 简介\n\n本地优先的 Markdown 笔记应用。',
  },
  {
    slug: 'weather-app',
    title: '天气小工具',
    description: '简洁天气预报 PWA，离线可用。',
    cover: '/images/projects/weather.png',
    tags: ['PWA', 'API', 'CSS'],
    year: 2022,
    links: { demo: '#' },
    details: '## 简介\n\n支持服务 Worker 的离线天气应用。',
  },
  {
    slug: 'cli-helper',
    title: 'CLI 脚手架',
    description: '命令行项目脚手架工具，一键生成工程模板。',
    cover: '/images/projects/cli.png',
    tags: ['Node.js', 'CLI', 'npm'],
    year: 2022,
    links: { repo: '#' },
    details: '## 简介\n\n通过 `create-xxx` 快速初始化项目。',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
