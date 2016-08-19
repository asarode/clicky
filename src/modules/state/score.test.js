import { expect } from 'chai'
import scoreReducer, {
  increaseScore,
  activateMultiplier,
  deactivateMultiplier
} from './score.reducer'

describe('Score Reducer', () => {
  it('increases the score', () => {
    const state = scoreReducer(undefined, increaseScore())
    const actualScore = state.get('score')
    const expectedScore = 10

    expect(actualScore).to.equal(expectedScore)
  })

  it('adds a 2x multiplier by default', () => {
    const state = [activateMultiplier(), increaseScore()]
      .reduce(scoreReducer, undefined)
    const actualScore = state.get('score')
    const expectedScore = 20

    expect(actualScore).to.equal(expectedScore)
  })

  it('adds multiplier from payload', () => {
    const state = [activateMultiplier(3), increaseScore()]
      .reduce(scoreReducer, undefined)
    const actualScore = state.get('score')
    const expectedScore = 30

    expect(actualScore).to.equal(expectedScore)
  })

  it('removes a multiplier', () => {
    const state = [
      activateMultiplier(),
      deactivateMultiplier(),
      increaseScore()
    ].reduce(scoreReducer, undefined)
    const actualScore = state.get('score')
    const expectedScore = 10

    expect(actualScore).to.equal(expectedScore)
  })
})
