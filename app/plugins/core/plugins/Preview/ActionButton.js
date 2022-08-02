import React from 'react'
import PropTypes from 'prop-types'
import { KeyboardNavItem } from '@cerebroapp/cerebro-ui'

function ActionButton({ action, onComplete, text }) {
  const onSelect = () => {
    Promise.all(action()).then(onComplete)
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
