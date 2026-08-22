import { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { supabase } from '@/lib/supabase';
import { formatPrice, type Product, type JournalArticle } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';

export function HomePage() {
  const { navigate } = useRouter();
  const [featured, setFeatured] = useState<Product[]>([]);
  const [articles, setArticles] = useState<JournalArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, articlesRes] = await Promise.all([
        supabase.from('products').select('*').eq('is_featured', true).limit(4),
        supabase.from('journal_articles').select('*').order('published_at', { ascending: false }).limit(3),
      ]);
      setFeatured(productsRes.data as Product[] || []);
      setArticles(articlesRes.data as JournalArticle[] || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/9695827/pexels-photo-9695827.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
            alt="NOIR — ритуал заботы о себе"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir-950/70 via-noir-950/30 to-noir-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-noir-950/60 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.3em] text-accent uppercase mb-6 animate-fade-in">
                Аксессуары для тела и сексуального велнеса
              </p>
              <h1 className="font-serif text-5xl md:text-7xl text-sand-50 leading-[1.05] mb-8 animate-fade-up text-balance">
                Искусство<br />прикосновения
              </h1>
              <p className="text-base md:text-lg text-sand-100/80 leading-relaxed max-w-xl mb-10 animate-fade-up" style={{ animationDelay: '200ms' }}>
                Премиальные материалы, безупречная форма, осознанный ритуал.
                Создано для тех, кто понимает: забота о теле — это забота о себе.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
                <button
                  onClick={() => navigate('/catalog')}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-sand-50 text-noir-950 text-sm tracking-wider font-medium hover:bg-accent hover:text-noir-950 transition-all duration-400"
                >
                  Открыть каталог
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/configurator')}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-sand-100/30 text-sand-50 text-sm tracking-wider hover:border-accent hover:text-accent transition-all duration-400"
                >
                  3D-конфигуратор
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-shimmer">
          <ArrowDown size={20} className="text-sand-100/50" strokeWidth={1} />
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-32 bg-noir-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-accent uppercase mb-6">Философия</p>
          <h2 className="font-serif text-3xl md:text-5xl text-sand-50 leading-tight mb-8 text-balance">
            Тело — это холст, а прикосновение — искусство
          </h2>
          <p className="text-base md:text-lg text-graphite-300 leading-relaxed max-w-2xl mx-auto">
            Мы создаём объекты, которые превращают рутину в ритуал. Каждый материал отобран вручную,
            каждая форма продумана. Без пошлости, без шума — только доверие, эстетика и забота.
          </p>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs tracking-[0.3em] text-accent uppercase mb-4">Подборка</p>
              <h2 className="font-serif text-3xl md:text-4xl text-sand-50">Избранные предметы</h2>
            </div>
            <button
              onClick={() => navigate('/catalog')}
              className="hidden md:inline-flex items-center gap-2 text-sm text-sand-100 hover:text-accent transition-colors group"
            >
              Смотреть все
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] bg-noir-800 mb-5" />
                  <div className="h-4 bg-noir-700 mb-2 w-3/4" />
                  <div className="h-3 bg-noir-700 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {featured.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}

          <div className="md:hidden text-center mt-10">
            <button
              onClick={() => navigate('/catalog')}
              className="inline-flex items-center gap-2 text-sm text-sand-100 hover:text-accent"
            >
              Смотреть все <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Configurator banner */}
      <section className="py-24 md:py-32 bg-noir-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] text-accent uppercase mb-6">Кастомизация</p>
              <h2 className="font-serif text-3xl md:text-5xl text-sand-50 leading-tight mb-6 text-balance">
                Создайте свой<br />предмет ритуала
              </h2>
              <p className="text-base text-graphite-300 leading-relaxed mb-8 max-w-md">
                Выберите материал, цвет и текстуру. 3D-конфигуратор позволяет увидеть результат
                в реальном времени. Каждое изделие создаётся индивидуально.
              </p>
              <button
                onClick={() => navigate('/configurator')}
                className="group inline-flex items-center gap-3 px-8 py-4 border border-accent text-accent text-sm tracking-wider hover:bg-accent hover:text-noir-950 transition-all duration-400"
              >
                Открыть конфигуратор
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative aspect-square bg-noir-800 overflow-hidden group">
              <img
                src="https://images.pexels.com/photos/4203098/pexels-photo-4203098.jpeg?auto=compress&cs=tinysrgb&h=800&w=800"
                alt="3D-конфигуратор"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-noir-950/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Journal preview */}
      {articles.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-xs tracking-[0.3em] text-accent uppercase mb-4">Журнал</p>
                <h2 className="font-serif text-3xl md:text-4xl text-sand-50">Знание о теле</h2>
              </div>
              <button
                onClick={() => navigate('/journal')}
                className="hidden md:inline-flex items-center gap-2 text-sm text-sand-100 hover:text-accent transition-colors group"
              >
                Все статьи
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {articles.map((article, i) => (
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
                    {article.category === 'self-care' && 'Забота о себе'}
                    {article.category === 'health' && 'Здоровье'}
                    {article.category === 'intimacy' && 'Интимность'}
                    {article.category === 'wellness' && 'Велнес'}
                  </p>
                  <h3 className="font-serif text-xl text-sand-50 leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-sm text-graphite-400 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                  <p className="text-xs text-graphite-400 mt-3">
                    {article.read_time} мин чтения
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values */}
      <section className="py-24 md:py-32 bg-noir-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Доверие', text: 'Медицинские материалы, гипоаллергенность, прозрачный состав. Безопасность — не опция, а фундамент.' },
              { title: 'Эстетика', text: 'Каждый объект создан как скульптура. Форма следует за функцией, но не жертвует красотой.' },
              { title: 'Забота', text: 'Мы не продаём товары — мы предлагаем ритуал. От упаковки до послевкусия — каждая деталь продумана.' },
            ].map((value, i) => (
              <div key={value.title} className="text-center animate-fade-up" style={{ animationDelay: `${i * 150}ms` }}>
                <h3 className="font-serif text-2xl text-sand-50 mb-4">{value.title}</h3>
                <p className="text-sm text-graphite-300 leading-relaxed max-w-xs mx-auto">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
