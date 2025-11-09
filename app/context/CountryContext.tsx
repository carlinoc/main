'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface CountryData {
  countryCode: string | null;
  countryName: string | null;
  isLoading: boolean;
  error: string | null;
}

interface CountryContextType extends CountryData {
  refetchCountry: () => Promise<void>;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

interface CountryProviderProps {
  children: ReactNode;
}

export function CountryProvider({ children }: CountryProviderProps) {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [countryName, setCountryName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const detectCountry = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Intenta obtener desde localStorage primero (cache)
      const cachedCountry = localStorage.getItem('userCountry');
      const cacheTime = localStorage.getItem('userCountryTime');
      const now = Date.now();

      // Si hay cache y tiene menos de 24 horas, usarlo
      if (
        cachedCountry &&
        cacheTime &&
        now - parseInt(cacheTime) < 72 * 60 * 60 * 1000
      ) {
        const cached = JSON.parse(cachedCountry);
        setCountryCode(cached.code);
        setCountryName(cached.name);
        setIsLoading(false);
        //console.log('🌍 País desde cache:', cached.name, `(${cached.code})`);
        return;
      }

      // Detectar país desde API
      //console.log('🌍 Detectando país del usuario...');
      const response = await fetch('https://ipapi.co/json/');

      if (!response.ok) {
        throw new Error('Error al detectar ubicación');
      }

      const data = await response.json();

      setCountryCode(data.country_code);
      setCountryName(data.country_name);

      // Guardar en localStorage para próximas visitas
      localStorage.setItem(
        'userCountry',
        JSON.stringify({
          code: data.country_code,
          name: data.country_name,
        }),
      );
      localStorage.setItem('userCountryTime', now.toString());

      //console.log('✅ País detectado:', data.country_name, `(${data.country_code})`);
    } catch (err) {
      console.error('❌ Error detectando país:', err);
      setError('No se pudo detectar el país');
      // Por defecto, asumir internacional (no Perú)
      setCountryCode('UNKNOWN');
      setCountryName('Internacional');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    detectCountry();
  }, []);

  const refetchCountry = async () => {
    // Limpiar cache y volver a detectar
    localStorage.removeItem('userCountry');
    localStorage.removeItem('userCountryTime');
    await detectCountry();
  };

  return (
    <CountryContext.Provider
      value={{
        countryCode,
        countryName,
        isLoading,
        error,
        refetchCountry,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry debe ser usado dentro de CountryProvider');
  }
  return context;
}

// Helper para verificar si es Perú
export function useIsPeru() {
  const { countryCode } = useCountry();
  return countryCode === 'PE';
}
