import { skillGroups } from '@/data/skills';
import SectionTitle from './SectionTitle';

const LEVEL_STYLES: Record<string, string> = {
  expert: 'bg-primary/20 text-primary border-primary/30',
  proficient: 'bg-accent/15 text-accent border-accent/25',
  familiar: 'bg-dark-card text-dark-muted border-dark-border',
};

const LEVEL_LABEL: Record<string, string> = {
  expert: '精通',
  proficient: '熟练',
  familiar: '了解',
};

export default function Skills() {
  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-content">
        <SectionTitle subtitle="技术栈与能力">
          技能展示
        </SectionTitle>

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="rounded-card border border-dark-border bg-dark-card/60 p-6 backdrop-blur-md transition-colors hover:border-white/25"
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    title={LEVEL_LABEL[skill.level]}
                    className={`inline-flex cursor-default items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors hover:border-white/25 ${LEVEL_STYLES[skill.level]}`}
                  >
                    {skill.name}
                    <span className="text-[10px] opacity-60">
                      {LEVEL_LABEL[skill.level]}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
