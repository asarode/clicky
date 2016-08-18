import { createStore } from 'redux'
import { combineReducers, install } from 'redux-loop'
import reducers from './reducers'

const reducer = combineReducers({

})

const store = createStore(reducer, undefined, install())