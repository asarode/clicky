import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import scoreReducer from './score.reducer'
import { rootSaga } from 'modules/effects'

const reducer = combineReducers({
  score: scoreReducer
})

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger)
)
sagaMiddleware.run(rootSaga)

export default store
