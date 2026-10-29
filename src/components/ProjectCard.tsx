import { Link } from 'react-router-dom';
import type { Project } from '@/data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  const detailTo = `/projects/${project.slug}`;

  return (
    <Link
      to={detailTo}
      className="group flex flex-col overflow-hidden rounded-card border border-dark-border bg-dark-card/60 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      {/* 封面 */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="flex h-full items-center justify-center text-5xl opacity-40 transition-opacity group-hover:opacity-60">
          {project.title.charAt(0)}
        </div>
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-[11px] font-semibold text-dark-bg">
            Featured
          </span>
        )}
      </div>

      {/* 内容 */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-dark-text transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <span className="shrink-0 text-xs text-dark-muted">
            {project.year}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-dark-muted">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
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
