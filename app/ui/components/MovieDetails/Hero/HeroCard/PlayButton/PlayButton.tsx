/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { PlayButtonProps } from '../HeroCard.model';
import { paymentType } from '@/app/lib/lists/paymentType';
import { Loading } from './LoadingSkeleton';
/**
 * PlayButton Component
 *
 * The `PlayButton` component provides a button to play a movie based on its payment type and the user's session.
 *
 * @component
 * @param {PlayButtonProps} props - Props for configuring the PlayButton component.
 * @param {MovieType} props.movieData - Movie data used to determine the payment type and navigate to the appropriate route.
 * @param {Array} props.userMovieList - List of movies owned by the user.
 * @param {boolean} props.isLoading - Loading state of the component.
 * @param {Function} props.handlePay - Callback function to handle the payment process.
 * @returns {JSX.Element} - JSX element representing the PlayButton component.
 * @example
 * // Example usage of PlayButton component in a React component
 * const MovieDetails = () => {
 *   const movieData = //...fetch movie data from API or other source
 *   const userMovieList = //...fetch user's movie list from API or other source
 *   const isLoading = //...loading state from API or other source
 *   const handlePayment = () => {
 *     //...logic to handle the payment process
 *   }
 *   return (
 *     <PlayButton movieData={movieData} userMovieList={userMovieList} isLoading={isLoading} handlePay={handlePayment} />
 *   );
 * };
 */
export function PlayButton({
  movieData,
  userMovieList,
  isLoading,
  handlePay,
}: PlayButtonProps): JSX.Element {
  const { slug, payment_type } = movieData;
  const { data: session, status } = useSession();
  const router = useRouter();
  /**
   * Handles the click event based on the payment type and user session.
   * Navigates to the appropriate route.
   */
  const handleClick = () => {
    // If no payment type is selected, navigate to free watch route.
    if (payment_type === paymentType.free) {
      router.push(`/peliculas/watch-free/${slug}`);
    }
    // If payment type is 'DO' or 'PT'
    else if (
      payment_type === paymentType.totalPay ||
      payment_type === paymentType.mandatoryDonation
    ) {
      // If the user is logged in, navigate to the regular watch route.j
      if (session) {
        if (userMovieList.length > 0) {
          const movieExists = userMovieList.some((obj) => obj.slug === slug);
          if (movieExists) {
            router.push(`/peliculas/watch/${slug}`);
          } else {
            // Pay for the movie
            handlePay();
          }
        } else {
          // Pay for the movie
          handlePay();
        }
        // If the user is not logged in, prompt sign-in.
      } else {
        signIn();
      }
    }
  };
  if (isLoading || status === 'loading') {
    return <Loading />;
  }
  return (
    <>
      <button
        type="button"
        title="Reproducir"
        className={`button-outlined p-4 w-20 aspect-square rounded-full ring-customNeutral-200 md:hover:ring-customNeutral-50 hover:bg-dark-900/30 md:hover:bg-primary-500 md:hover:scale-110 transition ease-in-out duration-300 ${isLoading ? 'opacity-10 animate-pulse' : ''}`}
        onClick={handleClick}
        disabled={isLoading}
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
