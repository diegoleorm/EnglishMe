import { createContext, ReactNode, useContext } from 'react';
import { Tema, temaPirata } from './colors';

// GoMilo ya no tiene modo claro/oscuro: una sola identidad visual pirata
// consistente en toda la app (como Royal Kingdom). Se conserva la misma
// forma del contexto (modoTema, cambiarTema, alternarTema, cargando) para
// no romper ninguna pantalla que ya los use — por ejemplo, si existe un
// botón de "cambiar tema" en configuracion.tsx, seguirá funcionando sin
// errores, simplemente ya no cambia nada visible.
type TipoTema = 'claro' | 'oscuro';

interface ThemeContextType {
  modoTema: TipoTema;
  colores: Tema;
  cambiarTema: (modo: TipoTema) => void;
  alternarTema: () => void;
  cargando: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value: ThemeContextType = {
    modoTema: 'oscuro',
    colores: temaPirata,
    cambiarTema: () => {},
    alternarTema: () => {},
    cargando: false,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTema debe usarse dentro de ThemeProvider');
  }
  return context;
}
