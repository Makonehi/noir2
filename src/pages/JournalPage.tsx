import { useState, useEffect } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { JOURNAL_CATEGORIES, formatDate, type JournalArticle } from '@/lib/types';
import { useRouter } from '@/lib/router';

export function JournalPage() {
  const { navigate } = useRouter();
  const [articles, setArticles] = useState<JournalArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      let query = supabase.from('journal_articles').select('*').order('published_at', { ascending: false });
      if (activeCategory !== 'all') {
        query = query.eq('category', activeCategory);
      }
      const { data } = await query;
      setArticles(data as JournalArticle[] || []);
      setLoading(false);
    };
    fetchArticles();
  }, [activeCategory]);

  const featured = articles[0];
  const rest = articles.slice(1);

  const categoryLabel = (cat: string) => {
    const found = JOURNAL_CATEGORIES.find(c => c.id === cat);
    return found?.label || cat;
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] text-accent uppercase mb-4">Журнал</p>
          <h1 className="font-serif text-4xl md:text-5xl text-sand-50 mb-4">Знание о теле</h1>
          <p className="text-sm text-graphite-400 max-w-xl">
            Статьи о здоровье, интимности и осознанной заботе о себе. Медленно, глубоко, без осуждения.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {JOURNAL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 text-sm border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'border-accent text-accent bg-accent/5'
                  : 'border-noir-700 text-sand-100 hover:border-graphite-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/2] bg-noir-800 mb-5" />
                <div className="h-4 bg-noir-700 mb-2 w-1/3" />
                <div className="h-6 bg-noir-700 mb-2 w-3/4" />
                <div className="h-3 bg-noir-700 w-1/2" />
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-xl text-sand-50 mb-2">Статей не найдено</p>
            <p className="text-sm text-graphite-400">В этой категории пока нет публикаций</p>
          </div>
        ) : (
          <>
            {/* Featured article */}
            {featured && activeCategory === 'all' && (
              <button
                onClick={() => navigate(`/journal/${featured.slug}`)}
                className="group grid md:grid-cols-2 gap-8 mb-16 text-left w-full animate-fade-up"
              >
                <div className="relative aspect-[4/3] md:aspect-square bg-noir-800 overflow-hidden">
                  <img
                    src={featured.cover_image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs text-accent uppercase tracking-wider mb-4">
                    {categoryLabel(featured.category)}
                  </p>
                  <h2 className="font-serif text-2xl md:text-4xl text-sand-50 leading-tight mb-4 group-hover:text-accent transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-base text-graphite-300 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-graphite-400">
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{formatDate(featured.published_at)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {featured.read_time} мин
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm text-accent mt-6 group-hover:gap-3 transition-all">
                    Читать статью <ArrowRight size={16} />
                  </span>
                </div>
              </button>
            )}

            {/* Article grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {(activeCategory === 'all' ? rest : articles).map((article, i) => (
                <button
                  key={article.id}
                  onClick={() => navigate(`/journal/${article.slug}`)}
                  className="group text-left animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative aspect-[3/2] bg-noir-800 overflow-hidden mb-5">
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-accent uppercase tracking-wider mb-2">
                    {categoryLabel(article.category)}
                  </p>
                  <h3 className="font-serif text-xl text-sand-50 leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-sm text-graphite-400 leading-relaxed line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-graphite-400">
                    <span>{article.author}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {article.read_time} мин
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
