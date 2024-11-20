// Import necessary dependencies and components
import NotFound from '@/app/not-found';
import { fetchMovieDetails } from '@/app/lib/data/fetch';
import { HeroCard } from './HeroCard';
import { HerProps } from './Hero.model';
/**
 * Hero Component for Movie Details Page
 *
 * The `Hero` component fetches and displays the main information of a movie using a `HeroCard`.
 *
 * @module Hero
 * @component
 * @param {Object} props - Component properties.
 * @param {number} props.movieId - The ID of the movie for which to retrieve and display information.
 * @returns {Promise<JSX.Element>} - A Promise resolving to a JSX element representing the `Hero` component.
 * @throws {Error} - Throws an error if there is an issue fetching the movie details.
 *
 * @example
 * // Usage of the `Hero` component in some other component or view
 * import { Hero } from './path-to-Hero-component';
 *
 * // Inside your component or view
 * const MovieDetailsPage = () => {
 *   const movieId = 123; // Replace with the actual movie ID
 *   return <Hero movieId={movieId} />;
 * };
 */
export async function Hero({ movieId }: HerProps): Promise<JSX.Element> {
  // Fetches movie information based on the provided ID
  const { data }: { data: MovieDetailsAPI[] } =
    await fetchMovieDetails(movieId);
  const movieData = data[0];
  if (!movieData) {
    return <NotFound />;
  }
  // Renders the HeroCard with the movie information
  return <HeroCard movieData={movieData} />;
}
