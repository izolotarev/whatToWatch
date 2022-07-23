import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import browserHistory from './browser-history/browser-history';
import App from './components/app/app';
import { AuthorizationStatus } from './const/const';
import { movies } from './mocks/movies';
import { reviews } from './mocks/reviews';
import { createAPI } from './services/api';
import { requireAuthorization } from './store/actions/actions';
import { redirect } from './store/middlewares/redirect';
import { rootReducer } from './store/reducers/root-reducer';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App movies={movies} reviews={reviews}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
