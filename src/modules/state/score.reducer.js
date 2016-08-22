// Could use a plain JS object and use `Object.assign` or `...` spreads to
// prevent mutation. However, ImmutableJS uses structual sharing to make state
// updates more efficient and the API is nicer to work with if you have nested
// state trees.
import I from 'immutable'

// Could use a `Symbol` to avoid action type namespace conflicts, but I prefer
// strings because they're easier to serialize and the namespace conflict hasn'the
// been an issue for me in practice.
export const INCREASE_SCORE = 'INCREASE_SCORE'
export const SHOW_MULTIPLIER = 'SHOW_MULTIPLIER'
export const HIDE_MULTIPLIER = 'HIDE_MULTIPLIER'
export const ACTIVATE_MULTIPLIER = 'ACTIVATE_MULTIPLIER'

export const increaseScore = () => ({
  type: INCREASE_SCORE
})

export const activateMultiplier = (multiplier = 2) => ({
  type: ACTIVATE_MULTIPLIER,
  payload: { multiplier }
})

export const showMultiplier = () => ({
  type: SHOW_MULTIPLIER
})

export const hideMultiplier = () => ({
  type: HIDE_MULTIPLIER
})

const initialState = I.fromJS({
  score: 0,
  increment: 1,
  multiplier: 1,
  isMultiplierVisible: false
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

const getScoreAtLevel = (level) => Math.ceil(Math.exp((level - B) / A) - C)

export const mapState = (state) => {
  const score = state.get('score')
  const currentLevel = calcCurrentLevel(score)
  return {
    score,
    currentLevel,
    scoreForNextLevel: getScoreAtLevel(currentLevel + 1),
    isMultiplierVisible: state.get('isMultiplierVisible'),
    multiplier: state.get('multiplier'),
    isMultiplierActive: state.get('multiplier') !== 1
  }
}

const score = (state = initialState, action = {}) => {
  switch (action.type) {
    case INCREASE_SCORE:
      return state.update('score', (score) =>
        score + state.get('increment') * state.get('multiplier'))

    case SHOW_MULTIPLIER:
      return state.set('isMultiplierVisible', true)

    case HIDE_MULTIPLIER:
      return state
        .set('isMultiplierVisible', false)
        .set('multiplier', initialState.get('multiplier'))

    case ACTIVATE_MULTIPLIER:
      return state.set('multiplier', action.payload.multiplier)

    default:
      return state
  }
}

export default score
