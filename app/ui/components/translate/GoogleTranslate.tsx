'use client';
import { useEffect, useState } from 'react';

interface GoogleTranslateProps {
  isOpen: boolean;
  onClose: () => void;
}

const languages = [
  { code: '', name: 'Español (Original)', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
];

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: {
          new (options: Record<string, unknown>, id: string): void;
          InlineLayout?: {
            SIMPLE: unknown;
          };
        };
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export function GoogleTranslate({ isOpen, onClose }: GoogleTranslateProps) {
  const [selectedLang, setSelectedLang] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  // Función para detectar el idioma actual
  const detectCurrentLanguage = (): string => {
    const currentLang = getCookie('googtrans');
    if (currentLang) {
      const match = currentLang.match(/\/[a-z-]+\/([a-z-]+)/i);
      if (match && match[1] && match[1] !== 'es') {
        return match[1];
      }
    }

    // También verificar en el HTML si Google Translate ya tradujo
    const htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang && htmlLang !== 'es' && htmlLang !== 'en') {
      return htmlLang;
    }

    return '';
  };

  useEffect(() => {
    // Detectar el idioma cada vez que se abre el modal
    if (isOpen) {
      const detectedLang = detectCurrentLanguage();
      setSelectedLang(detectedLang);
    }
  }, [isOpen]);

  useEffect(() => {
    // Detectar el idioma actual al montar el componente
    const detectedLang = detectCurrentLanguage();
    setSelectedLang(detectedLang);

    // Agregar el script solo una vez
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }

    // Definir función de inicialización global
    window.googleTranslateElementInit = function () {
      const TranslateElement = window.google?.translate?.TranslateElement;
      if (TranslateElement) {
        new TranslateElement(
          {
            pageLanguage: 'es',
            includedLanguages: 'en,pt,fr,de,it,ja,ko,zh-CN',
            layout: TranslateElement.InlineLayout?.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element',
        );
      }
    };

    // Si el script ya está cargado, inicializar directamente
    if (window.google?.translate) {
      window.googleTranslateElementInit?.();
    }
  }, []);

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  const deleteCookie = (name: string): void => {
    // Eliminar para el dominio actual
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    // Eliminar para el dominio raíz (importante en producción)
    const domain = window.location.hostname;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;

    // Eliminar para subdominios
    const rootDomain = domain.split('.').slice(-2).join('.');
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`;
  };

  const setCookie = (name: string, value: string, days: number): void => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;

    // Establecer para el dominio actual
    document.cookie = `${name}=${value};${expires};path=/`;

    // Establecer también para el dominio raíz (importante en producción)
    const domain = window.location.hostname;
    document.cookie = `${name}=${value};${expires};path=/;domain=${domain}`;
  };

  const changeLanguage = (langCode: string): void => {
    setIsTranslating(true);
    setSelectedLang(langCode);

    // Si es español (original), eliminar todas las cookies de traducción
    if (!langCode || langCode === 'es') {
      deleteCookie('googtrans');
      deleteCookie('googtrans');

      // Eliminar también el frame de Google Translate si existe
      const gtFrame = document.querySelector('.goog-te-banner-frame');
      if (gtFrame) {
        gtFrame.remove();
      }

      // Limpiar atributos del HTML que Google Translate agrega
      const htmlElement = document.documentElement;
      htmlElement.removeAttribute('class');
      htmlElement.removeAttribute('style');

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      // Para otros idiomas, establecer la cookie normalmente
      setCookie('googtrans', `/es/${langCode}`, 365);

      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget && !isTranslating) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        onClick={handleBackdropClick}
      />

      {/* Modal */}
      <div className="fixed top-20 right-4 z-[9999] bg-bgPrimaryDark border border-borderNeutral-50/20 rounded-lg shadow-2xl w-80 max-w-[calc(100vw-2rem)]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-borderNeutral-50/10">
          <h3 className="text-lg font-semibold text-white">
            Seleccionar idioma
          </h3>
          <button
            onClick={onClose}
            disabled={isTranslating}
            className="text-neutral-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded disabled:opacity-50"
            aria-label="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {isTranslating ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white"></div>
              <p className="text-neutral-300 text-sm">
                {!selectedLang
                  ? 'Restaurando idioma original...'
                  : 'Aplicando traducción...'}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {languages.map((lang) => (
                  <button
                    key={lang.code || 'original'}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      selectedLang === lang.code
                        ? 'bg-white/20 border border-white/30'
                        : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/10'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-white font-medium text-left flex-1">
                      {lang.name}
                    </span>
                    {selectedLang === lang.code && (
                      <svg
                        className="flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-borderNeutral-50/10">
                <p className="text-neutral-400 text-xs text-center">
                  {selectedLang
                    ? 'Selecciona "Español (Original)" para volver al idioma original'
                    : 'Haz clic en un idioma para traducir toda la página'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Widget oculto */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      {/* Estilos globales para ocultar banner de Google Translate */}
      <style jsx global>{`
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        body {
          top: 0px !important;
        }
        .skiptranslate,
        body > .skiptranslate,
        .goog-te-balloon-frame,
        #goog-gt-tt {
          display: none !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
      `}</style>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </>
  );
}
