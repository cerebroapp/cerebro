import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import search from './search';

const rootReducer = combineReducers({
  routing,
  search,
});

export default rootReducer;
