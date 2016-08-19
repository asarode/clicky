import React, { PureComponent, PropTypes as P } from 'react'

export default class LevelBadge extends PureComponent {
  static propTypes = {
    score: P.number.isRequired,
    scoreForNextLevel: P.number.isRequired
  }
  render () {
    const pointsUntilNextLevel = this.props.scoreForNextLevel - this.props.score
    return <div>
      { pointsUntilNextLevel }
    </div>
  }
}