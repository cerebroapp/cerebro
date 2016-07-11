import { combineReducers } from 'redux';
import search from './search';
import icons from './icons';

const rootReducer = combineReducers({
  search,
  icons,
});

export default rootReducer;
