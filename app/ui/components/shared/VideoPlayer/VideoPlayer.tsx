'use client';
import { useState, useEffect } from 'react';
import { VideoPlayerProps } from './VideoPlayer.model';
import { Loading } from './LoadingSkeleton';
import { incrementMovieViews } from '@/app/lib/data/incrementViews';
/**
 * VideoPlayer Component
 *
 * The VideoPlayer component embeds a video player using an iframe to display a specific video.
 * It supports fullscreen mode and is preconfigured with specific options for Muse.ai videos.
 *
 * @component
 * @param {VideoPlayerProps} props - The component props.
 * @returns {JSX.Element} - JSX element representing the VideoPlayer component.
 *
 * @example
 * // Example usage of VideoPlayer in a parent component
 * import { VideoPlayer } from './path-to-VideoPlayer-component';
 *
 * const ParentComponent = () => {
 *   return (
 *     <div>
 *       <h1>My Awesome Page</h1>
 *       <VideoPlayer />
 *     </div>
 *   );
 * };
 */
export function VideoPlayer(props: VideoPlayerProps & { movieId?: number }) {
  // State to manage loading status
  const { movieId, ...iframeProps } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [viewCounted, setViewCounted] = useState<boolean>(false);

  // Effect to handle iframe load event and update loading state
  useEffect(() => {
    const iframe = document.querySelector('#videoPlayer');
    const handleLoad = () => {
      setLoading(false);

      // Contar vista solo una vez
      if (!viewCounted && movieId) {
        // Ejecutar el fetch en una función async separada
        const countView = async () => {
          try {
            await incrementMovieViews(movieId!);
            setViewCounted(true);
          } catch (error) {
            console.error('Error al incrementar vistas:', error);
          }
        };
        countView();
      }
    };
    // Add event listener for iframe load
    iframe.addEventListener('load', handleLoad);
    // Clean up the event listener on component unmount
    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, [movieId, viewCounted]);
  // Return JSX representation of the VideoPlayer component
  return (
    <div className="relative w-full h-full">
      {loading && <Loading />}
      <iframe
        id="videoPlayer"
        className={`w-full h-full ${loading ? 'hidden' : ''}`}
        {...iframeProps}
      />
    </div>
  );
}
