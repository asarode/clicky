import React, { PureComponent, PropTypes as P } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { style } from '.'

export default class MultiplierWidget extends PureComponent {
  static propTypes = {
    isActive: P.bool.isRequired,
    multiplier: P.number.isRequired,
    activateAction: P.func.isRequired,
    hideAction: P.func.isRequired,
    className: P.string
  }

  static defaultProps = {
    className: ''
  }

  render () {
    const multiplier = Math.floor(Math.random() * (4 - 2) + 2)

    let displayElement
    if (this.props.isActive) {
      displayElement = <div className={`${this.props.className} ${style.notifier}`}>
        { `${this.props.multiplier}X boost!` }
      </div>
    } else {
      displayElement = <div
        onClick={() => this.props.activateAction(multiplier)}
        className={`${this.props.className} ${style.multiplier}`}>
        { `Click for ${multiplier}X` }
      </div>
    }

    return <ReactCSSTransitionGroup
      transitionName={{
        appear: style.appear,
        appearActive: style.appearActive
      }}
      transitionAppear={true}
      transitionEnter={false}
      transitionLeave={false}
      transitionAppearTimeout={250}>
      { displayElement }
    </ReactCSSTransitionGroup>
  }
}