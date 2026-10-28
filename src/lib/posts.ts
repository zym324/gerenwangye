import matter from 'gray-matter';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover?: string;
  content: string;
  readingTime: number;
}

/**
 * 使用 Vite 的 import.meta.glob 在构建时静态扫描 content/posts/*.md，
 * 新增 MD 文件后重新构建即自动纳入，无需文件系统 I/O。
 */
const rawModules = import.meta.glob('/content/posts/*.md', {
  query: '?raw',
  import: 'default',
});

const slugs = Object.keys(rawModules).map((k) =>
  k.replace('/content/posts/', '').replace(/\.md$/, '')
);

export function getPostSlugsSync(): string[] {
  return slugs;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const mod = rawModules[
        `/content/posts/${slug}.md`
      ] as unknown as Promise<string>;
      const raw = await mod;
      const { data, content } = matter(raw);

      const words = content.trim().split(/\s+/).length;
      const readingTime = Math.max(1, Math.round(words / 200));

      const title = typeof data.title === 'string' ? data.title : slug;
      const date = typeof data.date === 'string' ? data.date : '';
      const description =
        typeof data.description === 'string' ? data.description : '';
      const tags = Array.isArray(data.tags)
        ? (data.tags as unknown[]).map((t) => String(t))
        : [];
      const cover = typeof data.cover === 'string' ? data.cover : undefined;

      return {
        slug,
        title,
        date,
        description,
        tags,
        cover,
        content,
        readingTime,
      };
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<PostMeta | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
