import { expect } from 'chai'
import scoreReducer, {
  increaseScore,
  activateMultiplier,
  showMultiplier,
  hideMultiplier,
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

  it('shows a multiplier', () => {
    const state = scoreReducer(undefined, showMultiplier())
    const actualMultiplierVisibility = state.get('isMultiplierVisible')
    const expectedMultiplierVisibility = true

    expect(actualMultiplierVisibility).to.equal(expectedMultiplierVisibility)
  })

  it('hides and removes a multiplier', () => {
    const state = [
      showMultiplier(),
      activateMultiplier(),
      hideMultiplier(),
      increaseScore()
    ].reduce(scoreReducer, undefined)
    const actualScore = state.get('score')
    const expectedScore = 1
    expect(actualScore).to.equal(expectedScore)

    const actualMultiplierVisibility = state.get('isMultiplierVisible')
    const expectedMultiplierVisibility = false
    expect(actualMultiplierVisibility).to.equal(expectedMultiplierVisibility)
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
    const { scoreForNextLevel } = mapState(scoreReducer())
    const expectedScore = 25
    expect(scoreForNextLevel).to.equal(expectedScore)
  })
})
