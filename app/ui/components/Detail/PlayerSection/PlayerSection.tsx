import { Header } from '../../Watch/VideoSection/Header';
import { PlayerYT } from '../DetailCard/PlayerYT';
import { PlayerSectionProps } from './PlayerSection.model';

export function PlayerSection({ movieData }: PlayerSectionProps) {
  // Extract the unique identifier for the video
  const { ytUrlId } = movieData;

  // Return JSX representation of the VideoSection component
  return (
    <section className="flex flex-col justify-center items-center w-full">
      <article className="overflow-hidden relative w-11/12 md:w-9/12 rounded-sm border border-borderNeutral-50/10">
        <section className="lg:z-10 lg:absolute lg:top-0 lg:inset-x-0 w-full p-4 bg-gradient-to-b from-bgPrimaryDark/50 via-bgPrimaryDark/20 lg:to-transparent">
          <Header movieData={movieData} />
        </section>
        <article className="w-full aspect-video">
          <PlayerYT params={{ urlId: ytUrlId, id: String(movieData.id) }} />
        </article>
      </article>
    </section>
  );
}
