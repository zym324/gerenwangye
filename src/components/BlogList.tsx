import type { PostMeta } from '@/lib/posts';
import BlogCard from './BlogCard';
import SectionTitle from './SectionTitle';

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const latest = posts.slice(0, 3);

  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-content">
        <SectionTitle subtitle="技术思考与实践记录">
          博客文章
        </SectionTitle>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
