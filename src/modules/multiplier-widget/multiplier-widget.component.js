import React, { PureComponent, PropTypes as P } from 'react'

export default class MultiplierWidget extends PureComponent {
  static propTypes = {
    isActive: P.bool.isRequired,
    multiplier: P.number.isRequired,
    activateAction: P.func.isRequired,
    hideAction: P.func.isRequired
  }

  render () {
    const multiplier = Math.floor(Math.random() * (4 - 2) + 2)

    if (this.props.isActive) {
      return <div>
        { `${this.props.multiplier}X boost!` }
      </div>
    }
    return <div onClick={() => this.props.activateAction(multiplier)}>
      { `Click for: ${multiplier}X` }
    </div>
  }
}