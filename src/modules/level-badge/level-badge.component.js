import React, { PureComponent, PropTypes as P } from 'react'

export default class LevelBadge extends PureComponent {
  static propTypes = {
    currentLevel: P.number.isRequired
  }
  render () {
    return <div>
      { `Lvl ${this.props.currentLevel}` }
    </div>
  }
}