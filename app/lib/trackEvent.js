import ua from 'universal-analytics'
import { machineIdSync } from 'node-machine-id'

const DEFAULT_CATEGORY = 'Cerebro App'
const visitor = ua('UA-87361302-1', machineIdSync(), { strictCidFormat: false })
const trackingEnabled = process.env.NODE_ENV === 'production'

export default ({ category, event, label, value }) => {
  if (trackingEnabled) {
    visitor.event(category || DEFAULT_CATEGORY, event, label, value).send()
  }
}
