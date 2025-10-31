import NotFound from "@/app/not-found";
import { DetailProps } from "./Detail.model";
import { DetailCard } from "./DetailCard";
import { fetchMovieDetails } from '@/app/lib/data/fetch';

export async function Detail({movieId}: DetailProps): Promise<JSX.Element> {

  const { data }: { data: MovieDetailsAPI[] } = await fetchMovieDetails(movieId);
  const movieData = data[0];
  if (!movieData) {
    return <NotFound />;
  }
 
  return <DetailCard movieData={movieData} />;
}