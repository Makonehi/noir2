export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  short_description: string;
  description: string;
  materials: string;
  features: string[];
  image_url: string;
  gallery: string[];
  colors: ProductColor[];
  is_featured: boolean;
  is_new: boolean;
  rating: number;
  in_stock: boolean;
  created_at: string;
}

export interface ArticleBlock {
  type: 'heading' | 'paragraph' | 'quote';
  text: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ArticleBlock[];
  category: string;
  cover_image: string;
  author: string;
  read_time: number;
  published_at: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: ProductColor;
}

export const CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'ceramics', label: 'Керамика' },
  { id: 'oils', label: 'Масла' },
  { id: 'accessories', label: 'Аксессуары' },
] as const;

export const JOURNAL_CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'self-care', label: 'Забота о себе' },
  { id: 'health', label: 'Здоровье' },
  { id: 'intimacy', label: 'Интимность' },
  { id: 'wellness', label: 'Велнес' },
] as const;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString));
}
