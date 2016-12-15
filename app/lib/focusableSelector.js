/**
 * DOM selector for all focusable elements
 * @type {Array}
 */
export default [
  // Links & areas with href attribute
  'a[href]',
  'area[href]',

  // Not disabled form elements
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',

  // All elements with tabindex >= 0
  '[tabindex]:not([tabindex^="-"])'
].join(', ')
