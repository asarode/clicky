import { delay } from 'redux-saga'
import { call, put, race, take } from 'redux-saga/effects'
import {
  SHOW_MULTIPLIER,
  ACTIVATE_MULTIPLIER,
  HIDE_MULTIPLIER
} from '../state/score.reducer'

export function * scheduleMultiplier (minDelay = 5000, maxDelay = 2000) {
  while (true) {
    const delayTime = Math.floor(
      Math.random() * (maxDelay - minDelay) + minDelay
    )
    yield call(delay, delayTime)
    yield put({ type: SHOW_MULTIPLIER })
    const { missedActivate } = yield race({
      missedActivate: call(delay, 3000),
      activate: take(ACTIVATE_MULTIPLIER)
    })

    if (missedActivate) {
      yield put({ type: HIDE_MULTIPLIER })
    } else {
      yield call(delay, 5000)
      yield put({ type: HIDE_MULTIPLIER })
    }
  }
}
