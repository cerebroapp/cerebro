import initializeRpc from './rpc/initialize'
import { on } from 'lib/rpc/events'

initializeRpc()

// Handle `reload` rpc event and reload window
on('reload', () => location.reload())
