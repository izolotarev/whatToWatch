import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MovieTabNames } from '../../../const/const';
import { MovieType } from '../../../types/types';
import { ReviewType } from '../../../types/types';
import Details from './details';
import Overview from './overview';
import ReviewList from './review-list';
import ReviewListEmpty from './review-list-empty';
import TabContent from './tab-content';
import TabNavItem from './tab-nav-item';

type MovieTabsProps = {
  movie: MovieType;
  reviews?: ReviewType[];
}

function MovieTabs({movie, reviews}:MovieTabsProps):JSX.Element {
  const [activeTab, setActiveTab] = useState(MovieTabNames.OVERVIEW);
  const location = useLocation() as {state: {tabId: string}};

  useEffect(() => {
    const tabId = location.state?.tabId;
    if (tabId) {
      setActiveTab(tabId);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <TabNavItem title={MovieTabNames.OVERVIEW} id={MovieTabNames.OVERVIEW} activeTab={activeTab} setActiveTab={setActiveTab}/>
          <TabNavItem title={MovieTabNames.DETAILS} id={MovieTabNames.DETAILS} activeTab={activeTab} setActiveTab={setActiveTab}/>
          <TabNavItem title={MovieTabNames.REVIEWS} id={MovieTabNames.REVIEWS} activeTab={activeTab} setActiveTab={setActiveTab}/>
        </ul>
      </nav>
      <TabContent id={MovieTabNames.OVERVIEW} activeTab={activeTab}>
        <Overview movie={movie}/>
      </TabContent>
      <TabContent id={MovieTabNames.DETAILS} activeTab={activeTab}>
        <Details movie={movie}/>
      </TabContent>
      <TabContent id={MovieTabNames.REVIEWS} activeTab={activeTab}>
        {
          reviews
            ? <ReviewList reviews={reviews}/>
            : <ReviewListEmpty/>
        }
      </TabContent>
    </div>
  );
}

export default MovieTabs;
