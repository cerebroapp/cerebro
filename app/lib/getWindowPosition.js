import { remote } from 'electron'

import {
  WINDOW_WIDTH,
  INPUT_HEIGHT,
  RESULT_HEIGHT,
  MIN_VISIBLE_RESULTS,
} from 'main/constants/ui'

/**
 * Computes window position
 */
export default ({ width, heightWithResults }) => {
  const winWidth = typeof width !== 'undefined' ? width : WINDOW_WIDTH

  const winHeight = typeof heightWithResults !== 'undefined'
    ? heightWithResults
    : MIN_VISIBLE_RESULTS * RESULT_HEIGHT + INPUT_HEIGHT

  const display = remote.screen.getPrimaryDisplay()

  const x = parseInt(display.bounds.x + (display.workAreaSize.width - winWidth) / 2, 10)
  const y = parseInt(display.bounds.y + (display.workAreaSize.height - winHeight) / 2, 10)

  return [x, y]
}

