import React, { PropTypes, Component } from 'react'
import KeyboardNavItem from 'main/components/KeyboardNavItem'

export default class ActionButton extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
  }
  onSelect = () => {
    const timeout = new Promise(resolve => setTimeout(resolve, 1500))
    Promise.all([
      this.props.action(),
      timeout
    ]).then(
      this.props.onComplete
    )
  }
  render() {
    return (
      <KeyboardNavItem onSelect={this.onSelect}>
        {this.props.text}
      </KeyboardNavItem>
    )
  }
}
