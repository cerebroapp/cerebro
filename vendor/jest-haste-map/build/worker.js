'use strict'; /**
               * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
               *
               * This source code is licensed under the BSD-style license found in the
               * LICENSE file in the root directory of this source tree. An additional grant
               * of patent rights can be found in the PATENTS file in the same directory.
               *
               * 
               */




const path = require('path');
const docblock = require('jest-docblock');
const fs = require('graceful-fs');
const H = require('./constants');
const extractRequires = require('./lib/extractRequires');

const JSON_EXTENSION = '.json';
const PACKAGE_JSON = path.sep + 'package' + JSON_EXTENSION;

let hasteImpl = null;
let hasteImplModulePath = null;

const formatError = error => {
  if (typeof error === 'string') {
    return {
      message: error,
      stack: null,
      type: 'Error' };

  }

  return {
    message: error.message,
    stack: error.stack,
    type: 'Error' };

};

module.exports = (data, callback) => {
  try {
    if (
    data.hasteImplModulePath &&
    data.hasteImplModulePath !== hasteImplModulePath)
    {
      if (hasteImpl) {
        throw new Error('jest-haste-map: hasteImplModulePath changed');
      }
      hasteImplModulePath = data.hasteImplModulePath;
      hasteImpl =
      // $FlowFixMe: dynamic require
      require(hasteImplModulePath);
    }

    const filePath = data.filePath;
    const content = fs.readFileSync(filePath, 'utf8');
    let module;
    let id;
    let dependencies;

    if (filePath.endsWith(PACKAGE_JSON)) {
      const fileData = JSON.parse(content);
      if (fileData.name) {
        id = fileData.name;
        module = [filePath, H.PACKAGE];
      }
    } else if (!filePath.endsWith(JSON_EXTENSION)) {
      if (hasteImpl) {
        id = hasteImpl.getHasteName(filePath);
      } else {
        const doc = docblock.parse(docblock.extract(content));
        id = doc.providesModule || doc.provides;
      }
      dependencies = extractRequires(content);
      if (id) {
        module = [filePath, H.MODULE];
      }
    }

    callback(null, { dependencies, id, module });
  } catch (error) {
    callback(formatError(error));
  }
};