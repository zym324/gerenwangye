import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPostBySlug, formatDate, type PostMeta } from '@/lib/posts';
import { renderMarkdown, extractHeadings } from '@/lib/markdown';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    if (!slug) return;
    getPostBySlug(slug).then((p) => {
      if (!alive) return;
      setPost(p);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <article className="px-4 pt-28 pb-20 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="skeleton h-8 w-40 rounded-lg" />
          <div className="skeleton mt-6 h-10 w-3/4 rounded-lg" />
          <div className="skeleton mt-8 h-96 rounded-card" />
        </div>
      </article>
    );
  }

  if (!post) {
    return (
      <article className="px-4 pt-28 pb-20 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-5xl" aria-hidden="true">
            ✨
          </p>
          <h1 className="mt-4 text-2xl font-bold text-dark-text">文章不存在</h1>
          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            返回首页
          </Link>
        </div>
      </article>
    );
  }

  const html = renderMarkdown(post.content);
  const headings = extractHeadings(post.content);

  const onToc = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <article className="px-4 pt-28 pb-20 md:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-dark-muted transition-colors hover:text-primary"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M19 12H5m7-7-7 7 7 7" />
          </svg>
          返回首页
        </Link>

        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-dark-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} 分钟阅读</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-dark-card px-2 py-0.5 text-xs text-dark-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-8 text-3xl font-bold leading-tight text-dark-text md:text-4xl">
          {post.title}
        </h1>

        <div className="grid gap-8 md:grid-cols-[1fr_180px]">
          <div className="md-content" dangerouslySetInnerHTML={{ __html: html }} />

          {headings.length > 0 && (
            <aside className="hidden md:block">
              <div className="sticky top-24">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                  目录
                </h2>
                <nav className="space-y-2">
                  {headings.map((h, i) => (
                    <a
                      key={i}
                      href={`#${h.id}`}
                      onClick={(ev) => onToc(h.id, ev)}
                      className={`block truncate text-xs text-dark-muted transition-colors hover:text-primary ${
                        h.level === 3 ? 'pl-3' : ''
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}


