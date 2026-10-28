# AI 开发规范（AGENTS.md）

## 项目概述

个人展示网站，包含个人介绍、技能展示、项目展示、博客、联系五大模块。
深色主题 + 星空背景，简洁现代风格，全端响应式。
技术栈：React 18 + Vite 5 + TypeScript + Tailwind CSS + react-router-dom。
SPA 客户端渲染，博客内容通过 Vite `import.meta.glob` 在构建时扫描 Markdown。

## 设计系统（Design Tokens）

| Token | 值 | 说明 |
|---|---|---|
| 背景 | `#0B0F1A` | 主背景色 |
| 卡片背景 | `#141929` | 区块/卡片底色 |
| 边框 | `#1E2A40` | 分割线、卡片描边 |
| 主文字 | `#E6EAF2` | 标题、正文 |
| 次要文字 | `#8B95A8` | 描述、辅助 |
| 强调色 | `--color-primary: 123 115 255` | 可配置，AA 对比度达标 |
| 辅助强调 | `--color-accent: 167 139 250` | 渐变/点缀 |
| 圆角 | 卡片 14px / 按钮 12px | 统一 12–16px 区间 |
| 内容最大宽度 | `max-w-content` (75rem = 1200px) | 居中 |
| 断点 | `<640` 单列 / `640–1024` 两列 / `>1024` 三列 | `sm:2 lg:3` |
| 缓动 | `cubic-bezier(0.16, 1, 0.3, 1)` | 所有动效统一 |

## 开发规范

### 项目结构

- 所有组件放 `src/components/`，按功能拆分，每个组件一个文件
- 页面路由放 `src/pages/`，使用 react-router-dom 声明
- 数据文件放 `src/data/`，纯 TypeScript 对象，无运行时 I/O
- 工具函数放 `src/lib/`
- 博客 Markdown 放 `content/posts/`（通过 `import.meta.glob` 构建时扫描）
- 图片等静态资源放 `public/images/`
- 组件命名：PascalCase 文件名（如 `ProjectCard.tsx`）
- 页面组件导出 `default`，工具函数具名导出

### 代码风格

- TypeScript 严格模式（`strict: true`）
- 优先 `const`，避免 `var`
- 组件使用函数式 + Hooks，不使用 class 组件
- Props 必须定义 TypeScript interface
- 避免 `any`，必要时用 `unknown` + 类型守卫
- 字符串用单引号，模板字符串用于插值
- 行宽 ≤ 100 字符（eslint max-len）
- 空行分隔逻辑块，函数/组件之间空一行

### Tailwind 使用规范

- 优先使用 Tailwind 原子类，避免写自定义 CSS
- 自定义样式写在 `index.css`，使用 CSS Variables 管理主题色
- 强调色使用 `rgb(var(--color-primary) / <alpha-value>)` 格式以支持透明度
- 响应式断点：`<640` 单列 / `sm(640)–lg(1024)` 两列 / `lg(1024)+` 三列
- 动效：`transition` + `hover:` 变体优先，缓动统一 `ease-out-expo`
- 圆角：卡片 `rounded-card` (14px)，按钮 `rounded-lg` (8px→12px)

### 组件设计原则

- 单一职责：一个组件只做一件事
- 可复用：通用样式抽为 `SectionTitle`、`Tag`、`Card` 等原子组件
- 受控/非受控：表单组件受控（value + onChange）
- 避免 props 超过 6 个，超过则考虑拆分或改用 Context

## 测试与验收

### 验收标准

- [ ] 375px 宽度无横向滚动（`overflow-x: hidden` 兜底）
- [ ] 移动端星空帧率 ≥ 50fps（120 粒子 + DPR cap 2）
- [ ] 新增 MD 文件后博客列表自动更新（构建时扫描 `content/posts/`）
- [ ] 表单提交有成功/失败反馈（toast 提示）
- [ ] 深色主题下文字对比度达 AA（≥ 4.5:1）
- [ ] 键盘可导航（Tab / Enter 操作所有交互元素）
- [ ] 图片有 alt 或 aria-hidden 标注
- [ ] `npm run build` 零报错

### MVP 阶段手动验证

- 各断点（375 / 768 / 1024 / 1440）下无横向滚动、无文字溢出
- 导航在移动端可正常展开/收起
- 星空背景不阻断文字可读性
- 博客 Markdown 渲染正确（代码块、表格、链接）
- 联系表单校验逻辑（空字段、格式错误）
- 404 页面存在且风格统一
- Lighthouse 移动端 Performance ≥ 85

### 后续迭代

- 核心工具函数（`lib/utils.ts`）编写单元测试（Vitest）
- 表单提交逻辑集成测试（MSW mock）

## 注意事项

1. **星空性能**：移动端粒子 ≤ 150 颗；DPR 上限 2；`visibilitychange` 时暂停；`prefers-reduced-motion` 时静态渲染
2. **图片优化**：项目封面 `loading="lazy"`；占位图用首字母 + 渐变背景（无实际图片时）
3. **字体**：用 CSS `@font-face` 自托管，禁止外链字体；离线环境字体失败自动 fallback
4. **路由**：`react-router-dom`（BrowserRouter），详情页 `/blog/:slug`、`/projects/:slug`，未知路由落到 404
5. **Markdown**：博客用 `marked` 渲染 + `gray-matter` 解析 frontmatter；`dangerouslySetInnerHTML` 仅限已清理的 HTML
6. **环境变量**：敏感 key 放 `.env.local`（gitignore），`VITE_*` 前缀用于客户端
7. **SEO**：SPA 以 title/meta 为主；如需深度 SEO 再考虑静态导出（`vite build` 产出可部署）
8. **无障碍**：
   - 语义化 HTML（`<main>` `<nav>` `<article>` `<section>`）
   - 图标按钮加 `aria-label`
   - 焦点态 `focus-visible:ring-2 focus-visible:ring-primary`
   - 颜色对比度 ≥ 4.5:1（AA）
   - `prefers-reduced-motion` 媒体查询关闭所有动画
9. **禁止**：
   - 引入 jQuery / Bootstrap / 重型 UI 库（antd、mui）
   - 使用 `dangerouslySetInnerHTML` 渲染未净化内容
   - 在客户端组件内散落硬编码外部 API 调用（表单等统一走 `VITE_*` 环境变量配置端点）
   - 硬编码魔法数字（抽为常量或 CSS 变量）

## 构建与部署

```bash
npm run dev       # 本地开发（http://localhost:3000）
npm run build     # 生产构建（tsc --noEmit && vite build → dist/）
npm run preview   # 预览生产构建
npm run lint      # ESLint 检查
```

`dist/` 为纯静态文件，可零配置部署到 Vercel / Netlify / GitHub Pages / Cloudflare Pages。
SPA 路由（`/blog/xxx`）需配置 fallback 到 `index.html`。
