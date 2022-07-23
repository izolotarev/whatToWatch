import { MouseEvent } from 'react';

type ShowMoreProps = {
  increaseNumberOfMoviesToShow: () => void;
}

function ShowMore({increaseNumberOfMoviesToShow}:ShowMoreProps):JSX.Element {

  const handleShowMoreClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    increaseNumberOfMoviesToShow();
  };

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={handleShowMoreClick}>Show more</button>
    </div>
  );
}

export default ShowMore;
