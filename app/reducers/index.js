import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import search from './search';
import icons from './icons';

const rootReducer = combineReducers({
  routing,
  search,
  icons,
});

export default rootReducer;
