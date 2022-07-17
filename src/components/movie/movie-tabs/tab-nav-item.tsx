import { MouseEvent } from 'react';

type TabNavItemProps = {
  id:string; title:string; activeTab:string; setActiveTab:(id:string) => void;
}

function TabNavItem ({ id, title, activeTab, setActiveTab }:TabNavItemProps):JSX.Element {
  const handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
    setActiveTab(id);
  };

  return (
    <li className={`movie-nav__item ${activeTab === id ? 'movie-nav__item--active' : ''}`}>
      <a href="#" className="movie-nav__link" onClick={handleClick}>{ title }</a>
    </li>
  );
}
export default TabNavItem;
