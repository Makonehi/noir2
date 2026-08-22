import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useRouter } from '@/lib/router';
import { useCart } from '@/lib/cart';

const NAV_LINKS = [
  { label: 'Каталог', path: '/catalog' },
  { label: 'Конфигуратор', path: '/configurator' },
  { label: 'Журнал', path: '/journal' },
  { label: 'О бренде', path: '/about' },
];

export function Header() {
  const { path, navigate } = useRouter();
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = path === '/';
  const headerBg = scrolled || !isHome || mobileOpen
    ? 'bg-noir-950/95 backdrop-blur-md border-b border-noir-700/50'
    : 'bg-transparent border-b border-transparent';

  const handleNav = (to: string) => {
    navigate(to);
    setMobileOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => handleNav('/')}
              className="font-serif text-2xl tracking-[0.3em] text-sand-50 hover:text-accent transition-colors duration-300"
            >
              NOIR
            </button>

            <nav className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map(link => {
                const active = path.startsWith(link.path);
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className={`text-sm tracking-wider transition-colors duration-300 relative group ${
                      active ? 'text-accent' : 'text-sand-100 hover:text-accent'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={openCart}
                className="relative p-2 text-sand-100 hover:text-accent transition-colors duration-300"
                aria-label="Корзина"
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-noir-950 text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-sand-100"
                aria-label="Меню"
              >
                {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-noir-700/50 animate-slide-down">
            <nav className="flex flex-col px-6 py-6 gap-5">
              {NAV_LINKS.map(link => (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`text-sm tracking-wider text-left transition-colors ${
                    path.startsWith(link.path) ? 'text-accent' : 'text-sand-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
