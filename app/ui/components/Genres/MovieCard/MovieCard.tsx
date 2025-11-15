// Import necessary dependencies and types
'use client';
// React Imports
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
// Internal Model
import { MovieCardProps } from './MovieCard.model';
// Internal Routes
import { routesPaths } from '@/app/routes/routes';
/**
 * MovieCard Component
 *
 * A React component representing a card displaying information about a movie.
 * It uses the 'next/image' component for lazy loading and responsive image rendering.
 *
 * @component
 * @param {Object} props - The properties of the MovieCard component.
 * @param {MoviesGenre} props.movieData - Information about the movie to be displayed.
 * @returns {JSX.Element} - JSX element representing the MovieCard component.
 */
export function MovieCard({ movieData }: MovieCardProps) {
  const { name, releaseYear, slug, image1, urlId, payment_type } = movieData;
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    /**
     * Effect to check if the image is in view and set the visibility state.
     */
    if (inView && !isImageVisible) {
      setIsImageVisible(true);
    }
  }, [inView, isImageVisible]);

  const linkUrl =
    urlId == null ? `${routesPaths?.detailMovie}` : `${routesPaths?.movies}`;

  return (
    <li className="group rounded-lg overflow-hidden bg-bgSecondaryDark shadow-md hover:shadow-lg transition-all">
      <Link className="flex flex-col w-full" href={`${linkUrl}/${slug}`}>
        {/* Imagen horizontal */}
        <span className="relative w-full aspect-[2/3] md:aspect-video">
          {/* Ícono flotante */}
          {payment_type === 'DO' && (
            <div className="absolute bottom-2 right-2 z-20">
              <Image
                src="/images/iconoPago.png"
                alt="Pago mínimo"
                width={30}
                height={30}
                className="object-contain drop-shadow-lg"
              />
            </div>
          )}

          {/* Imagen principal */}
          <Image
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1080px) 100vw, 1536px"
            src={image1}
            alt={name || 'Movie Card'}
            placeholder="blur"
            loading="lazy"
            className="object-cover object-center md:group-hover:scale-110 transition-all duration-200 ease-in"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
          />
        </span>

        {/* Información debajo */}
        <div className="flex flex-col w-full p-3 bg-bgSecondaryDark">
          {/* Título */}
          <span className="text-base font-semibold text-white line-clamp-1">
            {name}
          </span>

          {/* Año */}
          <span className="text-sm text-gray-300 font-medium">
            {releaseYear !== undefined && new Date(releaseYear).getFullYear()}
          </span>

          {/* Pago por donación */}
          {/* {payment_type === "DO" && (
          <div className="flex items-center gap-2 mt-2">
            <Image
              src="/images/iconoPago.png"
              alt="Pago mínimo"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="text-xs text-yellow-400 font-semibold">
              Donación mínima
            </span>
          </div>
        )} */}
        </div>
      </Link>
    </li>
  );
}
