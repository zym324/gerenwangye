import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '@/data/projects';
import { renderMarkdown } from '@/lib/markdown';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <article className="px-4 pt-28 pb-20 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-5xl" aria-hidden="true">
            ✨
          </p>
          <h1 className="mt-4 text-2xl font-bold text-dark-text">
            项目不存在
          </h1>
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

  const detailsHtml = project.details
    ? renderMarkdown(project.details)
    : null;

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

        <div className="mb-8 flex aspect-[16/7] items-center justify-center rounded-card bg-gradient-to-br from-primary/15 to-accent/15 text-7xl opacity-50">
          {project.title.charAt(0)}
        </div>

        <div className="mb-3 flex items-center gap-3">
          <h1 className="text-3xl font-bold text-dark-text md:text-4xl">
            {project.title}
          </h1>
          {project.featured && (
            <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-dark-muted">
          <span>{project.year}</span>
          <span aria-hidden="true">·</span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-dark-card px-2.5 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="mb-8 text-lg leading-relaxed text-dark-muted">
          {project.description}
        </p>

        {detailsHtml && (
          <div
            className="md-content"
            dangerouslySetInnerHTML={{ __html: detailsHtml }}
          />
        )}

        {project.links && (
          <div className="mt-10 flex flex-wrap gap-4">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                在线 Demo
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-dark-border px-5 py-2.5 text-sm font-medium text-dark-text transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                GitHub 源码
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
