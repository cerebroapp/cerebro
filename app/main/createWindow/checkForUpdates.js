import { dialog, app, shell } from 'electron'
import os from 'os'
import semver from 'semver'
import https from 'https'

const currentVersion = app.getVersion()
const DEFAULT_DOWNLOAD_URL = 'https://github.com/KELiON/cerebro/releases'

const TITLE = 'Cerebro Updates'

const PLATFORM_EXTENSIONS = {
  darwin: 'dmg',
  linux: 'AppImage',
  win32: 'exe'
}
const platform = os.platform()
const installerExtension = PLATFORM_EXTENSIONS[platform]

const findInstaller = (assets) => {
  if (!installerExtension) {
    return DEFAULT_DOWNLOAD_URL
  }
  const regexp = new RegExp(`\.${installerExtension}$`)
  const downloadUrl = assets
    .map(a => a.browser_download_url)
    .find(url => url.match(regexp))
  return downloadUrl || DEFAULT_DOWNLOAD_URL
}

const getLatestRelease = () => (
  new Promise((resolve, reject) => {
    const opts = {
      host: 'api.github.com',
      path: '/repos/KELiON/cerebro/releases',
      headers: {
        'User-Agent': `CerebroApp v${currentVersion}`
      }
    }
    https.get(opts, res => {
      let json = ''
      res.on('data', (chunk) => {
        json += chunk
      })
      res.on('end', () => resolve(JSON.parse(json)[0]))
    }).on('error', () => reject())
  })
)

export default () => {
  getLatestRelease().then(release => {
    const version = semver.valid(release.tag_name)
    if (version && semver.gt(version, currentVersion)) {
      dialog.showMessageBox({
        buttons: ['Skip', 'Download'],
        defaultId: 1,
        cancelId: 0,
        title: TITLE,
        message: `New version available: ${version}`,
        detail: 'Click download to get it now',
      }, (response) => {
        if (response === 1) {
          const url = findInstaller(release.assets)
          shell.openExternal(url)
        }
      })
    } else {
      dialog.showMessageBox({
        title: TITLE,
        message: `You are using latest version of Cerebro (${currentVersion})`,
        buttons: []
      })
    }
  }).catch(err => {
    console.log('Catch error!', err)
    dialog.showErrorBox(
      TITLE,
      'Error fetching latest version',
    )
  })
}
