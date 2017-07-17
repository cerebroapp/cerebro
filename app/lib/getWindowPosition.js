import { screen } from 'electron'
import config from './config'

import {
  WINDOW_WIDTH,
  INPUT_HEIGHT,
  RESULT_HEIGHT,
  MIN_VISIBLE_RESULTS,
} from '../main/constants/ui'


/**
 * Returns true if a window is at least partially visible on the display
 */
const isVisible = (windowBounds, displayBounds) =>
  !(windowBounds.x > displayBounds.x + displayBounds.width ||
    windowBounds.x + windowBounds.width < displayBounds.x ||
    windowBounds.y > displayBounds.y + displayBounds.height ||
    windowBounds.y + windowBounds.height < displayBounds.y)


/**
 * Computes window position
 */
export default ({ width, heightWithResults }) => {
  const winWidth = typeof width !== 'undefined' ? width : WINDOW_WIDTH
  const winHeight = typeof heightWithResults !== 'undefined'
    ? heightWithResults
    : MIN_VISIBLE_RESULTS * RESULT_HEIGHT + INPUT_HEIGHT

  const display = screen.getPrimaryDisplay()
  const positions = config.get('positions') || {}

  if (display.id in positions) {
    const [x, y] = positions[display.id]
    const windowBounds = { x, y, winWidth, winHeight }
    const isWindowVisible = disp => isVisible(windowBounds, disp.bounds)

    if (isWindowVisible(display)) {
      return [x, y]
    }

    // The window was moved from the primary screen to a different one.
    // We have to check that the window will be visible somewhere among the attached displays.
    const displays = screen.getAllDisplays()
    const isVisibleSomewhere = displays.some(isWindowVisible)

    if (isVisibleSomewhere) {
      return [x, y]
    }
  }

  const x = parseInt(display.bounds.x + (display.workAreaSize.width - winWidth) / 2, 10)
  const y = parseInt(display.bounds.y + (display.workAreaSize.height - winHeight) / 2, 10)
  return [x, y]
}

