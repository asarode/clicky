import I from 'immutable'

const STATE_STORAGE_KEY = '@@ClickyState'
export const LOAD_STATE = 'LOAD_STATE'

export const loadState = (rootReducer) => {
  try {
    const state = window.localStorage.getItem(STATE_STORAGE_KEY)
    if (!state) {
      return
    }
    const parsedState = JSON.parse(state)
    const immutableState = Object.keys(parsedState).reduce((acc, key) => {
      acc[key] = I.fromJS(parsedState[key])
      return acc
    }, {})
    return rootReducer(immutableState, {
      type: LOAD_STATE
    })
  } catch (err) {
    console.error('Failed to load state from storage: ', err)
    return
  }
}

export const saveState = (state) => {
  try {
    const stateObject = Object.keys(state).reduce((acc, key) => {
      acc[key] = state[key].toJS()
      return acc
    }, {})
    const serializedState = JSON.stringify(stateObject)
    window.localStorage.setItem(STATE_STORAGE_KEY, serializedState)
  } catch (err) {
    console.error('Failed to save state to storage: ', err)
  }
}

export const clearStorage = () => {
  try {
    window.localStorage.removeItem(STATE_STORAGE_KEY)
  } catch (err) {
    console.error('Failed to clear stored state: ', err)
    return err
  }
}
