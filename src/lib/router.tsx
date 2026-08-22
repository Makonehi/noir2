import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface RouterContextValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function getCurrentPath(): string {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const handleHashChange = () => {
      setPath(getCurrentPath());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', handleHashChange);
    if (!window.location.hash) {
      window.location.hash = '/';
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((to: string) => {
    window.location.hash = to;
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within RouterProvider');
  return context;
}

export function parseRoute(path: string): { page: string; param?: string } {
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { page: 'home' };
  if (parts[0] === 'catalog' && parts[1]) return { page: 'product', param: parts[1] };
  if (parts[0] === 'catalog') return { page: 'catalog' };
  if (parts[0] === 'configurator') return { page: 'configurator' };
  if (parts[0] === 'journal' && parts[1]) return { page: 'article', param: parts[1] };
  if (parts[0] === 'journal') return { page: 'journal' };
  if (parts[0] === 'about') return { page: 'about' };
  return { page: 'home' };
}
