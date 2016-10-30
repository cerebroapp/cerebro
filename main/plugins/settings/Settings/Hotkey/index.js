import React, { Component } from 'react';
import styles from './styles.css';

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
  96: "~",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  48: ")",
  45: "_",
  61: "+",
  91: "{",
  93: "}",
  92: "|",
  59: ":",
  39: "\"",
  44: "<",
  46: ">",
  47: "?"
};

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
};


const keyToSign = (key) => {
  return key
    .replace(/control/i, '⌃')
    .replace(/alt/i, '⌥')
    .replace(/shift/i, '⇧')
    .replace(/command/i, '⌘')
    .replace(/enter/i, '')
    .replace(/backspace/i, '↩');
}

const charCodeToSign = ({keyCode, shiftKey}) => {
  let code = ASCII[keyCode] ? ASCII[keyCode] : keyCode;
  if (!shiftKey && (code >= 65 && code <= 90)) {
    return String.fromCharCode(code + 32);
  }
  if (shiftKey && SHIFT_UPS[code]) {
    return SHIFT_UPS[code];
  }
  if (KEYCODES[code]) {
    return KEYCODES[code];
  }
  const valid =
    (code > 47 && code < 58)   || // number keys
    (code > 64 && code < 91)   || // letter keys
    (code > 95 && code < 112)  || // numpad keys
    (code > 185 && code < 193) || // ;=,-./` (in order)
    (code > 218 && code < 223);   // [\]' (in order)
  return valid ? String.fromCharCode(code) : null;
}

export default class Hotkey extends Component {
  onKeyDown(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!event.ctrlKey && !event.altKey && !event.metaKey) {
      // Do not allow to set global shorcut without modifier keys
      // At least one of alt, cmd or ctrl is required
      return;
    }
    const key = charCodeToSign(event);
    if (!key) {
      return;
    }
    let keys = [];
    if (event.ctrlKey) keys.push('Control');
    if (event.altKey) keys.push('Alt');
    if (event.shiftKey) keys.push('Shift');
    if (event.metaKey) keys.push('Command');
    if (key) {
      keys.push(key);
      this.props.onChange(keys.join('+'));
    }
  }
  render() {
    const { hotkey } = this.props;
    const keys = hotkey.split('+').map(keyToSign).join('')
    return (
      <div className={styles.hotkey}>
        <input className={styles.hotkeyInput} readonly={true} type='text' value={keys} onKeyDown={this.onKeyDown.bind(this)} />
      </div>
    );
  }
}
