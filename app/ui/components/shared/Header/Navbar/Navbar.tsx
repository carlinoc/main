'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { NavbarSM } from '@/app/ui/components/shared/Header/Navbar/NavbarSM';
import { NavbarLG } from '@/app/ui/components/shared/Header/Navbar/NavbarLG';
import { MyListPreview } from './MyListPreview';
import { GoogleTranslate } from '@/app/ui/components/translate/GoogleTranslate';
import cinergiaLogo from '@/public/cinergiaLogoWeb1.svg';
import { routesPaths } from '@/app/routes/routes';

export function Navbar(): JSX.Element {
  const { data: session } = useSession();
  const [openMyList, setOpenMyList] = useState(false);
  const [openTranslate, setOpenTranslate] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openMyList ? 'hidden' : 'visible';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [openMyList]);

  const links = [
    {
      name: 'Inicio',
      href: routesPaths?.home,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
        </svg>
      ),
    },
    {
      name: 'contenido',
      href: routesPaths?.content,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M8 4l0 16" />
          <path d="M16 4l0 16" />
          <path d="M4 8l4 0" />
          <path d="M4 16l4 0" />
          <path d="M4 12l16 0" />
          <path d="M16 8l4 0" />
          <path d="M16 16l4 0" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="relative flex justify-center items-center w-full h-16 lg:h-[4.5rem] border-b border-borderNeutral-50/10 bg-bgPrimaryDark/50">
      <div className="relative flex justify-between items-center w-full h-full p-4 backdrop-blur-md">
        {/* Logo */}
        <Link
          href={routesPaths?.home}
          className="flex justify-center items-center gap-2 h-full"
        >
          <figure className="relative w-28 md:w-32 h-full">
            <Image
              fill
              sizes="100%"
              src={cinergiaLogo}
              alt="Logo Cinergia"
              priority
              className="w-full h-full"
            />
          </figure>
        </Link>

        {/* Contenedor derecho: idioma + menús */}
        <div className="flex items-center gap-3">
          {/* Botón idioma */}
          <button
            onClick={() => setOpenTranslate(!openTranslate)}
            className={`text-neutral-200 hover:text-white transition-colors p-2 rounded-lg ${
              openTranslate ? 'bg-white/10' : ''
            }`}
            title="Cambiar idioma"
            aria-label="Abrir selector de idioma"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-language"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 5h7" />
              <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
              <path d="M5 9c-.003 2.144 2.952 3.908 6.7 4" />
              <path d="M12 20l4 -9l4 9" />
              <path d="M19.1 18h-6.2" />
            </svg>
          </button>

          {/* Menús */}
          <NavbarSM
            links={links}
            handleMyListState={setOpenMyList}
            myListState={openMyList}
          />
          <NavbarLG
            links={links}
            handleMyListState={setOpenMyList}
            myListState={openMyList}
          />
        </div>
      </div>

      {/* Google Translate Modal */}
      <GoogleTranslate
        isOpen={openTranslate}
        onClose={() => setOpenTranslate(false)}
      />

      {/* MyList Preview */}
      {session && (
        <section
          aria-hidden={!openMyList}
          className={`fixed inset-0 flex justify-end w-full h-screen transform transition-all duration-500 ${
            !openMyList ? 'translate-x-full' : ''
          }`}
        >
          <MyListPreview
            handleMyListState={setOpenMyList}
            myListState={openMyList}
          />
        </section>
      )}
    </nav>
  );
}
