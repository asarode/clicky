import React, { Component, PropTypes as P } from 'react'
import cx from 'classnames'
import { style } from '.'

export default class ClickPiece extends Component {
  static propTypes = {
    onClick: P.func.isRequired,
    className: P.string
  }

  static defaultProps = {
    className: ''
  }

  render () {
    const variantClass = Math.random() < 0.5 ? style.variantA : style.variantB
    const buttonClasses = cx(
      this.props.className,
      style.clickButton,
      variantClass
    )
    return <button
      onClick={this.props.onClick}
      className={buttonClasses}>
      Click me!
    </button>
  }
}
