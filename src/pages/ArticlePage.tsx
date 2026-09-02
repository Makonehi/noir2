import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Quote } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatDate, type JournalArticle } from '@/lib/types';
import { useRouter } from '@/lib/router';

interface ArticlePageProps {
  slug: string;
}

export function ArticlePage({ slug }: ArticlePageProps) {
  const { navigate } = useRouter();
  const [article, setArticle] = useState<JournalArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('journal_articles')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      setArticle(data as JournalArticle | null);
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          <div className="aspect-[16/9] bg-noir-800 animate-pulse mb-8" />
          <div className="h-8 bg-noir-800 animate-pulse mb-4 w-3/4" />
          <div className="h-4 bg-noir-800 animate-pulse mb-2" />
          <div className="h-4 bg-noir-800 animate-pulse mb-2" />
          <div className="h-4 bg-noir-800 animate-pulse w-2/3" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-2xl text-sand-50 mb-4">Статья не найдена</p>
          <button
            onClick={() => navigate('/journal')}
            className="text-sm text-accent hover:text-accent-light"
          >
            Вернуться к журналу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Cover */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={article.cover_image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir-950/40 to-noir-950" />
      </div>

      <article className="relative -mt-32 max-w-3xl mx-auto px-6 pb-24">
        <button
          onClick={() => navigate('/journal')}
          className="inline-flex items-center gap-2 text-sm text-graphite-400 hover:text-accent transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Назад к журналу
        </button>

        <div className="bg-noir-900 p-8 md:p-12 mb-12">
          <p className="text-xs text-accent uppercase tracking-wider mb-4">
            {article.category === 'self-care' && 'Забота о себе'}
            {article.category === 'health' && 'Здоровье'}
            {article.category === 'intimacy' && 'Интимность'}
            {article.category === 'wellness' && 'Велнес'}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-sand-50 leading-tight mb-6 text-balance">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-graphite-400 mb-6">
            <span>{article.author}</span>
            <span>·</span>
            <span>{formatDate(article.published_at)}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {article.read_time} мин чтения
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {article.content.map((block, i) => {
            if (block.type === 'heading') {
              return (
                <h2 key={i} className="font-serif text-2xl md:text-3xl text-sand-50 leading-tight mt-12 mb-2 animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'quote') {
              return (
                <blockquote key={i} className="my-10 pl-6 border-l-2 border-accent animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <Quote size={24} className="text-accent/40 mb-3" strokeWidth={1} />
                  <p className="font-serif text-xl md:text-2xl text-sand-50 italic leading-relaxed">
                    {block.text}
                  </p>
                </blockquote>
              );
            }
            return (
              <p key={i} className="text-base text-graphite-300 leading-[1.8] animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                {block.text}
              </p>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-noir-700/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-xs text-graphite-400 mb-1">Автор</p>
            <p className="font-serif text-lg text-sand-50">{article.author}</p>
          </div>
          <button
            onClick={() => navigate('/journal')}
            className="text-sm text-accent hover:text-accent-light transition-colors inline-flex items-center gap-2"
          >
            Все статьи <ArrowLeft size={14} className="rotate-180" />
          </button>
        </div>
      </article>
    </div>
  );
}
