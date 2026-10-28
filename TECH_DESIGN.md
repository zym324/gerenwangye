# 技术设计文档（Tech Design）

> 本文档是 AI 代理开发时的权威技术参考。所有技术决策以本文档为准；
> 代码风格与开发规范见 `AGENTS.md`。

---

## 1. 技术栈选择

| 层 | 选型 | 理由 |
|---|---|---|
| 前端框架 | **React 18**（函数组件 + Hooks） | 生态成熟，组件化清晰 |
| 构建工具 | **Vite 5** | 极速冷启动（ESM 原生），HMR 毫秒级，`import.meta.glob` 天然适配 Markdown 博客 |
| 语言 | **TypeScript 5**（strict mode） | 类型安全，减少运行时错误 |
| 样式 | **Tailwind CSS 3** + CSS Variables | 原子化开发，Design Token 集中管理，主题可配置 |
| 路由 | **react-router-dom 6**（BrowserRouter） | SPA 客户端路由，`/blog/:slug` `/projects/:slug` 详情页 |
| 星空背景 | **Canvas 自绘**（~170 行，零依赖） | 性能可控，视差分层，`prefers-reduced-motion` 适配 |
| 博客渲染 | **marked** + **gray-matter** | Markdown 正文渲染 + frontmatter 解析，`import.meta.glob` 构建时扫描 |
| 动效 | **CSS transition + Intersection Observer** | 无额外依赖，性能好 |
| 后端 | **无**（纯静态 SPA） | 内容以 TS 对象 / Markdown 文件管理，无需服务端 |
| 数据库 | **无** | 个人展示网站无动态数据需求 |
| 联系表单 | **Formspree / 自建 API**（`VITE_FORM_ENDPOINT`） | 零后端依赖，通过环境变量配置提交地址 |
| 字体 | CSS `@font-face` 自托管 + 系统字体栈 fallback | 零外链，离线可用 |
| 部署 | **静态文件**（`dist/`）→ Vercel / Netlify / GitHub Pages / Cloudflare Pages | 零运维，免费额度足够 |

### 环境变量

```env
# .env.local（gitignore）
VITE_FORM_ENDPOINT=https://formspree.io/xxxxx   # 联系表单提交地址（可选）
```

---

## 2. 项目结构

```
gerenwangye/
├── index.html                    # Vite 入口 HTML（#root 挂载点）
├── vite.config.ts               # Vite 配置（@ 别名、端口 3000）
├── tailwind.config.ts           # Tailwind 设计系统（颜色 / 圆角 / 断点 / 动效）
├── postcss.config.mjs           # PostCSS（Tailwind + Autoprefixer）
├── tsconfig.json                # TypeScript（ES2020 / bundler / react-jsx）
├── .eslintrc.json               # ESLint（TS + React Hooks）
├── .env.local                   # 环境变量（gitignore）
│
├── content/
│   └── posts/                   # 博客文章（Markdown，import.meta.glob 扫描）
│       ├── hello-world.md
│       └── nextjs-app-router.md
│
├── public/
│   └── images/                  # 静态资源（头像、项目封面等）
│
├── src/
│   ├── main.tsx                 # React 入口（ReactDOM.createRoot）
│   ├── App.tsx                  # BrowserRouter + 路由声明 + 全局布局
│   ├── index.css                # Tailwind 指令 + CSS Variables + Markdown 样式
│   ├── vite-env.d.ts            # Vite 类型声明（import.meta.env）
│   │
│   ├── pages/                   # 页面路由组件
│   │   ├── HomePage.tsx         # 首页（Hero + About + Skills + Projects + Blog + Contact）
│   │   ├── BlogPostPage.tsx     # 博客详情（Markdown 渲染 + TOC）
│   │   ├── ProjectDetailPage.tsx# 项目详情
│   │   └── NotFoundPage.tsx     # 404
│   │
│   ├── components/              # 功能组件（每个组件一个文件）
│   │   ├── Starfield.tsx        # Canvas 星空背景（视差 + 减动效 + 暂停）
│   │   ├── Navbar.tsx           # 吸顶毛玻璃导航 + 移动端汉堡菜单
│   │   ├── Footer.tsx           # 页脚（社交图标 + 版权）
│   │   ├── Hero.tsx             # 首屏（头像 + 姓名 + CTA）
│   │   ├── About.tsx            # 个人介绍 + 经历时间线 + 教育背景
│   │   ├── Skills.tsx           # 技能分组展示（标签 + 熟练度）
│   │   ├── ProjectCard.tsx      # 项目卡片（封面 + 描述 + 技术标签）
│   │   ├── Projects.tsx         # 项目网格
│   │   ├── BlogCard.tsx         # 博客卡片
│   │   ├── BlogList.tsx         # 博客列表
│   │   ├── Contact.tsx          # 联系模块（邮箱复制 + 社交 + 表单）
│   │   ├── SectionTitle.tsx     # 通用区块标题
│   │   └── SocialIcon.tsx       # 社交图标（SVG）
│   │
│   ├── data/                    # 纯 TypeScript 数据对象（无运行时 I/O）
│   │   ├── profile.ts           # 个人信息（姓名、职位、简介、经历、社交）
│   │   ├── skills.ts            # 技能分组数据
│   │   └── projects.ts          # 项目数据 + getProjectBySlug()
│   │
│   ├── lib/                     # 工具函数
│   │   ├── posts.ts             # import.meta.glob 扫描 + gray-matter 解析
│   │   ├── markdown.ts          # marked 渲染 + h2/h3 自动 id（TOC）
│   │   └── utils.ts             # slugify 等通用工具
│   │
│   └── types/                   # 模块类型声明
│       └── gray-matter.d.ts
│
├── TECH_DESIGN.md               # 本文件
├── AGENTS.md                    # AI 开发规范
└── README.md
```

---

## 3. 数据模型

### 3.1 个人信息（`src/data/profile.ts`）

```ts
interface Social {
  label: string;
  url: string;
  icon: 'github' | 'twitter' | 'linkedin' | 'weibo' | 'email';
}

interface Experience {
  company: string;
  role: string;
  period: string;           // "2022 – 2024"
  description: string;
  current?: boolean;
}

interface Education {
  school: string;
  degree: string;
  period: string;
}

interface Profile {
  name: string;
  title: string;           // "全栈工程师 & 设计爱好者"
  tagline: string;         // 一句话介绍
  avatar: string;          // /images/avatar.png
  bio: string;             // 200 字以内
  email: string;
  location: string;
  resumeUrl?: string;
  socials: Social[];
  experiences: Experience[];
  education: Education[];
}
```

### 3.2 技能（`src/data/skills.ts`）

```ts
interface Skill {
  name: string;
  level: 'expert' | 'proficient' | 'familiar';
}

interface SkillGroup {
  category: string;        // "前端" / "后端" / "工具" / "设计"
  skills: Skill[];
}
```

### 3.3 项目（`src/data/projects.ts`）

```ts
interface Project {
  slug: string;
  title: string;
  description: string;     // 一句话
  cover?: string;          // /images/projects/xxx.png（可选）
  tags: string[];          // ["React", "Node.js"]
  year: number;
  featured?: boolean;
  links?: { demo?: string; repo?: string };
  details?: string;        // Markdown 正文，用于详情页渲染
}
```

辅助函数：`getProjectBySlug(slug: string): Project | undefined`

### 3.4 博客（`content/posts/*.md`）

Frontmatter 格式：

```yaml
---
title: 文章标题
date: 2024-01-15
description: 摘要
tags: [TypeScript, 工程化]
cover: /images/posts/xxx.png   # 可选
---
Markdown 正文…
```

运行时数据模型（`src/lib/posts.ts`）：

```ts
interface PostMeta {
  slug: string;
  title: string;
  date: string;             // ISO 日期
  description: string;
  tags: string[];
  cover?: string;
  content: string;         // Markdown 原文
  readingTime: number;     // 分钟（words / 200）
}
```

辅助函数：
- `getAllPosts(): Promise<PostMeta[]>` — 获取全部（按日期降序）
- `getPostBySlug(slug): Promise<PostMeta | null>` — 单篇
- `getPostSlugsSync(): string[]` — 同步获取所有 slug
- `formatDate(dateStr): string` — 格式化显示

---

## 4. 关键技术点

### 4.1 星空 Canvas（`Starfield.tsx`）

| 要点 | 实现 |
|---|---|
| 视差分层 | 3 层（远/中/近），不同 `drift` 速度 + 半径，滚动时按层偏移 |
| 闪烁 | 正弦函数 `sin(twinkle)` 控制透明度，每帧 `twinkle += 0.012` |
| DPR cap | `Math.min(devicePixelRatio, 2)`，避免 4K 屏重绘开销 |
| 移动端降粒子 | `width < 768` → 120 颗（桌面 300 颗），帧率 ≥ 50fps |
| 暂停 | `document.visibilityState === 'hidden'` 时 `cancelAnimationFrame` |
| 减动效 | 监听 `matchMedia('(prefers-reduced-motion: reduce)')`，命中时静态绘制一次 |
| z-index | `position: fixed; z-index: -1`，不阻断交互 |
| 对比度 | 星星最大亮度 `rgba(255,255,255, 0.9)`，文字对比度 ≥ 4.5:1（AA） |
| 帧间归一化 | `dt = (ts - lastTs) / 16.67`，不同刷新率下动画速度一致 |

### 4.2 响应式布局

| 断点 | 列数 | Tailwind 类 |
|---|---|---|
| `< 640px` | 1 列 | 默认 |
| `640–1024px` | 2 列 | `sm:grid-cols-2` |
| `> 1024px` | 3 列 | `lg:grid-cols-3` |

- 内容最大宽度：`max-w-content`（75rem = 1200px）居中
- 导航 `< 768px` 折叠为汉堡菜单（`useState` 控制展开/收起）
- 375px 无横向滚动：`body { overflow-x: hidden }` 兜底
- 各断点（375 / 768 / 1024 / 1440）手动验证无文字溢出

### 4.3 Markdown 博客渲染

```
content/posts/*.md
       │
       ▼  import.meta.glob('/content/posts/*.md', { query: '?raw', import: 'default' })
       │  （构建时静态扫描，新增 MD 自动纳入）
       ▼  gray-matter 解析 frontmatter → { data, content }
       ▼  marked.parse(content) → HTML
       ▼  自动为 h2/h3 注入 id（slugify）→ TOC 锚点
       ▼  dangerouslySetInnerHTML 渲染（仅限已清理的 HTML）
```

- `marked` 渲染 + `gray-matter` 解析
- `extractHeadings(markdown)` 提取 h2/h3 → 侧栏 TOC
- `slugify(text)` 生成 URL-safe 锚点 id
- 代码块、表格、引用、链接均正确渲染

### 4.4 联系表单

- 提交地址通过 `import.meta.env.VITE_FORM_ENDPOINT` 配置
- 前端校验：姓名非空、邮箱格式（`type="email"` + `required`）、消息 ≥ 10 字符
- 提交后状态机：`idle → sending → success / error`
- 成功/失败均有 toast 反馈
- 邮箱一键复制（`navigator.clipboard`）

### 4.5 性能优化

| 维度 | 策略 |
|---|---|
| 图片 | 占位图用首字母 + 渐变背景；实际图片 `loading="lazy"` |
| 字体 | CSS `@font-face` 自托管 + `font-display: swap`；离线 fallback 系统字体 |
| 星空 | 移动端 120 粒子；DPR cap 2；`visibilitychange` 暂停；`prefers-reduced-motion` 静态 |
| 构建目标 | Lighthouse Performance ≥ 85；LCP < 2s |
| 代码分割 | Vite 自动按路由 chunk 分割（`blog/[slug]`、`projects/[slug]` 独立 chunk） |

### 4.6 无障碍（A11y）

- 语义化 HTML：`<main>` `<nav>` `<article>` `<section>` `<aside>`
- 图标按钮加 `aria-label`
- 焦点态：`focus-visible:ring-2 focus-visible:ring-primary`
- 颜色对比度 ≥ 4.5:1（AA）
- `prefers-reduced-motion` 媒体查询关闭所有动画/过渡
- 键盘可导航（Tab / Enter 操作所有交互元素）

---

## 5. 构建与部署

```bash
npm run dev       # 开发服务器 http://localhost:3000
npm run build     # tsc --noEmit && vite build → dist/
npm run preview   # 预览生产构建
npm run lint      # ESLint 检查
```

**部署**：`dist/` 为纯静态文件，可零配置部署到：
- Vercel（推荐，`vercel` CLI）
- Netlify（`netlify deploy`）
- GitHub Pages（`gh-pages`）
- Cloudflare Pages

SPA 路由（`/blog/xxx`）部署时需配置 fallback 到 `index.html`（各平台均支持）。
