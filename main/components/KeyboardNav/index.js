import React, { Component, PropTypes } from 'react'
import focusableSelector from 'lib/focusableSelector'

/**
 * Focus element with index from elements array.
 *   If `index` >= `elements.length` then first element is selected;
 *   If `index` <= 0 then last element is selected.
 *
 * @param  {Array<DOMElement>} elements
 * @param  {Integer} index
 */
const moveSelectionTo = (elements, index) => {
  let nextIndex = index
  if (index < 0) {
    nextIndex = elements.length - 1
  } else if (index >= elements.length) {
    nextIndex = 0
  }
  elements[nextIndex].focus()
}

/**
 * Handler keydown in keyboard navigation component
 *
 * @param  {DOMElement} wrapper
 * @param  {KeyboardEvent} event
 */
const onKeyDown = (wrapper, event) => {
  const { target, keyCode } = event
  if (keyCode === 37) {
    // Move control back to main list when ← is clicked
    const mainInput = document.querySelector('#main-input')
    const position = mainInput.value.length
    mainInput.focus()
    mainInput.setSelectionRange(position, position)
    event.preventDefault()
    event.stopPropagation()
    return false
  }
  if (keyCode !== 40 && keyCode !== 38) {
    return false
  }

  // Get all focusable element in element
  const focusable = wrapper.querySelectorAll(focusableSelector)

  // Get index of currently focused element
  const index = Array.prototype.findIndex.call(focusable, (el) => el === target)

  if (keyCode === 40) {
    // Select next focusable element when arrow down clicked
    moveSelectionTo(focusable, index + 1)
    event.stopPropagation()
  } else if (keyCode === 38) {
    // Select previous focusable element when arrow down clicked
    moveSelectionTo(focusable, index - 1)
    event.stopPropagation()
  }
}

export default class KeyboardNav extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ])
  }
  onKeyDown(event) {
    onKeyDown(this.wrapper, event)
  }
  render() {
    return (
      <div onKeyDown={this.onKeyDown.bind(this)} ref={(el) => { this.wrapper = el }}>
        {this.props.children}
      </div>
    )
  }
}
