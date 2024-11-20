'use client';
import { useState, useEffect } from 'react';
import { VideoPlayerProps } from './VideoPlayer.model';
import { Loading } from './LoadingSkeleton';
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
export function VideoPlayer(props: VideoPlayerProps) {
  // State to manage loading status
  const [loading, setLoading] = useState<boolean>(true);
  // Effect to handle iframe load event and update loading state
  useEffect(() => {
    const iframe = document.querySelector('#videoPlayer');
    const handleLoad = () => {
      setLoading(false);
    };
    // Add event listener for iframe load
    iframe.addEventListener('load', handleLoad);
    // Clean up the event listener on component unmount
    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, []);
  // Return JSX representation of the VideoPlayer component
  return (
    <div className="relative w-full h-full">
      {loading && <Loading />}
      <iframe
        id="videoPlayer"
        className={`w-full h-full ${loading ? 'hidden' : ''}`}
        {...props}
      />
    </div>
  );
}
