import React, { Component, PropTypes as P } from 'react'
import cx from 'classnames'
import { style } from '.'

export default class LevelBadge extends Component {
  static propTypes = {
    currentLevel: P.number.isRequired,
    className: P.string
  }

  static defaultProps = {
    className: ''
  }

  state = {
    isAnimating: false
  }

  render () {
    const levelAnimationClass = cx(style.levelText, {
      [style.levelAnimation]: this.state.isAnimating
    })
    return <div className={`${this.props.className} ${style.levelBadge}`}>
      <span className={style.label}>lvl</span>
      <span className={style.level}>
        <span
          ref={(c) => { this.animateEl = c }}
          className={levelAnimationClass}>
          {this.props.currentLevel}
        </span>
      </span>
    </div>
  }

  componentDidMount () {
    this.animateEl.addEventListener('animationend', this.onAnimationEnd)
  }

  componentDidUpdate (nextProps) {
    if (!this.state.isAnimating &&
      this.props.currentLevel !== nextProps.currentLevel
    ) {
      this.setState({ isAnimating: true })
    }
  }

  onAnimationEnd = () => {
    this.setState({ isAnimating: false })
  }
}
