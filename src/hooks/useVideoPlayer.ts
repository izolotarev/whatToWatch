import { useState, useEffect, MutableRefObject} from 'react';

const useVideoPlayer = (videoElementRef: MutableRefObject<HTMLVideoElement | null>) => {

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: true,
    isLoading: true,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    playerState.isPlaying
      ? videoElementRef.current?.play()
      : videoElementRef.current?.pause();
  }, [playerState.isPlaying, videoElementRef]);

  const handleOnTimeUpdate = () => {
    if (videoElementRef.current === null) {return;}
    const progress = (videoElementRef.current.currentTime / videoElementRef.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
  };

  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value);
    if (videoElementRef.current === null) {return;}
    videoElementRef.current.currentTime = (videoElementRef.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value);
    if (videoElementRef.current === null) {return;}
    videoElementRef.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  useEffect(() => {
    if (videoElementRef.current === null) {return;}
    playerState.isMuted
      ? (videoElementRef.current.muted = true)
      : (videoElementRef.current.muted = false);
  }, [playerState.isMuted, videoElementRef]);

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  };
};

export default useVideoPlayer;
