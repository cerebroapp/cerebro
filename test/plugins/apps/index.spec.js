import appsInjector from 'inject!../../../app/main/plugins/core/apps'
import assert from 'assert'
import uniq from 'lodash/uniq'

const appsList = [
  {
    name: 'App Store',
    filename: 'App Store.app',
    path: '/Applications/App Store.app'
  },
  {
    name: 'App Store',
    filename: 'App Store.prefPane',
    path: '/System/Library/PreferencePanes/AppStore.prefPane'
  }
]
const getAppsList = () => Promise.resolve(appsList)

const apps = appsInjector({
  react: () => {},
  './lib/getAppsList': getAppsList,
  './Preview': () => {},
})

describe('OSx apps plugin', () => {
  it('shows two apps with the same name but different paths', (done) => {
    const term = 'App'
    const display = (results) => {
      const ids = results.map(file => file.id || file.title)
      assert(uniq(ids).length === 2)
      done()
    }
    apps.fn({ term, display })
  })
})
