import Image from 'next/image';
import cinergiaLogo from '@/public/cinergiaLogoWeb3.svg';

export function Loading() {
  return (
    <div
      role="status"
      className="z-[60] fixed inset-0 w-screen lg:h-screen bg-bgPrimaryDark"
    >
      <div className="overflow-y-auto w-full h-full">
        <div className="w-full flex flex-col items-center space-y-4 lg:flex-row lg:justify-center lg:space-y-0">
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
                <div className="button-primary padding-button w-full bg-dark-700 text-transparent animate-pulse">
                  Continuar con Google
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
