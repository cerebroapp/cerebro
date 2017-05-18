import React, { PropTypes } from 'react'
import { KeyboardNavItem } from 'cerebro-ui'

const ActionButton = ({ action, onComplete, text }) => {
  const onSelect = () => {
    const timeout = new Promise(resolve => setTimeout(resolve, 1500))
    Promise.all([action(), timeout]).then(onComplete)
  }
  return (
    <KeyboardNavItem onSelect={onSelect}>
      {text}
    </KeyboardNavItem>
  )
}

ActionButton.propTypes = {
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
}

export default ActionButton
