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
import siningCover from '@/public/images/siningCover.jpg';
import cinergiaLogo from '@/public/cinergiaLogoWeb3.svg';

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

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        await validateUser({ user: session.user as UserDataAPI });
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
          <figure className="relative w-full lg:w-3/5 aspect-square lg:h-screen border-borderNeutral-700 md:border-r">
            <Image
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1080px) 100vw, 1536px"
              src={siningCover}
              alt={'Cover Login'}
              placeholder="blur"
              priority
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
            />
          </figure>
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
