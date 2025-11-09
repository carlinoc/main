import NotFound from '@/app/not-found';
import { VerPageProps } from '../../PeliculaPage.model';
import { PlayerSection } from '@/app/ui/components/Detail/PlayerSection/PlayerSection';
import { fetchMovieDetails } from '@/app/lib/data/fetch';
import { CDN_IMAGES_BASE_URL } from '@/app/lib/data/urls';

export async function generateMetadata({ params }: VerPageProps) {
  const movieId: string = params.id;
  // Fetches movie information based on the provided ID
  const { data }: { data: MovieDetailsAPI[] } =
    await fetchMovieDetails(movieId);
  const movieData = data[0];
  if (!movieData) {
    return <NotFound />;
  }
  return {
    title: `Cinergia | ${movieData?.name}`,
    description: movieData?.description,
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
      description: movieData?.description,
      siteName: 'Cinergia',
      images: [`${movieData?.image1}`],
    },
  };
}

export default async function VerPage({
  params,
}: VerPageProps): Promise<JSX.Element> {
  const movieId: string = params.id;

  const { data }: { data: MovieDetailsAPI[] } =
    await fetchMovieDetails(movieId);
  const movieData = data[0];
  if (!movieData) {
    return <NotFound />;
  }

  const pathBackground =
    movieData.urlId == null ? '' : `${CDN_IMAGES_BASE_URL}`;
  const backgroundImage = `${pathBackground}${movieData.image2}`;

  return (
    <div
      className="z-[60] absolute inset-0 w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      <div className="flex justify-center items-center w-full h-screen bg-dark-950/80 backdrop-blur-sm">
        <PlayerSection movieData={movieData} />
      </div>
    </div>
  );
}
