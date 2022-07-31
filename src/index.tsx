import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import browserHistory from './browser-history/browser-history';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import App from './components/app/app';
import { AuthorizationStatus } from './const/const';
import { createAPI } from './services/api';
import { requireAuthorization } from './store/actions/actions';
import { checkAuth, fetchFavoriteMovies, fetchMovies, fetchPromo } from './store/actions/api-actions';
import { redirect } from './store/middlewares/redirect';
import { rootReducer } from './store/reducers/root-reducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


export type AppDispatch = typeof store.dispatch

store.dispatch(checkAuth());
store.dispatch(fetchPromo());
store.dispatch(fetchMovies());
store.dispatch(fetchFavoriteMovies());


const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <Provider store={store}>
        <ToastContainer />
        <App/>
      </Provider>
    </HistoryRouter>
  </React.StrictMode>
);

