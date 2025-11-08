'use client';
// Import React and React-related libraries
import { useEffect } from 'react';
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
  
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        await validateUser({ user: session.user as UserDataAPI, countryId: countryCode });
        router.back();
      }
    };
    fetchData();
  }, [router, session]);

  // Function to handle Google sign-in
  const handleSigninGoogle = () => {
    popupCenter(routesPaths?.authGoogle, 'Iniciar sesión');
  };

  // Loading state while checking for session information
  if (status === 'loading') {
    return <Loading />;
  }

  // Render the main content of the component
  return (
    <div className="z-[60] fixed inset-0 w-screen lg:h-screen bg-bgPrimaryDark">
      <div className="overflow-y-auto w-full h-full">
        <div className="w-full flex flex-col items-center space-y-4 lg:flex-row lg:justify-center lg:space-y-0">
          
          {/* LEFT SECTION - New Design */}
          <section className="relative w-full lg:w-3/5 aspect-square lg:h-screen border-borderNeutral-700 md:border-r bg-black overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64">
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
                <path fill="#3B82F6" d="M0,100 Q50,50 100,100 T200,100 L200,200 L0,200 Z" />
              </svg>
            </div>
            <div className="absolute top-10 right-10 w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40">
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-70">
                <circle cx="100" cy="100" r="80" fill="#EC4899" />
              </svg>
            </div>

            <div className="relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 py-8">
              {/* Title Section */}
              <div className="text-center mb-8 lg:mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
                  Descubre Latinoamérica
                </h1>
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                  en sus películas
                </h2>
              </div>

              {/* Two Column Layout */}
              <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Column - Info Section */}
                <div className="space-y-6 lg:space-y-8">
                  {/* Recuerda Section */}
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-teal-400">
                      ¡Recuerda!
                    </h3>
                    <div className="space-y-3 text-neutral-300 text-sm md:text-base">
                      <p className="leading-relaxed">
                        Tienes un mes para ver cada uno de tus contenidos y desde el momento que inicias la reproducción tienes una semana para verlo nuevamente.
                      </p>
                      <p className="leading-relaxed">
                        Tendrás acceso a todo contenido que adquieras desde donde ingreses con tu cuenta.
                      </p>
                    </div>
                  </div>

                  {/* Steps Section */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold text-lg md:text-xl">
                        1
                      </span>
                      <p className="text-white text-sm md:text-base lg:text-lg pt-1 md:pt-2">Accede a tu cuenta</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold text-lg md:text-xl">
                        2
                      </span>
                      <p className="text-white text-sm md:text-base lg:text-lg pt-1 md:pt-2">Ingresa a tu billetera electrónica</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-bold text-lg md:text-xl">
                        3
                      </span>
                      <p className="text-white text-sm md:text-base lg:text-lg pt-1 md:pt-2">¡Realiza una donacion y listo!</p>
                    </div>
                  </div>

                  {/* Payment Icons */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center">
                      <img src="/images/yapeseeklogo.png" alt="Yape" className="w-8 md:w-16"/>
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center">
                      <img src="/images/visalogo.png" alt="Visa" className="w-10 md:w-16"/>
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center">
                      <img src="/images/mastercardlogo.png" alt="Mastercard" className="w-10 md:w-16"/>
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center">
                      <img src="/images/amexlogo.png" alt="Amex" className="w-10 md:w-16"/>
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center">
                      <img src="/images/dinerslogo.png" alt="Dinners" className="w-10 md:w-16"/>
                    </div>
                  </div>
                </div>

                {/* Right Column - Phone Mockup */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative w-48 md:w-64 lg:w-72">
                    {/* Phone Frame */}
                    <div className="relative aspect-[9/19] bg-gradient-to-b from-teal-400 to-emerald-500 rounded-[2.5rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl">
                      <div className="w-full h-full bg-neutral-900 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex items-center justify-center p-6 md:p-8">
                        {/* QR Code Placeholder */}
                        <div className="w-full aspect-square bg-white rounded-xl md:rounded-2xl flex items-center justify-center">
                          <div className="w-4/5 h-4/5 bg-black/10 rounded-lg flex items-center justify-center">
                            <svg 
                              viewBox="0 0 100 100" 
                              className="w-full h-full"
                              fill="currentColor"
                            >
                              <rect x="0" y="0" width="20" height="20" />
                              <rect x="30" y="0" width="10" height="10" />
                              <rect x="50" y="0" width="10" height="10" />
                              <rect x="70" y="0" width="30" height="30" />
                              <rect x="0" y="30" width="10" height="10" />
                              <rect x="30" y="30" width="20" height="20" />
                              <rect x="60" y="30" width="10" height="10" />
                              <rect x="0" y="50" width="10" height="10" />
                              <rect x="20" y="50" width="20" height="20" />
                              <rect x="50" y="50" width="20" height="10" />
                              <rect x="80" y="50" width="20" height="20" />
                              <rect x="0" y="70" width="30" height="30" />
                              <rect x="40" y="70" width="10" height="10" />
                              <rect x="60" y="70" width="10" height="30" />
                              <rect x="80" y="80" width="20" height="20" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {/* Phone Notch */}
                      <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-20 md:w-24 h-5 md:h-6 bg-neutral-900 rounded-b-xl md:rounded-b-2xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT SECTION - Original Form */}
          <section className="flex justify-center w-full lg:w-2/5">
            <div className="w-11/12 max-w-2xl px-4 py-8 lg:w-10/12 space-y-10 rounded-md divide-y divide-borderNeutral-800">
              <section className="flex flex-col items-center gap-4">
                <figure className="relative w-14 aspect-square">
                  <Image
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1080px) 100vw, 1536px"
                    src={cinergiaLogo}
                    alt={'Logo Cinergia'}
                    placeholder="blur"
                    priority
                    className="w-full h-full"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                  />
                </figure>
                <h1 className="heading-2 font-bold text-center text-textColorNeutral-50">
                  Inicia sesión en Cinergia
                </h1>
              </section>
              <form className="w-full pt-10">
                <button
                  type="button"
                  className="button-primary padding-button w-full"
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