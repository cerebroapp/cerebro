// Core plugins
export { default as apps } from './apps'
export { default as autocomplete } from './autocomplete'
export let contacts;
export { default as converter } from './converter'
export let define;
export { default as files } from './files'
export { default as google } from './google'
export { default as maps } from './maps'
export { default as math } from './math'
export { default as openWeb } from './openWeb'
export { default as plugins } from './plugins'
export { default as settings } from './settings'
export { default as system } from './system'
export { default as translate } from './translate'

if (process.platform === "darwin") {
    contacts = require('./contacts');
    define = require('./define')
}
