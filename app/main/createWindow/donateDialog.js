import { dialog, shell } from 'electron'
import config from 'lib/config'

const now = () => new Date().getTime()
const twoWeeksAgo = () => now() - 1000 * 3600 * 24 * 7

export const donate = () => {
  config.set('skipDonateDialog', true)
  shell.openExternal('https://github.com/cerebroapp/cerebro#donate')
}

export const shouldShow = () => {
  // Do not show donate dialog on first start or when "dont show this message" were chosen
  if (config.get('firstStart') || config.get('skipDonateDialog')) {
    return false
  }

  // Show on second start and once per week after first start
  const lastShow = config.get('lastShownDonateDialog')
  return !lastShow || twoWeeksAgo() >= lastShow
}

export const show = () => {
  config.set('lastShownDonateDialog', now())

  const options = {
    title: 'Support Cerebro development',
    message: 'Developers try to make you happy with this free and open-source app. Make them happy too with your donation!',
    type: 'info',
    buttons: ['Close', 'Make them happy'],
    cancelId: 0,
    defaultId: 1,
    checkboxLabel: "Don't show this message again"
  }

  /**
   * The function is called when user clicks in one of the buttons
   * @param {number} id
   * @param {boolean} checkboxChecked
   */
  const callback = (id, checkboxChecked) => {
    if (checkboxChecked) config.set('skipDonateDialog', true)
    if (id === 1) donate()
  }

  setTimeout(() => {
    dialog.showMessageBox(options)
      .then(({ checkboxChecked, response }) => callback(response, checkboxChecked))
  }, 1000)
}
