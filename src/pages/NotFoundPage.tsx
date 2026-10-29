import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 pt-16 md:px-6">
      <div className="text-center">
        <p className="mb-4 text-7xl" aria-hidden="true">
          ✨
        </p>
        <h1 className="text-5xl font-bold text-dark-text md:text-6xl">404</h1>
        <p className="mt-4 text-lg text-dark-muted">走丢了一颗星星</p>
        <p className="mt-2 text-sm text-dark-muted/70">
          你访问的页面不存在或已被移除。
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-medium text-dark-bg transition-all duration-200 ease-out-expo hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          回到首页
        </Link>
      </div>
    </section>
  );
}
