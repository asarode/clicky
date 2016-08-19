import React, { PureComponent, PropTypes as P } from 'react'

export default class ScoreDisplay extends PureComponent {
  static propTypes = {
    score: P.number.isRequired
  }

  render () {
    return <div>
      { this.props.score }
    </div>
  }
}
