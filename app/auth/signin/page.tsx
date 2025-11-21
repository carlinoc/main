'use client';
// Import React and React-related libraries
import { useEffect, useState } from 'react';
// Import Next.js libraries and components
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
// Import internal utilities and components
import { validateUser } from '@/app/lib/data/createUser';
import { routesPaths } from '@/app/routes/routes';
import { popupCenter } from '@/app/lib/utils/popupCenter';
import { Loading } from './LoadingSkeleton';
// Import images and assets
import cinergiaLogo from '@/public/cinergiaLogoWeb3.svg';
import { useCountry } from '@/app/context/CountryContext';

/**
 * SignInPage Component
 *
 * The SignInPage component represents the login page for the application.
 * It allows users to sign in using their Google accounts and provides a visually appealing
 * interface with background images, Cinergia logo, and a Google sign-in button.
 *
 * @component
 * @returns {JSX.Element} - JSX element representing the SignInPage component.
 * @example
 * // Usage in a parent component or route
 * import SignInPage from '@/app/ui/components/SignInPage';
 * //...
 * return (
 *   <SignInPage />
 * );
 */
export default function SignInPage(): JSX.Element {
  // Use next-auth/react hook to get session information
  const { data: session, status } = useSession();
  const router = useRouter();
  const { countryCode } = useCountry();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Leer desde localStorage cuando cargue
  useEffect(() => {
    const stored = localStorage.getItem('cinergia_accept_terms');
    if (stored === 'true') {
      setAcceptedTerms(true);
    }
  }, []);

  // Guardar cuando cambie
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setAcceptedTerms(value);
    localStorage.setItem('cinergia_accept_terms', value.toString());
  };

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        await validateUser({
          user: session.user as UserDataAPI,
          countryId: countryCode,
        });
        router.back();
      }
    };
    fetchData();
  }, [router, session]);

  // Function to handle Google sign-in
  const handleSigninGoogle = () => {
    if (!acceptedTerms) return;
    popupCenter(routesPaths?.authGoogle, 'Iniciar sesión');
  };

  // Loading state while checking for session information
  if (status === 'loading') {
    return <Loading />;
  }

  // Render the main content of the component
  return (
    <div className="z-[60] fixed inset-0 w-screen h-screen bg-bgPrimaryDark">
      {/* SCROLL GENERAL EN MOBILE */}
      <div className="overflow-y-auto w-full h-full">
        <div className="w-full flex flex-col items-center space-y-10 lg:flex-row lg:justify-center lg:space-y-0">
          {/* LEFT SECTION */}
          <section
            className="
        relative w-full 
        lg:w-3/5 
        min-h-[750px]              /* Mantiene altura en móviles */
        lg:h-screen
        bg-black 
        overflow-hidden 
        border-borderNeutral-700 
        md:border-r
      "
          >
            <div className="absolute top-5 right-5 w-16 h-16 md:w-32 md:h-32 lg:w-40 lg:h-40">
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
                <circle cx="100" cy="100" r="80" fill="#EC4899" />
              </svg>
            </div>

            {/* CONTENIDO */}
            <div className="relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12 py-10 lg:px-16">
              {/* TITULOS */}
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
                  Descubre Latinoamérica
                </h1>
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                  en sus películas
                </h2>
              </div>

              {/* GRID RESPONSIVO */}
              <div
                className="
            w-full max-w-5xl 
            grid grid-cols-1 
            gap-10
            md:gap-14
            lg:grid-cols-2 
            lg:gap-12 
            items-start md:items-center
          "
              >
                {/* INFO */}
                <div className="space-y-6 md:space-y-8">
                  {/* Recuerda */}
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-teal-400">
                      ¡Recuerda!
                    </h3>
                    <div className="space-y-3 text-neutral-300 text-sm md:text-base">
                      <p className="leading-relaxed">
                        Al comprar un contenido, el Usuario obtiene una licencia
                        personal y permanente para verlo sin caducidad dentro de
                        la Plataforma Cinergia.
                      </p>
                      <p className="leading-relaxed">
                        El acceso se mantiene mientras la cuenta esté activa y
                        la plataforma continúe operando.
                      </p>
                    </div>
                  </div>

                  {/* PASOS */}
                  <div className="space-y-4">
                    {[
                      'Accede a tu cuenta',
                      'Ingresa a tu billetera electrónica',
                      '¡Realiza una donación y listo!',
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold text-lg md:text-xl">
                          {i + 1}
                        </span>
                        <p className="text-white text-sm md:text-base lg:text-lg pt-1 md:pt-2">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* ICONOS */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                    {[
                      { src: '/images/yapeseeklogo.png', w: 'w-10 md:w-16' },
                      { src: '/images/visalogo.png', w: 'w-12 md:w-16' },
                      { src: '/images/mastercardlogo.png', w: 'w-12 md:w-16' },
                      { src: '/images/amexlogo.png', w: 'w-12 md:w-16' },
                      { src: '/images/dinerslogo.png', w: 'w-12 md:w-16' },
                    ].map((img, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center"
                      >
                        <img
                          src={img.src}
                          className={`${img.w}`}
                          alt="logo pago"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* MOCKUP CELULAR */}
                <div className="flex justify-center lg:justify-end hidden md:grid">
                  <div className="relative w-40 sm:w-48 md:w-64 lg:w-72">
                    <div className="relative aspect-[9/19] bg-gradient-to-b from-teal-400 to-emerald-500 rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl">
                      <div className="w-full h-full bg-neutral-900 rounded-[1.7rem] md:rounded-[2.4rem] overflow-hidden flex items-center justify-center p-5 md:p-8">
                        <div className="w-full aspect-square bg-white rounded-xl md:rounded-2xl flex items-center justify-center">
                          <div className="w-4/5 h-4/5 bg-black/10 rounded-lg"></div>
                        </div>
                      </div>
                      <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-16 md:w-24 h-4 md:h-6 bg-neutral-900 rounded-b-xl md:rounded-b-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT SECTION (FORM) */}
          <section className="flex justify-center w-full lg:w-2/5 px-4">
            <div
              className="
          w-full max-w-xl 
          bg-bgPrimaryDark 
          pt-10 pb-16 
          space-y-10 
          rounded-md 
        "
            >
              {/* Logo + Título */}
              <section className="flex flex-col items-center gap-4">
                <figure className="relative w-14 aspect-square">
                  <Image
                    fill
                    src={cinergiaLogo}
                    alt="Logo Cinergia"
                    className="w-full h-full"
                  />
                </figure>

                <h1 className="heading-2 font-bold text-center text-white">
                  Inicia sesión en Cinergia
                </h1>
              </section>

              {/* Formulario */}
              <form className="w-full pt-6 space-y-6">
                {/* Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={handleCheckbox}
                    className="w-5 h-5 cursor-pointer accent-teal-400"
                  />
                  <label className="text-white text-sm leading-tight">
                    Aceptar los{' '}
                    <a
                      href="/terminos-y-condiciones"
                      target="_blank"
                      className="text-teal-400 underline"
                    >
                      Términos y condiciones
                    </a>{' '}
                    para continuar
                  </label>
                </div>

                {/* Botón Google */}
                <button
                  type="button"
                  disabled={!acceptedTerms}
                  className={`button-primary padding-button w-full ${
                    !acceptedTerms ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleSigninGoogle}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 aspect-square"
                    viewBox="0 0 48 48"
                    strokeWidth={2}
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                    />
                  </svg>
                  Continuar con Google
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
