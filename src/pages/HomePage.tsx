import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import BlogList from '@/components/BlogList';
import AddTransaction from '@/components/AddTransaction';
import Contact from '@/components/Contact';
import { useEffect, useState } from 'react';
import { getAllPosts, type PostMeta } from '@/lib/posts';

export default function HomePage() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts().then((p) => {
      setPosts(p);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      {!loading ? (
        <BlogList posts={posts} />
      ) : (
        <section className="px-4 py-20 md:px-6">
          <div className="mx-auto max-w-content">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton h-64 rounded-card"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <AddTransaction />
      <Contact />
    </>
  );
}
