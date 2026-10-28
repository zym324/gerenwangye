import { useState, type FormEvent } from 'react';
import { profile } from '@/data/profile';
import { SocialIcon } from './SocialIcon';
import SectionTitle from './SectionTitle';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
    if (!endpoint) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) form.reset();
    } catch {
      setStatus('error');
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-content">
        <SectionTitle subtitle="有想法？随时交流">
          联系我
        </SectionTitle>

        <div className="grid gap-8 md:grid-cols-2">
          {/* 左侧：信息 */}
          <div className="space-y-6">
            <div className="rounded-xl border border-dark-border/60 bg-dark-card/50 p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                社交链接
              </h3>
              <div className="flex flex-wrap gap-4">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target={s.icon === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center gap-2 text-sm text-dark-muted transition-colors hover:text-primary"
                  >
                    <SocialIcon icon={s.icon} />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-lg border border-dark-border bg-dark-bg px-4 py-2.5 text-sm text-dark-text transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {copied ? '已复制！' : profile.email}
                </button>
              </div>
            </div>
          </div>

          {/* 右侧：表单 */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-dark-border/60 bg-dark-card/50 p-6"
            noValidate
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-dark-muted">
                  姓名
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="你的名字"
                  className="w-full rounded-lg border border-dark-border bg-dark-bg px-3.5 py-2.5 text-sm text-dark-text placeholder-dark-muted/50 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-dark-muted">
                  邮箱
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-dark-border bg-dark-bg px-3.5 py-2.5 text-sm text-dark-text placeholder-dark-muted/50 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-dark-muted">
                  消息
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  minLength={10}
                  placeholder="想聊点什么？（至少 10 个字符）"
                  className="w-full resize-none rounded-lg border border-dark-border bg-dark-bg px-3.5 py-2.5 text-sm text-dark-text placeholder-dark-muted/50 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                {status === 'sending' ? '发送中…' : '发送消息'}
              </button>

              {status === 'success' && (
                <p className="text-center text-sm text-green-400">
                  发送成功，我会尽快回复！
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm text-red-400">
                  发送失败，请直接邮件联系我。
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
