// Could use a plain JS object and use `Object.assign` or `...` spreads to
// prevent mutation. However, ImmutableJS uses structual sharing to make state
// updates more efficient and the API is nicer to work with once you have nested
// state.
import I from 'immutable'

// Could use a `Symbol` to avoid action type namespace conflicts, but I prefer
// strings because they're easier to serialize and the namespace conflict hasn'the
// been an issue for me in practice.
export const INCREASE_SCORE = 'INCREASE_SCORE'
export const ACTIVATE_MULTIPLIER = 'ACTIVATE_MULTIPLIER'
export const DEACTIVATE_MULTIPLIER = 'DEACTIVATE_MULTIPLIER'

export const increaseScore = () => ({
  type: INCREASE_SCORE
})

export const activateMultiplier = (multiplier = 2) => ({
  type: ACTIVATE_MULTIPLIER,
  payload: { multiplier }
})

export const deactivateMultiplier = () => ({
  type: DEACTIVATE_MULTIPLIER
})

const initialState = I.fromJS({
  score: 0,
  increment: 1,
  multiplier: 1
})

// Magic constants for the logarithmic leveling. Chose these constants to make
// earlier levels take a lower score, so you don't go insane trying to test the
// app :)
// Formula from http://gamedev.stackexchange.com/a/55158/89475
const A = 8.2
const B = -42
const C = Math.exp((1 - B) / A)

const calcCurrentLevel = (score) => {
  const maybeLevel = Math.floor(A * Math.log(score + C) + B)
  return isNaN(maybeLevel) ? 1 : Math.max(maybeLevel, 1)
}

const getScoreAtLevel = (level) => Math.round(Math.exp((level - B) / A) - C)
const calcScoreForNextLevel = (currentLevel) =>
  getScoreAtLevel(currentLevel + 1) - getScoreAtLevel(currentLevel)

export const mapState = (state) => {
  const score = state.get('score')
  const currentLevel = calcCurrentLevel(score)
  return {
    score,
    currentLevel,
    scoreForNextLevel: calcScoreForNextLevel(currentLevel)
  }
}

const score = (state = initialState, action = {}) => {
  switch (action.type) {
    case INCREASE_SCORE:
      return state.update('score', (score) =>
        score + state.get('increment') * state.get('multiplier'))

    case ACTIVATE_MULTIPLIER:
      return state.set('multiplier', action.payload.multiplier)

    case DEACTIVATE_MULTIPLIER:
      return state.set('multiplier', initialState.get('multiplier'))

    default:
      return state
  }
}

export default score
