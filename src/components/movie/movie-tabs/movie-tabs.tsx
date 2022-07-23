import { useState } from 'react';
import { MovieTabNames } from '../../../const/const';
import { MovieType } from '../../../types/types';
import { ReviewType } from '../../../types/types';
import Details from './details';
import Overview from './overview';
import ReviewList from './review-list';
import TabContent from './tab-content';
import TabNavItem from './tab-nav-item';

type MovieTabsProps = {
  movie: MovieType;
  reviews: ReviewType[];
}

function MovieTabs({movie, reviews}:MovieTabsProps):JSX.Element {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <TabNavItem title={MovieTabNames.OVERVIEW} id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
          <TabNavItem title={MovieTabNames.DETAILS} id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
          <TabNavItem title={MovieTabNames.REVIEWS} id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
        </ul>
      </nav>
      <TabContent id="tab1" activeTab={activeTab}>
        <Overview movie={movie}/>
      </TabContent>
      <TabContent id="tab2" activeTab={activeTab}>
        <Details movie={movie}/>
      </TabContent>
      <TabContent id="tab3" activeTab={activeTab}>
        <ReviewList reviews={reviews}/>
      </TabContent>
    </div>
  );
}

export default MovieTabs;
