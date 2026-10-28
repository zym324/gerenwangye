import { profile } from '@/data/profile';
import SectionTitle from './SectionTitle';

export default function About() {
  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-content">
        <SectionTitle subtitle="关于我">
          个人介绍
        </SectionTitle>

        <div className="grid gap-10 md:grid-cols-5">
          {/* 左侧：简介 */}
          <div className="md:col-span-2">
            <p className="text-base leading-relaxed text-dark-muted">
              {profile.bio}
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-dark-muted">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              坐标 {profile.location}
            </div>
          </div>

          {/* 右侧：时间线 */}
          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              工作经历
            </h3>
            <ol className="relative border-l border-dark-border pl-6 space-y-8">
              {profile.experiences.map((exp) => (
                <li key={exp.company} className="relative">
                  <span
                    className={`absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 ${
                      exp.current
                        ? 'border-primary bg-primary/30'
                        : 'border-dark-border bg-dark-card'
                    }`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className="text-base font-semibold text-dark-text">
                      {exp.role}
                    </h4>
                    <span className="text-xs text-dark-muted">{exp.period}</span>
                  </div>
                  <p className="text-sm text-primary/90">{exp.company}</p>
                  <p className="mt-1 text-sm leading-relaxed text-dark-muted">
                    {exp.description}
                  </p>
                </li>
              ))}
            </ol>

            {profile.education.length > 0 && (
              <div className="mt-10">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                  教育背景
                </h3>
                <ol className="relative border-l border-dark-border pl-6 space-y-6">
                  {profile.education.map((edu) => (
                    <li key={edu.school} className="relative">
                      <span
                        className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-dark-border bg-dark-card"
                        aria-hidden="true"
                      />
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h4 className="text-base font-semibold text-dark-text">
                          {edu.degree}
                        </h4>
                        <span className="text-xs text-dark-muted">{edu.period}</span>
                      </div>
                      <p className="text-sm text-primary/90">{edu.school}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
