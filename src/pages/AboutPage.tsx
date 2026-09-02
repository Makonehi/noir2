import { ArrowRight } from 'lucide-react';
import { useRouter } from '@/lib/router';

export function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/17640382/pexels-photo-17640382.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
            alt="О бренде NOIR"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir-950/60 to-noir-950" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <p className="text-xs tracking-[0.3em] text-accent uppercase mb-6 animate-fade-in">О бренде</p>
          <h1 className="font-serif text-4xl md:text-6xl text-sand-50 leading-tight max-w-3xl animate-fade-up text-balance">
            Создано для тех, кто слушает тело
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl text-sand-50 leading-tight mb-8 text-balance">
            Мы начали с простого вопроса
          </h2>
          <div className="space-y-6 text-base text-graphite-300 leading-[1.8]">
            <p>
              Почему аксессуары для тела и сексуального велнеса выглядят так, будто их стыдятся?
              Яркие кислотные цвета, агрессивный маркетинг, неловкая упаковка. Мы хотели другое.
            </p>
            <p>
              NOIR родился из убеждения, что забота о теле — это не постыдная покупка, а осознанный
              ритуал. Как утренний кофе, как вечерняя ванна, как момент, когда вы принадлежите себе.
            </p>
            <p>
              Мы обратились к эстетике дорогих косметических брендов и техники Apple: минимализм,
              премиальные материалы, безупречная упаковка. Никаких пошлых надписей, никаких кричащих
              цветов. Только форма, материал и тактильность.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 md:py-32 bg-noir-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-xs tracking-[0.3em] text-accent uppercase mb-4 text-center">Принципы</p>
          <h2 className="font-serif text-3xl md:text-4xl text-sand-50 text-center mb-16">
            Три правила, которым мы не изменяем
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                number: '01',
                title: 'Материал прежде всего',
                text: 'Медицинская керамика, натуральные масла, шёлк Mulberry. Мы не используем пластик там, где может быть керамика. Не используем силикон там, где может быть камень.',
              },
              {
                number: '02',
                title: 'Форма как скульптура',
                text: 'Каждый предмет проектируется как объект искусства. Мы работаем с промышленными дизайнерами, а не с маркетологами. Форма следует за телом, а не за трендом.',
              },
              {
                number: '03',
                title: 'Молчаливая роскошь',
                text: 'Упаковка, которую не стыдно оставить на столе. Бренд, который не кричит. Продукт, который говорит сам за себя — через тактильность, вес, температуру.',
              },
            ].map((principle, i) => (
              <div key={principle.number} className="text-center animate-fade-up" style={{ animationDelay: `${i * 150}ms` }}>
                <p className="font-serif text-5xl text-accent/30 mb-4">{principle.number}</p>
                <h3 className="font-serif text-xl text-sand-50 mb-4">{principle.title}</h3>
                <p className="text-sm text-graphite-300 leading-relaxed max-w-xs mx-auto">{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] bg-noir-800 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/7815027/pexels-photo-7815027.jpeg?auto=compress&cs=tinysrgb&h=900&w=720"
                alt="Процесс создания"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-accent uppercase mb-6">Процесс</p>
              <h2 className="font-serif text-3xl md:text-4xl text-sand-50 leading-tight mb-6 text-balance">
                От эскиза до ритуала
              </h2>
              <div className="space-y-6">
                {[
                  { step: 'Дизайн', text: 'Промышленные дизайнеры создают форму, повторяющую анатомию тела.' },
                  { step: 'Материалы', text: 'Каждый материал проходит тест на гипоаллергенность и тактильность.' },
                  { step: 'Производство', text: 'Керамика обжигается при 1300°C. Масла холодного отжима. Шёлк 22 мм.' },
                  { step: 'Контроль', text: 'Каждое изделие проверяется вручную. Дефекты недопустимы.' },
                  { step: 'Ритуал', text: 'Упаковка открывается как подарок. Инструкция к ритуалу внутри.' },
                ].map((item, i) => (
                  <div key={item.step} className="flex gap-4 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                    <span className="font-serif text-sm text-accent flex-shrink-0 w-8 pt-1">{`0${i + 1}`}</span>
                    <div>
                      <h3 className="text-sm text-sand-50 mb-1">{item.step}</h3>
                      <p className="text-sm text-graphite-400 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-24 md:py-32 bg-noir-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-accent uppercase mb-6">Ответственность</p>
          <h2 className="font-serif text-3xl md:text-4xl text-sand-50 leading-tight mb-8 text-balance">
            Долговечность — лучшая устойчивость
          </h2>
          <p className="text-base text-graphite-300 leading-relaxed mb-12">
            Мы не делаем одноразовые вещи. Наша керамика служит десятилетиями. Масла в стеклянных
            флаконах. Упаковка из переработанного картона. Мы верим, что лучший способ заботиться
            о планете — создавать вещи, которые не нужно заменять.
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-noir-950 text-sm tracking-wider font-medium hover:bg-accent-light transition-all duration-400"
          >
            Открыть каталог
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] text-accent uppercase mb-4 text-center">Вопросы</p>
          <h2 className="font-serif text-3xl md:text-4xl text-sand-50 text-center mb-16">
            Часто спрашивают
          </h2>
          <div className="space-y-4">
            {[
              { q: 'Доставка и возврат', a: 'Бесплатная доставка по России при заказе от 10 000 ₽. Возврат в течение 14 дней, кроме косметики и масел.' },
              { q: 'Гарантия', a: 'Пожизненная гарантия на керамические изделия. 2 года на аксессуары. Масла и косметика — 18 месяцев.' },
              { q: 'Уход за изделиями', a: 'Керамику можно мыть тёплой водой с мылом. Масла хранить вдали от солнца. Шёлк — стирка в холодной воде.' },
              { q: 'Конфиденциальность', a: 'Упаковка не содержит логотипов и описаний содержимого. На посылке указано только «NOIR Studio».' },
            ].map((faq, i) => (
              <details
                key={i}
                className="group border border-noir-700/40 hover:border-noir-600 transition-colors"
              >
                <summary className="flex justify-between items-center p-5 cursor-pointer list-none">
                  <span className="text-sm text-sand-50">{faq.q}</span>
                  <span className="text-accent text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-graphite-400 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
