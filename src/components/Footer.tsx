import { Instagram, Mail } from 'lucide-react';
import { useRouter } from '@/lib/router';

const FOOTER_LINKS = {
  shop: [
    { label: 'Каталог', path: '/catalog' },
    { label: 'Конфигуратор', path: '/configurator' },
    { label: 'Журнал', path: '/journal' },
    { label: 'О бренде', path: '/about' },
  ],
  info: [
    { label: 'Доставка и возврат', path: '/about' },
    { label: 'Уход за изделиями', path: '/journal' },
    { label: 'Гарантия', path: '/about' },
    { label: 'Конфиденциальность', path: '/about' },
  ],
};

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-noir-900 border-t border-noir-700/40 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl tracking-[0.3em] text-sand-50 mb-4">NOIR</h3>
            <p className="text-sm text-graphite-400 leading-relaxed max-w-xs">
              Премиальные аксессуары для тела и сексуального велнеса. Искусство заботы о себе.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-graphite-400 mb-4">Магазин</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-sand-100 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-graphite-400 mb-4">Информация</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.info.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-sand-100 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-graphite-400 mb-4">Связь</h4>
            <p className="text-sm text-sand-100 mb-4">care@noir.studio</p>
            <div className="flex gap-4">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-full border border-noir-600 flex items-center justify-center text-sand-100 hover:border-accent hover:text-accent transition-all duration-300"
              >
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-full border border-noir-600 flex items-center justify-center text-sand-100 hover:border-accent hover:text-accent transition-all duration-300"
              >
                <Mail size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-noir-700/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-graphite-400">
            © 2026 NOIR. Все права защищены.
          </p>
          <p className="text-xs text-graphite-400">
            Создано с заботой о теле и вниманием к деталям.
          </p>
        </div>
      </div>
    </footer>
  );
}
