import { profile } from '@/data/profile';
import { SocialIcon } from './SocialIcon';

export default function Footer() {
  return (
    <footer className="border-t border-dark-border py-10">
      <div className="mx-auto flex max-w-content flex-col items-center gap-5 px-4 md:px-6">
        <div className="flex items-center gap-4">
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
        <p className="text-center text-xs text-dark-muted/70">
          © {new Date().getFullYear()} {profile.name} · 用 ❤️ 与代码构建
        </p>
      </div>
    </footer>
  );
}
