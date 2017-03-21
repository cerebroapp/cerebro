import initializeRpc from './rpc/initialize'
import { on } from 'lib/rpc/events'

require('fix-path')()

initializeRpc()

// Handle `reload` rpc event and reload window
on('reload', () => location.reload())
