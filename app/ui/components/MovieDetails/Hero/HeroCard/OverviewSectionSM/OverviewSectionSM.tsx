import { OverviewSectionProps } from '../HeroCard.model';
/**
 * OverviewSectionSM Component
 *
 * The `OverviewSectionSM` component displays a simplified version of movie details,
 * including the overview and reasons to watch it. This version is designed for small screens.
 *
 * @component
 * @param {OverviewSectionProps} props - Props for configuring the OverviewSectionSM component.
 * @param {string} props.overview - Overview or synopsis of the movie.
 * @param {string} props.whySeeIt - Reasons to watch the movie.
 * @returns {JSX.Element} - JSX element representing the OverviewSectionSM component.
 * @example
 * // Example usage of OverviewSectionSM component in a React component
 * const MovieDetailsPageSM = () => {
 *   const overviewText = //...fetch overview text from API or other source
 *   const whySeeItText = //...fetch whySeeIt text from API or other source
 *   return (
 *     <OverviewSectionSM overview={overviewText} whySeeIt={whySeeItText} />
 *   );
 * };
 */
export function OverviewSectionSM({
  overview,
  whySeeIt,
}: OverviewSectionProps): JSX.Element {
  return (
    <section className="md:hidden w-full bg-dark-100">
      <div className="flex flex-col items-center gap-4 w-11/12 mx-auto py-8 ">
        <article className="w-full">
          <span className="span-base font-bold text-textColorNeutral-700">
            Sinopsis
          </span>
          <p className="paragraph-sm font-medium text-textColorNeutral-600">
            {overview}
          </p>
        </article>
        <article className="w-full">
          <span className="span-base font-bold text-textColorNeutral-700">
            Por qué verla
          </span>
          <p className="paragraph-sm font-medium text-textColorNeutral-600">
            {whySeeIt}
          </p>
        </article>
      </div>
    </section>
  );
}
