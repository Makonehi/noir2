import { CartProvider } from '@/lib/cart';
import { RouterProvider, useRouter, parseRoute } from '@/lib/router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { ProductPage } from '@/pages/ProductPage';
import { ConfiguratorPage } from '@/pages/ConfiguratorPage';
import { JournalPage } from '@/pages/JournalPage';
import { ArticlePage } from '@/pages/ArticlePage';
import { AboutPage } from '@/pages/AboutPage';

function PageRouter() {
  const { path } = useRouter();
  const route = parseRoute(path);

  switch (route.page) {
    case 'home':
      return <HomePage />;
    case 'catalog':
      return <CatalogPage />;
    case 'product':
      return <ProductPage slug={route.param!} />;
    case 'configurator':
      return <ConfiguratorPage />;
    case 'journal':
      return <JournalPage />;
    case 'article':
      return <ArticlePage slug={route.param!} />;
    case 'about':
      return <AboutPage />;
    default:
      return <HomePage />;
  }
}

function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <div className="min-h-screen bg-noir-950 flex flex-col">
          <Header />
          <main className="flex-1">
            <PageRouter />
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </CartProvider>
    </RouterProvider>
  );
}

export default App;
