// Import necessary dependencies and types
import { Suspense } from 'react';
import { fetchHomeSection, fetchMovieDetails } from '@/app/lib/data/fetch';
import { RecommendedMovieBanner } from '@/app/ui/components/Home/RecommendedMovieBanner';
import { homeSections } from '@/app/lib/lists/homeSectionSlugs';
import { Loading } from './LoadingSkeleton';
/**
 * WeekMovieSection Component
 *
 * A React component that fetches details of a specific movie and displays it as the recommended movie of the week.
 *
 * @component
 * @returns {Promise<JSX.Element>} - Promise resolving to JSX element representing the WeekMovieSection component.
 * @throws {Error} - Throws an error if there's an issue fetching data for the WeekMovieSection component.
 * @example
 * // Example usage of WeekMovieSection component in a React component or route
 * const HomePage = () => {
 *   return (
 *     <WeekMovieSection />
 *   );
 * };
 */
export async function WeekMovieSection(): Promise<JSX.Element> {
  try {
    // Fetch data for the "Película de la semana" section
    const { data }: HomeSectionRequestAPI = await fetchHomeSection({
      section: homeSections?.weekMovieSection,
    });
    // Extract relevant information from the fetched data
    const sectionInfo: HomeSectionAPI = data[0];
    const movieList: MovieAPI[] = sectionInfo?.movies;
    const firstMovie: MovieAPI = movieList[0];
    // Fetch details for the recommended movie
    const { data: firstMovieData }: { data: MovieDetailsAPI[] } =
      await fetchMovieDetails(firstMovie?.slug);
    const firstMovieDetails: MovieDetailsAPI = firstMovieData[0];
    /**
     * Render the JSX for the WeekMovieSection component
     */
    return (
      <>
        <Suspense fallback={<Loading />}>
          <RecommendedMovieBanner
            titleBanner="Película de la semana"
            background={sectionInfo?.background}
            movieData={firstMovieDetails}
          />
        </Suspense>
      </>
    );
  } catch (error) {
    // Handle errors and throw an informative error message
    throw new Error(`Error fetching data for WeekMovieSection: ${error}`);
  }
}
