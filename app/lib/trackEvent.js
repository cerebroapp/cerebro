import ua from 'universal-analytics'
import { machineIdSync } from 'node-machine-id'
import { version as appVersion } from '../package.json'
import config from './config'

const DEFAULT_CATEGORY = 'Cerebro App'

const isTrackingEnabled = () => (process.env.NODE_ENV === 'production' && config.get('trackingEnabled'))

let visitorCache = null

const visitor = () => {
  if (visitorCache) return visitorCache

  if (isTrackingEnabled()) {
    try {
      visitorCache = ua('UA-87361302-1', machineIdSync(), { strictCidFormat: false })
    } catch (err) {
      console.log('[machine-id error]', err)
      visitorCache = ua('UA-87361302-1')
    }
  }
  return visitorCache
}

export const screenView = (screenName) => {
  if (isTrackingEnabled()) {
    visitor().screenview(screenName, 'Cerebro', appVersion, process.platform)
  }
}

export const trackEvent = ({ category, event, label, value }) => {
  if (isTrackingEnabled()) {
    visitor().event(category || DEFAULT_CATEGORY, event, label, value).send()
  }
}
