// React Imports
import React from 'react';
import { PeliculasPageProps } from '../PeliculasPage.model';

// Third-Party Library Imports
import { fetchMovieDetails } from '@/app/lib/data/fetch';
import { CDN_IMAGES_BASE_URL } from '@/app/lib/data/urls';
import NotFound from '@/app/not-found';

// Internal Imports
import { Hero } from '@/app/ui/components/MovieDetails/Hero';
/**
 * Generates metadata for the movie page.
 * @param {PeliculasPageProps} params - The parameters containing movie ID.
 * @returns {Object} Metadata for the movie page.
 */
export async function generateMetadata({ params }: PeliculasPageProps) {
  const movieId: string = params.id;
  // Fetches movie information based on the provided ID
  const { data }: { data: MovieDetailsAPI[] } =
    await fetchMovieDetails(movieId);
  const movieData = data[0];
  // If movie data is not available, show a 404 page
  if (!movieData) {
    return <NotFound />;
  }
  // Construct metadata object
  return {
    title: `Cinergia | ${movieData?.name}`,
    description: movieData?.whySee,
    keyworks: [
      'Cinergia',
      'cine en streaming',
      'películas',
      'cortometrajes',
      'largometrajes',
      'géneros cinematográficos',
      'explorar géneros',
      'últimas películas',
      'cinematografía',
      'plataforma de streaming',
      movieData?.name,
      ...movieData.genres,
    ],
    authors: { name: 'Cinergia' },
    openGraph: {
      type: 'website',
      title: `Cinergia | ${movieData?.name}`,
      description: movieData?.whySee,
      siteName: 'Cinergia',
      images: [`${CDN_IMAGES_BASE_URL}${movieData?.image1}`],
    },
  };
}
/**
 * Movie page component.
 * @param {PeliculasPageProps} params - The parameters containing movie ID.
 * @returns {JSX.Element} The movie page component.
 */
export default function page({ params }: PeliculasPageProps): JSX.Element {
  const movieId: string = params.id;
  // Render the Hero component with the movie ID
  return <Hero movieId={movieId} />;
}
