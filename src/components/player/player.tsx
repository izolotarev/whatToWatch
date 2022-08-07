import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import useVideoPlayer from '../../hooks/useVideoPlayer';
import { clearMovieById } from '../../store/actions/actions';
import { fetchMovieById } from '../../store/actions/api-actions';
import { getMovieById } from '../../store/reducers/movies/movies-selectors';
import { formatTime } from '../../utils/utils';
import LoadingScreen from '../loading-screen/loading-screen';

type PlayerParams = {
  id: string;
}

function Player():JSX.Element {
  const params = useParams<PlayerParams>();
  const id = parseInt(params.id ?? '', 10);

  const videoElementRef = useRef(null);

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    toggleFullscreen,
  } = useVideoPlayer(videoElementRef);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovieById(id));
    togglePlay();
    return () => {dispatch(clearMovieById());};
  }, [id]);

  const movie = useSelector(getMovieById);

  useEffect(() => {
    togglePlay();
  }, [movie]);

  const handleClick = () => {
    togglePlay();
  };

  const navigate = useNavigate();

  const handleExitClick = () => {
    navigate(AppRoute.ROOT);
  };

  if (!movie) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="player">
      <video src={movie.videoLink} className="player__video" poster={movie.backgroundImage} ref={videoElementRef} onTimeUpdate={handleOnTimeUpdate} onClick={togglePlay}></video>

      <button type="button" className="player__exit" onClick={handleExitClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <input className="player__progress" value={playerState.progress} type="range" max="100" onInput={handleVideoProgress}
              style={{background: `linear-gradient(to right, #d9cd8d 0%, #d9cd8d ${playerState.progress}%, #C4C4C4 ${playerState.progress}%, #C4C4C4 100%)`}}
            >
            </input>
            {/* <div className="player__toggler" style={{left: `${30}%`}} >Toggler</div> */}
          </div>
          <div className="player__time-value">{formatTime(playerState.currentTime)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handleClick}>
            {
              playerState.isPlaying
                ?
                <>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </>
                :
                <>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </>
            }
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={toggleFullscreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
