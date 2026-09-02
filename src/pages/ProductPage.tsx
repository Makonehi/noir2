import { useState, useEffect } from 'react';
import { ArrowLeft, Check, ShoppingBag, Truck, Shield, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatPrice, type Product } from '@/lib/types';
import { useRouter } from '@/lib/router';
import { useCart } from '@/lib/cart';
import { ProductCard } from '@/components/ProductCard';

interface ProductPageProps {
  slug: string;
}

export function ProductPage({ slug }: ProductPageProps) {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setSelectedImage(0);
      setSelectedColor(0);
      setQuantity(1);
      setAdded(false);
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      const p = data as Product | null;
      setProduct(p);
      if (p) {
        const { data: relData } = await supabase
          .from('products')
          .select('*')
          .eq('category', p.category)
          .neq('id', p.id)
          .limit(3);
        setRelated(relData as Product[] || []);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    const color = product.colors[selectedColor];
    addToCart(product, quantity, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="aspect-square bg-noir-800 animate-pulse" />
            <div className="space-y-4">
              <div className="h-6 bg-noir-800 animate-pulse w-1/3" />
              <div className="h-12 bg-noir-800 animate-pulse w-3/4" />
              <div className="h-4 bg-noir-800 animate-pulse w-1/4" />
              <div className="h-32 bg-noir-800 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-2xl text-sand-50 mb-4">Товар не найден</p>
          <button
            onClick={() => navigate('/catalog')}
            className="text-sm text-accent hover:text-accent-light"
          >
            Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  const allImages = [product.image_url, ...product.gallery];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate('/catalog')}
          className="inline-flex items-center gap-2 text-sm text-graphite-400 hover:text-accent transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Назад в каталог
        </button>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="aspect-square bg-noir-800 overflow-hidden mb-4 animate-fade-in">
              <img
                src={allImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-24 bg-noir-800 overflow-hidden transition-opacity ${
                      selectedImage === i ? 'opacity-100 ring-1 ring-accent' : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="animate-fade-up">
            <p className="text-xs tracking-[0.3em] text-accent uppercase mb-4">
              {product.category === 'ceramics' && 'Керамика'}
              {product.category === 'oils' && 'Масла'}
              {product.category === 'accessories' && 'Аксессуары'}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-sand-50 leading-tight mb-4">
              {product.name}
            </h1>
            <p className="font-serif text-2xl text-accent mb-6">
              {formatPrice(product.price)}
            </p>
            <p className="text-base text-graphite-300 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-widest text-graphite-400 mb-4">
                  Цвет: {product.colors[selectedColor]?.name}
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === i ? 'border-accent scale-110' : 'border-noir-600 hover:border-graphite-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-noir-600">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 text-sand-100 hover:text-accent transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-12 text-center text-sand-50">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 text-sand-100 hover:text-accent transition-colors text-lg"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-wider font-medium transition-all duration-300 ${
                  !product.in_stock
                    ? 'bg-noir-700 text-graphite-400 cursor-not-allowed'
                    : added
                    ? 'bg-green-700 text-sand-50'
                    : 'bg-accent text-noir-950 hover:bg-accent-light'
                }`}
              >
                {!product.in_stock ? (
                  'Нет в наличии'
                ) : added ? (
                  <>
                    <Check size={18} /> Добавлено
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} strokeWidth={1.5} />
                    Добавить в корзину
                  </>
                )}
              </button>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-widest text-graphite-400 mb-4">Особенности</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-sand-100">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Materials */}
            {product.materials && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-widest text-graphite-400 mb-2">Материалы</h3>
                <p className="text-sm text-sand-100">{product.materials}</p>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-noir-700/40">
              {[
                { icon: Truck, label: 'Бесплатная доставка' },
                { icon: Shield, label: 'Гарантия качества' },
                { icon: RefreshCw, label: 'Возврат 14 дней' },
              ].map(item => (
                <div key={item.label} className="text-center">
                  <item.icon size={20} strokeWidth={1} className="text-accent mx-auto mb-2" />
                  <p className="text-xs text-graphite-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-serif text-2xl md:text-3xl text-sand-50 mb-10">Вам также может понравиться</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
