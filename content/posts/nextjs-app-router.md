---
title: Next.js 14 App Router 实战笔记
date: '2024-07-20'
description: 总结 Next.js 14 App Router 的核心概念、常用模式和踩坑经验。
tags: ['前端', 'Next.js', '教程']
cover: /images/posts/nextjs-guide.png
---

## 为什么选 App Router

Next.js 14 的 App Router 相比 Pages Router 有几个核心优势：

- **Server Components**：默认在服务器渲染，减少客户端 JS 体积
- **嵌套布局**：`layout.tsx` 自动包裹子路由
- **数据获取**：直接在组件中 `async/await`，无需 `getServerSideProps`
- **流式渲染**：`Suspense` 边界让页面部分加载

## 核心文件约定

```
app/
├── layout.tsx      # 根布局
├── page.tsx        # 首页
├── blog/
│   └── [slug]/
│       └── page.tsx # 动态路由
└── not-found.tsx   # 404 页
```

## Server vs Client Component

```tsx
// 默认：Server Component
export default async function BlogPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug); // 服务端获取数据
  return <article>{post.title}</article>;
}

// 需要交互：加 'use client'
'use client';
import { useState } from 'react';

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>{liked ? '❤️' : '🤍'}</button>;
}
```

## 动态路由与 SSG

```tsx
// generateStaticParams：构建时预生成页面
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
```

## 常见踩坑

| 问题 | 原因 | 解法 |
|---|---|---|
| `useState` 报错 | 在 Server Component 中使用了 Hook | 添加 `'use client'` |
| 图片 404 | 使用了 `<img>` 而非 `next/image` | 统一用 `next/image` |
| 字体闪烁 | 外部 CSS 加载慢 | 使用 `next/font` 自托管 |

## 参考资料

- [Next.js 官方文档](https://nextjs.org/docs)
- [App Router 迁移指南](https://nextjs.org/docs/app/building-your-migrating)
