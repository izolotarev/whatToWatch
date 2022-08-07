import { useState, useEffect, MutableRefObject, BaseSyntheticEvent} from 'react';

const useVideoPlayer = (videoElementRef: MutableRefObject<HTMLVideoElement | null>) => {

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: true,
    isLoading: true,
    currentTime: 0,
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
      currentTime: videoElementRef.current.currentTime,
    });
  };

  const handleVideoProgress = (event: BaseSyntheticEvent) => {
    const manualChange = Number(event.target.value);
    if (videoElementRef.current === null) {return;}
    videoElementRef.current.currentTime = (videoElementRef.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const handleVideoSpeed = (event: BaseSyntheticEvent) => {
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

  const toggleFullscreen = () => {
    if (isVideoInFullscreen()) {
      document.exitFullscreen();
    } else {
      videoElementRef.current?.requestFullscreen();
    }
  };

  const isVideoInFullscreen = () => {
    if (
      document.fullscreenElement &&
      document.fullscreenElement.nodeName === 'VIDEO'
    ) {
      return true;
    }
    return false;
  };


  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    toggleFullscreen,
  };
};

export default useVideoPlayer;
