import { Link } from 'react-router-dom';
import type { PostMeta } from '@/lib/posts';
import { formatDate } from '@/lib/posts';

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-dark-border/60 bg-dark-card/50 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(108,99,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="flex h-full items-center justify-center text-4xl opacity-30 transition-opacity group-hover:opacity-50">
          📝
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-dark-muted">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} 分钟</span>
        </div>
        <h3 className="mt-2 text-base font-semibold text-dark-text transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-dark-muted">
          {post.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-dark-bg px-2 py-0.5 text-[11px] text-dark-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
