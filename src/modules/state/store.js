import { createStore, combineReducers } from 'redux'
import scoreReducer from './score.reducer'

const reducer = combineReducers({
  score: scoreReducer
})

const store = createStore(reducer)

export default store
