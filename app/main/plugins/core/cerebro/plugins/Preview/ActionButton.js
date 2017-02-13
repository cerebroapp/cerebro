import React, { PropTypes, Component } from 'react'
import KeyboardNavItem from 'main/components/KeyboardNavItem'

export default class ActionButton extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    loadingText: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props)
    this.onSelect = this.onSelect.bind(this)
    this.state = {
      loading: false
    }
  }
  onSelect() {
    this.setState({ loading: true })
    const timeout = new Promise(resolve => setTimeout(resolve, 1500))
    // Remove "flashing" when plugin installed in less than 1.5s
    Promise.all([
      this.props.action(),
      timeout
    ]).then(() => {
      this.setState({ loading: false })
      console.log('DONE')
    })
  }
  render() {
    const { text, loadingText } = this.props
    const { loading } = this.state
    return (
      <KeyboardNavItem onSelect={this.onSelect}>
        {loading ? `${loadingText}. App will be reloaded...` : text}
      </KeyboardNavItem>
    )
  }
}
