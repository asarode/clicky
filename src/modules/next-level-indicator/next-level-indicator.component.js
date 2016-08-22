import React, { Component, PropTypes as P } from 'react'
import cx from 'classnames'
import { style } from '.'

export default class LevelBadge extends Component {
  static propTypes = {
    score: P.number.isRequired,
    scoreForCurrentLevel: P.number.isRequired,
    scoreForNextLevel: P.number.isRequired,
    className: P.string
  }

  static defaultProps = {
    className: ''
  }

  state = {
    isAnimating: false
  }

  render () {
    const pointsUntilNextLevel = this.props.scoreForNextLevel - this.props.score
    const progress = this.calcProgress(this.props)

    const mapMeterTicks = (totalTicks) => {
      const ticksToFill = Math.floor(progress * totalTicks)
      return (_, index) => {
        const meterClasses = cx(style.meterTick, {
          [style.meterTickFilled]: index < ticksToFill
        })
        return <div key={index} className={meterClasses}></div>
      }
    }

    const meterClasses = cx(style.meter, {
      [style.meterAnimation]: this.state.isAnimating
    })

    return <div className={this.props.className}>
      <div className={style.label}>
        <div className={style.headLabel}>next</div>
        <div className={style.tailLabel}>{pointsUntilNextLevel}</div>
      </div>
      <div
        className={meterClasses}
        ref={(c) => this.animateEl = c}>
        {
          Array(50).fill(1).map(mapMeterTicks(50))
        }
      </div>
    </div>
  }

  componentDidMount () {
    this.animateEl.addEventListener('animationend', this.onAnimationEnd)
  }

  componentDidUpdate (nextProps) {
    if (!this.state.isAnimating &&
      this.props.scoreForCurrentLevel !== nextProps.scoreForCurrentLevel
    ) {
      console.log('is animating now')
      this.setState({ isAnimating: true })
    }
  }

  onAnimationEnd = () => {
    this.setState({ isAnimating: false })
    console.log('animation ended')
  }

  calcProgress = ({ score, scoreForCurrentLevel, scoreForNextLevel }) => {
    const pointsEarned = this.props.score - this.props.scoreForCurrentLevel
    const totalPointsNeeded =
      this.props.scoreForNextLevel - this.props.scoreForCurrentLevel

    return pointsEarned / totalPointsNeeded
  }

}