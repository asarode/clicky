import { scheduleMultiplier } from 'modules/multiplier-widget'

export function * rootSaga () {
  yield [
    scheduleMultiplier()
  ]
}
