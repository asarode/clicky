import React, { PureComponent, PropTypes as P } from 'react'
import cx from 'classnames'
import { style } from '.'

export default class ScoreDisplay extends PureComponent {
  static propTypes = {
    score: P.number.isRequired,
    isMultiplierActive: P.bool.isRequired,
    className: P.string
  }

  static defaultProps = {
    className: ''
  }

  render () {
    const scoreClasses = cx(
      this.props.className,
      style.scoreText, {
        [style.multiplierActive]: this.props.isMultiplierActive
      }
    )
    return <div className={scoreClasses}>
      {this.props.score}
    </div>
  }
}
