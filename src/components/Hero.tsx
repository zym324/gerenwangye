import { profile } from '@/data/profile';
import { SocialIcon } from './SocialIcon';

export default function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-screen items-center justify-center px-4 pt-16 md:px-6"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        {/* Avatar */}
        <div className="relative">
          <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-primary/40 shadow-[0_0_30px_rgba(108,99,255,0.25)] md:h-32 md:w-32">
            {/* 占位头像 */}
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/30 to-accent/30 text-4xl font-bold text-dark-text">
              {profile.name.charAt(0)}
            </div>
          </div>
          <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-dark-bg bg-green-400" />
        </div>

        {/* Text */}
        <div className="animate-fade-up space-y-4">
          <p className="text-sm tracking-widest text-primary">HELLO, I&apos;M</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-dark-text md:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="text-lg text-accent md:text-xl">{profile.title}</p>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-dark-muted md:text-lg">
            {profile.tagline}
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            查看项目
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-dark-border px-6 py-3 text-sm font-medium text-dark-text transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            联系我
          </a>
        </div>

        {/* Social */}
        <div className="flex items-center gap-5">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target={s.icon === 'email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-dark-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>

        {/* 向下指示 */}
        <div className="mt-4 animate-bounce text-dark-muted/50" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
