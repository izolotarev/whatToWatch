import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { Router as BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import { movies } from './mocks/movies';
import { reviews } from './mocks/reviews';

ReactDOM.render(
  <React.StrictMode>
    <App movies={movies} reviews={reviews}/>
  </React.StrictMode>,
  document.getElementById('root'));
