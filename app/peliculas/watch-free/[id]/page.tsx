// External Libraries
import { fetchMovieDetails } from '@/app/lib/data/fetch';
// Internal Components and Pages
import { VideoSection } from '@/app/ui/components/Watch/VideoSection';
import NotFound from '@/app/not-found';
// Page-specific Models and Constants
import { WatchFreePageProps } from '../../PeliculasPage.model';
import { CDN_IMAGES_BASE_URL } from '@/app/lib/data/urls';
import { paymentType } from '@/app/lib/lists/paymentType';
/**
 * WatchPage Component
 *
 * The WatchPage component displays detailed information about a specific movie.
 * It fetches movie details based on the provided ID, including data like images and videos.
 *
 * @component
 * @param {Object} props - The properties object containing the movie ID.
 * @param {Object} props.params - The parameters object containing the movie ID.
 * @param {string} props.params.id - The ID of the movie to be displayed.
 * @returns {Promise<JSX.Element>} - A Promise resolving to the JSX element representing the WatchPage component.
 * @example
 * // Usage in a Next.js page component
 * import WatchPage from '@/app/pages/WatchPage';
 *
 * const MovieDetails = ({ params }) => {
 *   return <WatchPage params={params} />;
 * };
 *
 * export default MovieDetails;
 */
export async function generateMetadata({ params }: WatchFreePageProps) {
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
      images: [`${CDN_IMAGES_BASE_URL}${movieData?.image1}`],
    },
  };
}
export default async function WatchFreePage({
  params,
}: WatchFreePageProps): Promise<JSX.Element> {
  const movieId: string = params.id;
  // Fetches movie information based on the provided ID
  const { data }: { data: MovieDetailsAPI[] } =
    await fetchMovieDetails(movieId);
  const movieData = data[0];
  if (!movieData || movieData.payment_type !== paymentType.free) {
    return <NotFound />;
  }
  const { image2 } = movieData;
  return (
    <div
      className="z-[60] fixed inset-0 w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('${CDN_IMAGES_BASE_URL}${image2}')`,
      }}
    >
      <div className="flex justify-center items-center w-full h-screen bg-dark-950/80 backdrop-blur-sm">
        <VideoSection movieData={movieData} />
      </div>
    </div>
  );
}
