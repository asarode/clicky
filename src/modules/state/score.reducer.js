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
  increment: 10,
  multiplier: 1
})

// Export function to map state to specific state slices. In this case, the
// function is simple, but it's a great place to put logic for calculating
// computed properties. This allows the UI to use parts of the state without
// having to know the state shape OR know anything about ImmutableJS. In a
// production app, I'd use something like the reselect library that auto-memoizes
// these mappings so you don't recompute them if the state fields haven't
// changed. Decoupling ftw!
export const mapState = (state) => ({
  score: state.get('score')
})

const score = (state = initialState, action) => {
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
