import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ClickPiece } from 'modules/click-piece'
import { LevelBadge } from 'modules/level-badge'
import { ScoreDisplay } from 'modules/score-display'
import { NextLevelIndicator } from 'modules/next-level-indicator'
import { MultiplierWidget } from 'modules/multiplier-widget'
import {
  mapState as mapScoreState,
  increaseScore,
  activateMultiplier,
  showMultiplier,
  hideMultiplier
} from 'modules/state/score.reducer'

const mapStateToProps = (state) => ({
  score: mapScoreState(state.score)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    increaseScore,
    activateMultiplier,
    showMultiplier,
    hideMultiplier
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  render () {
    return <div>
      <LevelBadge currentLevel={this.props.score.currentLevel} />
      <NextLevelIndicator
        score={this.props.score.score}
        scoreForNextLevel={this.props.score.scoreForNextLevel} />
      <ScoreDisplay score={this.props.score.score} />
      <ClickPiece onClick={this.props.actions.increaseScore} />
      { this.props.score.isMultiplierVisible &&
        <MultiplierWidget
          isActive={this.props.score.isMultiplierActive}
          multiplier={this.props.score.multiplier}
          activateAction={this.props.actions.activateMultiplier}
          hideAction={this.props.actions.hideMultiplier} />
      }
    </div>
  }
}
