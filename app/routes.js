import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Search from './containers/Search';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Search} />
  </Route>
);
