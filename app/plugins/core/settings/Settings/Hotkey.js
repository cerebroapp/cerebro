import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

const ASCII = {
  188: '44',
  109: '45',
  190: '46',
  191: '47',
  192: '96',
  220: '92',
  222: '39',
  221: '93',
  219: '91',
  173: '45',
  187: '61',
  186: '59',
  189: '45'
}

const SHIFT_UPS = {
  96: '~',
  49: '!',
  50: '@',
  51: '#',
  52: '$',
  53: '%',
  54: '^',
  55: '&',
  56: '*',
  57: '(',
  48: ')',
  45: '_',
  61: '+',
  91: '{',
  93: '}',
  92: '|',
  59: ':',
  39: '"',
  44: '<',
  46: '>',
  47: '?'
}

const KEYCODES = {
  8: 'Backspace',
  9: 'Tab',
  13: 'Enter',
  27: 'Esc',
  32: 'Space',
  37: 'Left',
  38: 'Up',
  39: 'Right',
  40: 'Down',
  112: 'F1',
  113: 'F2',
  114: 'F3',
  115: 'F4',
  116: 'F5',
  117: 'F6',
  118: 'F7',
  119: 'F8',
  120: 'F9',
  121: 'F10',
  122: 'F11',
  123: 'F12',
}

const osKeyDelimiter = process.platform === 'darwin' ? '' : '+'

const keyToSign = (key) => {
  if (process.platform === 'darwin') {
    return key.replace(/control/i, '⌃')
      .replace(/alt/i, '⌥')
      .replace(/shift/i, '⇧')
      .replace(/command/i, '⌘')
      .replace(/enter/i, '↩')
      .replace(/backspace/i, '⌫')
  }
  return key
}

const charCodeToSign = ({ keyCode, shiftKey }) => {
  if (KEYCODES[keyCode]) {
    return KEYCODES[keyCode]
  }
  const valid = (keyCode > 47 && keyCode < 58) // number keys
    || (keyCode > 64 && keyCode < 91) // letter keys
    || (keyCode > 95 && keyCode < 112) // numpad keys
    || (keyCode > 185 && keyCode < 193) // ;=,-./` (in order)
    || (keyCode > 218 && keyCode < 223) // [\]' (in order)
  if (!valid) {
    return null
  }
  const code = ASCII[keyCode] ? ASCII[keyCode] : keyCode
  if (!shiftKey && (code >= 65 && code <= 90)) {
    return String.fromCharCode(code + 32)
  }
  if (shiftKey && SHIFT_UPS[code]) {
    return SHIFT_UPS[code]
  }
  return String.fromCharCode(code)
}

function Hotkey({ hotkey, onChange }) {
  const onKeyDown = (event) => {
    if (!event.ctrlKey && !event.altKey && !event.metaKey) {
      // Do not allow to set global shorcut without modifier keys
      // At least one of alt, cmd or ctrl is required
      return
    }
    event.preventDefault()
    event.stopPropagation()

    const key = charCodeToSign(event)
    if (!key) return
    const keys = []

    if (event.ctrlKey) keys.push('Control')
    if (event.altKey) keys.push('Alt')
    if (event.shiftKey) keys.push('Shift')
    if (event.metaKey) keys.push('Command')
    keys.push(key)
    onChange(keys.join('+'))
  }
  const keys = hotkey.split('+').map(keyToSign).join(osKeyDelimiter)
  return (
    <div>
      <input
        readOnly
        className={styles.input}
        type="text"
        value={keys}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

Hotkey.propTypes = {
  hotkey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Hotkey
