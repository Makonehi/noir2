import { useState, useEffect, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { CATEGORIES, formatPrice, type Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';

export function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      setProducts(data as Product[] || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, activeCategory, priceRange, sortBy]);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] text-accent uppercase mb-4">Каталог</p>
          <h1 className="font-serif text-4xl md:text-5xl text-sand-50 mb-4">Коллекция</h1>
          <p className="text-sm text-graphite-400 max-w-xl">
            Предметы ритуала, созданные с вниманием к материалу, форме и тактильности.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-8">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-graphite-400 mb-4">Категория</h3>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`block text-sm transition-colors duration-300 ${
                        activeCategory === cat.id ? 'text-accent' : 'text-sand-100 hover:text-accent'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-graphite-400 mb-4">Цена</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={25000}
                    step={500}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-accent"
                  />
                  <div className="flex justify-between text-xs text-graphite-400">
                    <span>{formatPrice(0)}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-graphite-400 mb-4">Сортировка</h3>
                <div className="space-y-2">
                  {[
                    { id: 'default', label: 'По умолчанию' },
                    { id: 'price-asc', label: 'Цена: по возрастанию' },
                    { id: 'price-desc', label: 'Цена: по убыванию' },
                    { id: 'rating', label: 'По рейтингу' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setSortBy(opt.id as typeof sortBy)}
                      className={`block text-sm transition-colors duration-300 ${
                        sortBy === opt.id ? 'text-accent' : 'text-sand-100 hover:text-accent'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile filter toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-3 border border-noir-600 text-sm text-sand-100"
            >
              <SlidersHorizontal size={16} strokeWidth={1.5} />
              Фильтры
            </button>

            {showFilters && (
              <div className="mt-6 p-6 bg-noir-900 border border-noir-700/50 animate-slide-down space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm text-sand-50">Фильтры</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X size={18} className="text-sand-100" />
                  </button>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-graphite-400 mb-3">Категория</h4>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3 py-1.5 text-xs border transition-colors ${
                          activeCategory === cat.id
                            ? 'border-accent text-accent'
                            : 'border-noir-600 text-sand-100'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-graphite-400 mb-3">Цена</h4>
                  <input
                    type="range"
                    min={0}
                    max={25000}
                    step={500}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-accent"
                  />
                  <div className="flex justify-between text-xs text-graphite-400 mt-1">
                    <span>{formatPrice(0)}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-graphite-400 mb-3">Сортировка</h4>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full bg-noir-800 border border-noir-600 text-sm text-sand-50 px-3 py-2"
                  >
                    <option value="default">По умолчанию</option>
                    <option value="price-asc">Цена: по возрастанию</option>
                    <option value="price-desc">Цена: по убыванию</option>
                    <option value="rating">По рейтингу</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Products grid */}
          <div className="flex-1">
            <p className="text-sm text-graphite-400 mb-8">
              {loading ? 'Загрузка...' : `${filtered.length} ${filtered.length === 1 ? 'товар' : filtered.length < 5 ? 'товара' : 'товаров'}`}
            </p>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/5] bg-noir-800 mb-5" />
                    <div className="h-4 bg-noir-700 mb-2 w-3/4" />
                    <div className="h-3 bg-noir-700 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif text-xl text-sand-50 mb-2">Ничего не найдено</p>
                <p className="text-sm text-graphite-400">Попробуйте изменить фильтры</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
