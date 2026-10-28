import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';
import SectionTitle from './SectionTitle';

export default function Projects() {
  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-content">
        <SectionTitle subtitle="精选作品与开源项目">
          项目展示
        </SectionTitle>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
