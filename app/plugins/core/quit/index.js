import { ipcRenderer } from 'electron'
import { search } from 'cerebro-tools'
import icon from '../icon.png'

const KEYWORDS = ['Quit', 'Exit']

const subtitle = 'Quit from Cerebro'
const onSelect = () => ipcRenderer.send('quit')

/**
 * Plugin to exit from Cerebro
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const fn = ({ term, display }) => {
  const result = search(KEYWORDS, term).map((title) => ({
    icon,
    title,
    subtitle,
    onSelect,
    term: title,
  }))
  display(result)
}

export default { fn }
