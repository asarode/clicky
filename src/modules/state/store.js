import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import throttle from 'lodash/throttle'
import scoreReducer from './score.reducer'
import { rootSaga } from 'modules/effects'
import { loadState, saveState } from 'modules/storage/index.js'

export const rootReducer = combineReducers({
  score: scoreReducer
})

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger()

const middleware = process.env.NODE_ENV === 'production'
  ? [sagaMiddleware]
  : [sagaMiddleware, logger]

const store = createStore(
  rootReducer,
  loadState(rootReducer),
  applyMiddleware(...middleware)
)
sagaMiddleware.run(rootSaga)

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 2000))

export default store
