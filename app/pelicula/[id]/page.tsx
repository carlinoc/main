import React from "react";
import { PeliculaPageProps } from "../PeliculaPage.model";
import { Detail } from "@/app/ui/components/Detail";
import { fetchMovieDetails } from "@/app/lib/data/fetch";
import NotFound from "@/app/not-found";

export async function generateMetadata({ params }: PeliculaPageProps) {
  const movieId: string = params.id;
  // Fetches movie information based on the provided ID
  const { data }: { data: MovieDetailsAPI[] } = await fetchMovieDetails(movieId);
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
      images: [`${movieData?.image1}`],
    },
  };
}

export default function page({ params }: PeliculaPageProps): JSX.Element {
    const movieId: string = params.id;

    return <Detail movieId={movieId} />; 
}