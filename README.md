# 个人展示网站

深色主题 + 星空背景的个人 Portfolio，简洁现代风格，全端响应式。

## 技术栈

- Next.js 14（App Router）
- TypeScript
- Tailwind CSS
- Canvas 星空（零依赖）
- Markdown 博客（`marked` + `gray-matter`）

## 快速开始

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 常用命令

| 命令 | 说明 |
|---|---|
| `npm run dev` | 本地开发 |
| `npm run build` | 生产构建（SSG 预渲染博客/项目页） |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | ESLint 检查 |

## 目录说明

- `src/data/` 个人信息、技能、项目（改内容先改这里）
- `content/posts/` 博客文章（Markdown）
- `src/components/` 各功能区块组件
- `src/app/` 路由页面（首页 / 博客详情 / 项目详情 / 404）

## 配置联系表单

在 `.env.local` 中配置：

```env
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/xxxxx
```

## 文档

- `TECH_DESIGN.md` 技术设计文档
- `AGENTS.md` AI 开发规范
