import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ClickPiece } from 'modules/click-piece'
import { LevelBadge } from 'modules/level-badge'
import { ScoreDisplay } from 'modules/score-display'
import {
  mapState as mapScoreState,
  increaseScore,
  activateMultiplier,
  deactivateMultiplier
} from 'modules/state/score.reducer'

const mapStateToProps = (state) => ({
  score: mapScoreState(state.score)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    increaseScore,
    activateMultiplier,
    deactivateMultiplier
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  render () {
    return <div>
      <LevelBadge currentLevel={this.props.score.currentLevel} />
      <ScoreDisplay score={this.props.score.score} />
      <ClickPiece onClick={this.props.actions.increaseScore} />
    </div>
  }
}
