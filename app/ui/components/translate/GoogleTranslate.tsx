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

export function GoogleTranslate({ isOpen, onClose }: GoogleTranslateProps) {
  const [selectedLang, setSelectedLang] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    // Agregar el script solo una vez
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }

    // Definir función de inicialización global
    (window as any).googleTranslateElementInit = function() {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'es',
          includedLanguages: 'en,pt,fr,de,it,ja,ko,zh-CN',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // Si el script ya está cargado, inicializar
    if ((window as any).google?.translate) {
      (window as any).googleTranslateElementInit();
    }
  }, []);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  };

  const changeLanguage = (langCode: string) => {
    setIsTranslating(true);
    setSelectedLang(langCode);

    // Establecer la cookie de Google Translate
    const domain = window.location.hostname;
    setCookie('googtrans', `/es/${langCode || 'es'}`, 365);
    setCookie('googtrans', `/es/${langCode || 'es'}`, 365);
    
    // Forzar actualización
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
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
          <h3 className="text-lg font-semibold text-white">Seleccionar idioma</h3>
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
              <p className="text-neutral-300 text-sm">Aplicando traducción...</p>
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
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-white font-medium text-left flex-1">{lang.name}</span>
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
                  Haz clic en un idioma para traducir toda la página
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Widget oculto */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <style jsx global>{`
        /* Ocultar banner de Google Translate */
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        
        body {
          top: 0px !important;
        }

        .skiptranslate {
          display: none !important;
        }

        body > .skiptranslate {
          display: none !important;
        }

        .goog-te-balloon-frame {
          display: none !important;
        }

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