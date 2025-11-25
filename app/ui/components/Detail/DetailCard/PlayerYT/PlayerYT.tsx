'use client';

import { useState, useEffect } from 'react';
import { Loading } from '../../../shared/VideoPlayer/LoadingSkeleton';
import ReactPlayer from 'react-player';
import { VerPageProps } from '@/app/pelicula/PeliculaPage.model';
import { incrementMovieViews } from '@/app/lib/data/incrementViews';

export function PlayerYT({ params }: VerPageProps) {
  const urlId: string = params.urlId;
  const movieId: number = Number(params.id);
  const urlVideo = `https://www.youtube.com/watch?v=${urlId}`;

  const [loading, setLoading] = useState<boolean>(true);
  const [hasCountedView, setHasCountedView] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);

  // Detectar si es iOS (iPhone, iPad, iPod) // Detectar si es iOS (iPhone, iPad, iPod)
  useEffect(() => {
    const checkIsIOS = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
      const isIPadOS =
        navigator.maxTouchPoints > 1 && /macintosh/.test(userAgent);

      return isIOSDevice || isIPadOS;
    };

    setIsIOS(checkIsIOS());
  }, []);

  const handleLoad = async () => {
    setLoading(false);

    if (!hasCountedView && movieId) {
      await incrementMovieViews(movieId);
      setHasCountedView(true);
    }
  };

  const handleReady = () => {
    setLoading(false);
  };

  const handlePlaying = async () => {
    setLoading(false);

    if (!hasCountedView && movieId) {
      await incrementMovieViews(movieId);
      setHasCountedView(true);
    }
  };

  return (
    <div className="relative w-full h-full">
      {loading && <Loading />}

      {isIOS ? (
        // Iframe para iOS
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${urlId}?autoplay=0&controls=1&rel=0&modestbranding=1&playsinline=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: '16/9',
            border: 'none',
          }}
          onLoad={handleLoad}
        />
      ) : (
        // ReactPlayer para otros dispositivos
        <>
          <ReactPlayer
            id="ytVideoPlayer"
            className={`w-full h-full ${loading ? 'hidden' : ''}`}
            src={urlVideo}
            style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
            autoPlay
            controls
            onPlay={handlePlaying}
            onReady={handleReady}
          />
        </>
      )}
    </div>
  );
}
