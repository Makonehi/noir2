import { useState, useMemo } from 'react';
import { Check, RotateCw, ShoppingBag } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/types';

interface MaterialOption {
  id: string;
  name: string;
  description: string;
  priceModifier: number;
  texture: string;
}

interface ColorOption {
  name: string;
  hex: string;
  gradient: string;
}

interface TextureOption {
  id: string;
  name: string;
  description: string;
  priceModifier: number;
}

const MATERIALS: MaterialOption[] = [
  { id: 'ceramic', name: 'Керамика', description: 'Медицинская керамика, удерживает температуру', priceModifier: 0, texture: 'smooth' },
  { id: 'porcelain', name: 'Фарфор', description: 'Белый фарфор ручной работы, премиальная отделка', priceModifier: 3000, texture: 'porcelain' },
  { id: 'obsidian', name: 'Обсидиан', description: 'Натуральный вулканический камень, матовая поверхность', priceModifier: 5000, texture: 'stone' },
];

const COLORS: ColorOption[] = [
  { name: 'Графит', hex: '#2e2e2e', gradient: 'linear-gradient(135deg, #3a3a3a, #1a1a1a)' },
  { name: 'Обсидиан', hex: '#0a0a0a', gradient: 'linear-gradient(135deg, #1a1a1a, #000000)' },
  { name: 'Бежевый', hex: '#ddd3c5', gradient: 'linear-gradient(135deg, #ebe4da, #c9bca8)' },
  { name: 'Терракота', hex: '#c9bca8', gradient: 'linear-gradient(135deg, #cba791, #a07b65)' },
  { name: 'Шампань', hex: '#e8e1d6', gradient: 'linear-gradient(135deg, #f3efe9, #ddd3c5)' },
  { name: 'Медь', hex: '#b8917a', gradient: 'linear-gradient(135deg, #cba791, #8a6b55)' },
];

const TEXTURES: TextureOption[] = [
  { id: 'matte', name: 'Матовая', description: 'Бархатистая поверхность, мягкое свечение', priceModifier: 0 },
  { id: 'glossy', name: 'Глянцевая', description: 'Зеркальный блеск, гладкое скольжение', priceModifier: 1500 },
  { id: 'satin', name: 'Сатиновая', description: 'Полуматовая, баланс между блеском и теплом', priceModifier: 2000 },
];

const SHAPES = [
  { id: 'classic', name: 'Классическая', description: 'Эргономичная форма, универсальная' },
  { id: 'wave', name: 'Волна', description: 'Изогнутый силуэт, плавные линии' },
  { id: 'drop', name: 'Капля', description: 'Овальная форма, мягкий контакт' },
];

const BASE_PRICE = 12900;

export function ConfiguratorPage() {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [texture, setTexture] = useState(TEXTURES[0]);
  const [shape, setShape] = useState(SHAPES[0]);
  const [rotation, setRotation] = useState(0);
  const [added, setAdded] = useState(false);

  const totalPrice = useMemo(() => {
    return BASE_PRICE + material.priceModifier + texture.priceModifier;
  }, [material, texture]);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      navigate('/catalog');
    }, 2000);
  };

  const shapeStyle = useMemo(() => {
    if (shape.id === 'classic') return 'rounded-full';
    if (shape.id === 'wave') return 'rounded-[40%_60%_40%_60%/60%_40%_60%_40%]';
    return 'rounded-[50%_50%_50%_50%/60%_60%_40%_40%]';
  }, [shape]);

  const textureFilter = useMemo(() => {
    if (texture.id === 'glossy') return 'brightness(1.15) contrast(1.05)';
    if (texture.id === 'satin') return 'brightness(1.05) contrast(1.02)';
    return 'brightness(0.95) contrast(0.98)';
  }, [texture]);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.3em] text-accent uppercase mb-4">3D-конфигуратор</p>
          <h1 className="font-serif text-4xl md:text-5xl text-sand-50 mb-4">Создайте свой предмет</h1>
          <p className="text-sm text-graphite-400 max-w-xl mx-auto">
            Выберите материал, цвет и текстуру. Каждое изделие создаётся индивидуально.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Preview */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="aspect-square bg-gradient-to-b from-noir-800 to-noir-900 overflow-hidden flex items-center justify-center relative">
              {/* Ambient glow */}
              <div
                className="absolute w-3/4 h-3/4 rounded-full opacity-30 blur-3xl transition-all duration-700"
                style={{ background: color.gradient }}
              />

              {/* Product shape */}
              <div
                className="relative w-56 h-56 md:w-72 md:h-72 transition-all duration-700 ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                <div
                  className={`w-full h-full ${shapeStyle} transition-all duration-700 shadow-2xl`}
                  style={{
                    background: color.gradient,
                    filter: textureFilter,
                    boxShadow: `0 30px 80px -20px ${color.hex}80, inset 0 -20px 40px rgba(0,0,0,0.3), inset 0 20px 40px rgba(255,255,255,0.08)`,
                  }}
                >
                  {/* Highlight overlay */}
                  <div className="w-full h-full rounded-full opacity-40"
                    style={{
                      background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.25) 0%, transparent 50%)',
                    }}
                  />
                </div>
              </div>

              {/* Controls */}
              <button
                onClick={() => setRotation(r => r + 90)}
                className="absolute bottom-6 right-6 w-12 h-12 rounded-full border border-noir-600 text-sand-100 hover:border-accent hover:text-accent transition-all flex items-center justify-center"
              >
                <RotateCw size={18} strokeWidth={1.5} />
              </button>

              {/* Shape indicator */}
              <div className="absolute top-6 left-6 text-xs text-graphite-400 tracking-wider">
                {shape.name} · {material.name}
              </div>
            </div>

            {/* Price + Add */}
            <div className="mt-6 p-6 bg-noir-900 border border-noir-700/40">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs text-graphite-400 mb-1">Итоговая цена</p>
                  <p className="font-serif text-2xl text-accent">{formatPrice(totalPrice)}</p>
                </div>
                <p className="text-xs text-graphite-400 max-w-[140px] text-right">
                  Срок изготовления: 14–21 день
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 flex items-center justify-center gap-3 text-sm tracking-wider font-medium transition-all duration-300 ${
                  added ? 'bg-green-700 text-sand-50' : 'bg-accent text-noir-950 hover:bg-accent-light'
                }`}
              >
                {added ? (
                  <>
                    <Check size={18} /> Заказ оформлен
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} strokeWidth={1.5} />
                    Заказать изделие
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-10">
            {/* Shape */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-graphite-400 mb-5">Форма</h3>
              <div className="grid grid-cols-3 gap-3">
                {SHAPES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s)}
                    className={`p-4 border text-center transition-all duration-300 ${
                      shape.id === s.id
                        ? 'border-accent bg-accent/5'
                        : 'border-noir-700 hover:border-graphite-400'
                    }`}
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 bg-graphite-300 ${s.id === 'classic' ? 'rounded-full' : s.id === 'wave' ? 'rounded-[40%_60%_40%_60%/60%_40%_60%_40%]' : 'rounded-[50%_50%_50%_50%/60%_60%_40%_40%]'}`} />
                    <p className="text-xs text-sand-50">{s.name}</p>
                  </button>
                ))}
              </div>
              <p className="text-xs text-graphite-400 mt-3">{shape.description}</p>
            </div>

            {/* Material */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-graphite-400 mb-5">Материал</h3>
              <div className="space-y-3">
                {MATERIALS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m)}
                    className={`w-full p-4 border text-left transition-all duration-300 flex justify-between items-start ${
                      material.id === m.id
                        ? 'border-accent bg-accent/5'
                        : 'border-noir-700 hover:border-graphite-400'
                    }`}
                  >
                    <div>
                      <p className="text-sm text-sand-50 mb-1">{m.name}</p>
                      <p className="text-xs text-graphite-400">{m.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      {m.priceModifier > 0 ? (
                        <p className="text-xs text-accent">+{formatPrice(m.priceModifier)}</p>
                      ) : (
                        <p className="text-xs text-graphite-400">Базовая</p>
                      )}
                      {material.id === m.id && (
                        <Check size={14} className="text-accent mt-1 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-graphite-400 mb-5">
                Цвет: <span className="text-sand-50">{color.name}</span>
              </h3>
              <div className="grid grid-cols-6 gap-3">
                {COLORS.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c)}
                    className={`aspect-square rounded-full border-2 transition-all duration-300 ${
                      color.name === c.name ? 'border-accent scale-110' : 'border-noir-600 hover:border-graphite-400'
                    }`}
                    style={{ background: c.gradient }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Texture */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-graphite-400 mb-5">Текстура</h3>
              <div className="grid grid-cols-3 gap-3">
                {TEXTURES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTexture(t)}
                    className={`p-4 border text-center transition-all duration-300 ${
                      texture.id === t.id
                        ? 'border-accent bg-accent/5'
                        : 'border-noir-700 hover:border-graphite-400'
                    }`}
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${
                      t.id === 'glossy' ? 'bg-graphite-200' : t.id === 'satin' ? 'bg-graphite-300' : 'bg-noir-600'
                    }`} style={{
                      filter: t.id === 'glossy' ? 'brightness(1.2)' : t.id === 'satin' ? 'brightness(1.05)' : 'none',
                    }} />
                    <p className="text-xs text-sand-50">{t.name}</p>
                    {t.priceModifier > 0 && (
                      <p className="text-xs text-accent mt-1">+{formatPrice(t.priceModifier)}</p>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-graphite-400 mt-3">{texture.description}</p>
            </div>

            {/* Summary */}
            <div className="p-6 bg-noir-900 border border-noir-700/40">
              <h3 className="text-xs uppercase tracking-widest text-graphite-400 mb-4">Конфигурация</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-sand-100">
                  <span className="text-graphite-400">Форма</span>
                  <span>{shape.name}</span>
                </div>
                <div className="flex justify-between text-sand-100">
                  <span className="text-graphite-400">Материал</span>
                  <span>{material.name}</span>
                </div>
                <div className="flex justify-between text-sand-100">
                  <span className="text-graphite-400">Цвет</span>
                  <span>{color.name}</span>
                </div>
                <div className="flex justify-between text-sand-100">
                  <span className="text-graphite-400">Текстура</span>
                  <span>{texture.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
