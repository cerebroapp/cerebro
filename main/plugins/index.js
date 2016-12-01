// Core plugins
import apps from './apps';
import math from './math';
import files from './files';
import system from './system';
import define from './define';
import converter from './converter';
import openWeb from './openWeb';
import google from './google';
import contacts from './contacts';
import settings from './settings';
import films from './films';
import maps from './maps';
import translate from './translate';

// TODO: move to external plugins
import kill from './kill';
import ip from './ip';
import editor from './editor';
import plugins from './plugins';

import loadExternalPlugins from './loadExternalPlugins';

module.exports = {
  apps,
  math,
  files,
  system,
  define,
  converter,
  openWeb,
  google,
  contacts,
  settings,
  films,
  maps,
  translate,
  kill,
  ip,
  editor,
  plugins,
  ...loadExternalPlugins(),
}
