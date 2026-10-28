import { marked } from 'marked';
import { slugify } from './utils';

/**
 * 给 Markdown 渲染出的 h2 / h3 自动加上 id（供 TOC 锚点定位）。
 * 返回已清理的 HTML 字符串，供 dangerouslySetInnerHTML 使用。
 */
export function renderMarkdown(markdown: string): string {
  const raw = marked.parse(markdown, { async: false }) as string;
  // 为 h2 / h3 注入唯一 id
  const withIds = raw.replace(
    /<(h[23])>(.*?)<\/\1>/g,
    (_m, tag, text) => {
      const clean = text.replace(/<[^>]+>/g, '').trim();
      const id = slugify(clean);
      return `<${tag} id="${id}">${text}</${tag}>`;
    }
  );
  return withIds;
}

/** 提取 h2 / h3 标题，并返回 { id, text, level } 供 TOC 使用 */
export function extractHeadings(markdown: string): {
  id: string;
  text: string;
  level: number;
}[] {
  const lines = markdown.split('\n');
  const result: { id: string; text: string; level: number }[] = [];
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const m = line.match(/^(#{2,3})\s+(.*)/);
    if (m) {
      const text = m[2].replace(/<[^>]+>/g, '').trim();
      result.push({ id: slugify(text), text, level: m[1].length });
    }
  }
  return result;
}
