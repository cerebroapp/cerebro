import { combineReducers } from 'redux'
import search from './search'
import statusBar from './statusBar'

const rootReducer = combineReducers({
  search,
  statusBar
})

export default rootReducer
