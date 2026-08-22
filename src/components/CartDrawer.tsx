import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useRouter } from '@/lib/router';
import { formatPrice } from '@/lib/types';

export function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  const { navigate } = useRouter();

  const handleCheckout = () => {
    closeCart();
    clearCart();
    navigate('/about');
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-60 bg-noir-950/80 backdrop-blur-sm transition-opacity duration-400 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 z-70 w-full max-w-md bg-noir-900 border-l border-noir-700/50 flex flex-col transition-transform duration-500 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-noir-700/50">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} strokeWidth={1.5} className="text-accent" />
            <h2 className="font-serif text-xl text-sand-50">Корзина</h2>
            {totalItems > 0 && (
              <span className="text-xs text-graphite-400">({totalItems})</span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="text-sand-100 hover:text-accent transition-colors p-1"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-16 h-16 rounded-full border border-noir-600 flex items-center justify-center mb-6">
              <ShoppingBag size={24} strokeWidth={1} className="text-graphite-400" />
            </div>
            <p className="font-serif text-xl text-sand-50 mb-2">Корзина пуста</p>
            <p className="text-sm text-graphite-400 mb-8 max-w-xs">
              Добавьте предметы ритуала, чтобы начать путешествие заботы о себе.
            </p>
            <button
              onClick={() => { closeCart(); navigate('/catalog'); }}
              className="px-8 py-3 border border-accent text-accent text-sm tracking-wider hover:bg-accent hover:text-noir-950 transition-all duration-300"
            >
              В каталог
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4">
              {items.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-4 py-5 border-b border-noir-700/40 last:border-0"
                >
                  <div className="w-20 h-24 bg-noir-800 overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm text-sand-50 leading-tight mb-1 truncate">
                      {item.product.name}
                    </h3>
                    {item.selectedColor && (
                      <p className="text-xs text-graphite-400 mb-2">
                        Цвет: {item.selectedColor.name}
                      </p>
                    )}
                    <p className="text-sm text-accent mb-3">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-noir-600">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-sand-100 hover:text-accent transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm text-sand-50">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-sand-100 hover:text-accent transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xs text-graphite-400 hover:text-accent transition-colors"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t border-noir-700/50 bg-noir-950/50">
              <div className="flex justify-between items-center mb-5">
                <span className="text-sm text-graphite-300">Итого</span>
                <span className="font-serif text-xl text-sand-50">{formatPrice(totalPrice)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-accent text-noir-950 text-sm tracking-wider font-medium hover:bg-accent-light transition-all duration-300"
              >
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
