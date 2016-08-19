import { expect } from 'chai'
import scoreReducer, {
  increaseScore,
  activateMultiplier,
  deactivateMultiplier,
  mapState
} from './score.reducer'

describe('Score Reducer', () => {
  it('increases the score', () => {
    const state = scoreReducer(undefined, increaseScore())
    const actualScore = state.get('score')
    const expectedScore = 1

    expect(actualScore).to.equal(expectedScore)
  })

  it('adds a 2x multiplier by default', () => {
    const state = [activateMultiplier(), increaseScore()]
      .reduce(scoreReducer, undefined)
    const actualScore = state.get('score')
    const expectedScore = 2

    expect(actualScore).to.equal(expectedScore)
  })

  it('adds multiplier from payload', () => {
    const state = [activateMultiplier(3), increaseScore()]
      .reduce(scoreReducer, undefined)
    const actualScore = state.get('score')
    const expectedScore = 3

    expect(actualScore).to.equal(expectedScore)
  })

  it('removes a multiplier', () => {
    const state = [
      activateMultiplier(),
      deactivateMultiplier(),
      increaseScore()
    ].reduce(scoreReducer, undefined)
    const actualScore = state.get('score')
    const expectedScore = 1

    expect(actualScore).to.equal(expectedScore)
  })

  it('computes current level', () => {
    {
      const { currentLevel } = mapState(scoreReducer())
      const expectedLevel = 1
      expect(currentLevel).to.equal(expectedLevel)
    }

    {
      const { currentLevel } = mapState(scoreReducer().set('score', 5000))
      const expectedLevel = 28
      expect(currentLevel).to.equal(expectedLevel)
    }
  })

  it('computes next level', () => {
    {
      const { scoreForNextLevel } = mapState(scoreReducer())
      const expectedScore = 25
      expect(scoreForNextLevel).to.equal(expectedScore)
    }
  })
})
