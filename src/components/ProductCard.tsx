import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/types';
import { useRouter } from '@/lib/router';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { navigate } = useRouter();

  return (
    <button
      onClick={() => navigate(`/catalog/${product.slug}`)}
      className="group text-left flex flex-col animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[4/5] bg-noir-800 overflow-hidden mb-5">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-noir-950/0 group-hover:bg-noir-950/10 transition-colors duration-500" />
        {product.is_new && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-sand-50/90 text-noir-950 text-xs tracking-wider font-medium">
            Новинка
          </span>
        )}
        {!product.in_stock && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-noir-950/80 text-graphite-200 text-xs tracking-wider">
            Нет в наличии
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 mb-2">
        <Star size={12} className="text-accent fill-accent" strokeWidth={0} />
        <span className="text-xs text-graphite-400">{product.rating.toFixed(1)}</span>
        <span className="text-xs text-graphite-400 ml-2">
          {product.category === 'ceramics' && 'Керамика'}
          {product.category === 'oils' && 'Масла'}
          {product.category === 'accessories' && 'Аксессуары'}
        </span>
      </div>

      <h3 className="font-serif text-lg text-sand-50 leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
        {product.name}
      </h3>
      <p className="text-sm text-graphite-400 leading-relaxed line-clamp-2 mb-3">
        {product.short_description}
      </p>
      <p className="text-sm text-accent mt-auto">
        {formatPrice(product.price)}
      </p>
    </button>
  );
}
