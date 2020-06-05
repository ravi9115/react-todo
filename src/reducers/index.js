import { combineReducers } from 'redux'
import tasks from './tasks'
import searchItem from './searchItem'

export default combineReducers({
  tasks,
  searchItem
})