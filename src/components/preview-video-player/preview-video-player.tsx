import { useEffect, useRef } from 'react';
import useVideoPlayer from '../../hooks/useVideoPlayer';

type VideoPlayerProps = {
  src: string;
  poster: string;
}

const PREVIEW_TIME_TO_START = 250;

function PreviewVideoPlayer({src, poster}: VideoPlayerProps):JSX.Element {
  const videoElementRef = useRef(null);
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  } = useVideoPlayer(videoElementRef);

  useEffect(() => {
    setTimeout(() => {
      togglePlay();
    }, PREVIEW_TIME_TO_START);
  }, [src]);

  return (
    <video
      src={src}
      className="small-movie-card__image"
      poster={poster}
      ref={videoElementRef}
    >
    </video>
  );
}

export default PreviewVideoPlayer;
