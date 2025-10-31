import { ButtonHTMLAttributes } from 'react';

export interface DetailCardProps {
  movieData: MovieDetailsAPI;
}

export interface PlayVideoProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  movieData: MovieDetailsAPI;
}