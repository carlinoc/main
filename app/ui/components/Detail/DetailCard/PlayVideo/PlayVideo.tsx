'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlayVideoProps } from '../DetailCard.model';

export function PlayVideo({movieData}: PlayVideoProps): JSX.Element {
    const { slug } = movieData;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      router.push(`/pelicula/ver/${slug}`);
    };

    return (
    <>
      <button
        type="button"
        title="Reproducir"
        className={`button-outlined p-4 w-20 aspect-square rounded-full ring-customNeutral-200 md:hover:ring-customNeutral-50 hover:bg-dark-900/30 md:hover:bg-primary-500 md:hover:scale-110 transition ease-in-out duration-300 ${isLoading ? 'opacity-10 animate-pulse' : ''}`}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-player-play-filled h-full w-full aspect-square"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
            strokeWidth={0}
            fill="currentColor"
          />
        </svg>
      </button>
    </>
  );
}