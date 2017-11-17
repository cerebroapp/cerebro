import ua from 'universal-analytics'
import { machineIdSync } from 'node-machine-id'
import { version as appVersion } from '../package.json'
import config from './config'

const DEFAULT_CATEGORY = 'Cerebro App'

const trackingEnabled = process.env.NODE_ENV === 'production' && config.get('trackingEnabled')
let visitor

if (trackingEnabled) {
  try {
    visitor = ua('UA-87361302-1', machineIdSync(), { strictCidFormat: false })
  } catch (err) {
    console.log('[machine-id error]', err)
    visitor = ua('UA-87361302-1')
  }
}

export const screenView = (screenName) => {
  if (trackingEnabled) {
    visitor.screenview(screenName, 'Cerebro', appVersion, process.platform)
  }
}

export const trackEvent = ({ category, event, label, value }) => {
  if (trackingEnabled) {
    visitor.event(category || DEFAULT_CATEGORY, event, label, value).send()
  }
}
