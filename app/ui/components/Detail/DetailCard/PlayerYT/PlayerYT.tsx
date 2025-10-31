'use client';

import { useState } from 'react';
import { Loading } from '../../../shared/VideoPlayer/LoadingSkeleton';
import ReactPlayer from 'react-player';
import { VerPageProps } from '@/app/pelicula/PeliculaPage.model';
import { incrementMovieViews } from '@/app/lib/data/incrementViews';

export function PlayerYT({params}: VerPageProps) {
    const urlId: string = params.urlId;
    const movieId: number = Number(params.id);
    const urlVideo = `https://www.youtube.com/watch?v=${urlId}`;
        
    const [loading, setLoading] = useState<boolean>(true);
    const [hasCountedView, setHasCountedView] = useState<boolean>(false);

    const handlePlaying = async () => {
    setLoading(false);

    // Solo contar la vista la primera vez que empieza a reproducirse
    if (!hasCountedView && movieId) {
      await incrementMovieViews(movieId);
      setHasCountedView(true);
    }
  };

    return (
        <div className="relative w-full h-full">
            {loading && <Loading />}

            <ReactPlayer
                id="ytVideoPlayer"
                className={`w-full h-full ${loading ? 'hidden' : ''}`}
                src={urlVideo}  
                style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                autoPlay
                controls
                onPlay={handlePlaying}
            />
        </div>
    );
}