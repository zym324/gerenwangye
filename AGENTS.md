# AI 开发规范（AGENTS.md）

## 项目概述

个人展示网站，包含个人介绍、技能展示、项目展示、博客、联系五大模块。
柔和深色主题 + 微光背景，极简克制风格，全端响应式，追求久看不累的舒适阅读体验。
技术栈：React 18 + Vite 5 + TypeScript + Tailwind CSS + react-router-dom。
SPA 客户端渲染，博客内容通过 Vite `import.meta.glob` 在构建时扫描 Markdown。

## 设计系统（Design Tokens）

| Token | 值 | 说明 |
|---|---|---|
| 背景 | `#0F172A` | 主背景色（深灰蓝，拒绝纯黑，防止光晕刺眼） |
| 卡片背景 | `#1E293B` | 区块/卡片底色（与背景形成微弱明度差） |
| 边框 | `rgba(255, 255, 255, 0.08)` | 极细透白边框，替代深色边框，更显通透 |
| 主文字 | `#E2E8F0` | 标题、正文（柔和灰白，绝不使用纯白 `#FFF`） |
| 次要文字 | `#94A3B8` | 描述、辅助 |
| 强调色 | `--color-primary: 129 140 248` | 可配置，AA 对比度达标（仅用于按钮/悬停，占比<10%） |
| 辅助强调 | `--color-accent: 45 212 191` | 渐变/点缀 |
| 圆角 | 卡片 16px / 按钮 12px | 统一 12–16px 区间 |
| 字体族 | `Inter` / `MiSans` / `system-ui` | 现代无衬线字体，开启抗锯齿 `antialiased` |
| 字号/字重 | 正文 16px (Regular) / 标题 (Semibold) | 拒绝细体，正文行高 `leading-relaxed` (1.6~1.8) |
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
- 圆角：卡片 `rounded-2xl` (16px)，按钮 `rounded-xl` (12px)
- 间距规范：容器间距 `gap-6` 起步，卡片内边距 `p-6` 或 `p-8`（给足呼吸空间）
- 材质规范：卡片使用半透明 + 毛玻璃（`bg-card/60 backdrop-blur-md`），层级区分靠明度差和透白边框，不使用重阴影。

### 组件设计原则

- 单一职责：一个组件只做一件事
- 可复用：通用样式抽为 `SectionTitle`、`Tag`、`Card` 等原子组件
- 受控/非受控：表单组件受控（value + onChange）
- 避免 props 超过 6 个，超过则考虑拆分或改用 Context

## 测试与验收

### 验收标准

- [ ] 375px 宽度无横向滚动（`overflow-x: hidden` 兜底）
- [ ] 移动端微光背景帧率 ≥ 50fps（120 粒子 + DPR cap 2）
- [ ] 新增 MD 文件后博客列表自动更新（构建时扫描 `content/posts/`）
- [ ] 表单提交有成功/失败反馈（toast 提示）
- [ ] 深色主题下文字对比度达 AA（≥ 4.5:1），且不使用纯白/纯黑极端对比
- [ ] 键盘可导航（Tab / Enter 操作所有交互元素）
- [ ] 图片有 alt 或 aria-hidden 标注
- [ ] `npm run build` 零报错

### MVP 阶段手动验证

- 各断点（375 / 768 / 1024 / 1440）下无横向滚动、无文字溢出
- 导航在移动端可正常展开/收起
- 背景微光/粒子不阻断文字可读性
- 博客 Markdown 渲染正确（代码块、表格、链接）
- 大段正文阅读 5 分钟以上，眼睛无明显酸涩感
- 联系表单校验逻辑（空字段、格式错误）
- 404 页面存在且风格统一
- Lighthouse 移动端 Performance ≥ 85

### 后续迭代

- 核心工具函数（`lib/utils.ts`）编写单元测试（Vitest）
- 表单提交逻辑集成测试（MSW mock）

## 注意事项

1. **背景性能**：移动端粒子 ≤ 150 颗；DPR 上限 2；`visibilitychange` 时暂停；`prefers-reduced-motion` 时静态渲染。建议让星点仅在页面边缘或顶部显现，中间阅读区保持纯净。
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
9. **视觉克制原则**：
   - 禁止使用纯黑（#000）背景配纯白（#FFF）文字。
   - 强调色全站占地面积不得超过 10%，仅作点缀。
   - 卡片悬停（Hover）时禁止使用放大（scale）动效，改用轻微上浮（`-translate-y-0.5`）和边框变亮。
   - 严禁使用细体（`font-light`）作为正文。
10. **禁止**：
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

`dist/` 为纯静态文件，可零配置部署到 Vercel / Netlify / GitHub Pages / Cloudflare Pages。
SPA 路由（`/blog/xxx`）需配置 fallback 到 `index.html`。
