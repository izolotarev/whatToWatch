import { Fragment, memo, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { MovieType } from '../../types/movie';
import PreviewVideoPlayer from '../preview-video-player/preview-video-player';

type MovieProps = {
  movie: MovieType;
}

function MovieCard({movie}:MovieProps):JSX.Element {

  const {previewImage, id, name, previewVideoLink} = movie;

  const [isVisibleVideoPlayer, setVisibleVideoPlayer] = useState<boolean>(false);

  const handleHover = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setVisibleVideoPlayer(true);
  };

  const handleBlur = () => {
    setVisibleVideoPlayer(false);
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={handleHover} onMouseOut={handleBlur}
    >
      {
        isVisibleVideoPlayer
          ?
          <Link to={{pathname: `${AppRoute.MOVIES}/${id}`}}>
            <PreviewVideoPlayer src={previewVideoLink} poster={previewImage}/>
          </Link>
          :
          <Fragment>
            <Link to={{pathname: `${AppRoute.MOVIES}/${id}`}}>
              <div className="small-movie-card__image">
                <img src={previewImage} alt={name} width="280" height="175" />
              </div>
            </Link>
            <h3 className="small-movie-card__title">
              <a href="#" className="small-movie-card__link" >{name}</a>
            </h3>
          </Fragment>
      }
    </article>
  );

}

export default memo(MovieCard);
