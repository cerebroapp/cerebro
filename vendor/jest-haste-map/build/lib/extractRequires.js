'use strict'; /**
               * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
               *
               * This source code is licensed under the BSD-style license found in the
               * LICENSE file in the root directory of this source tree. An additional grant
               * of patent rights can be found in the PATENTS file in the same directory.
               *
               * 
               */

const blockCommentRe = /\/\*[^]*?\*\//g;
const lineCommentRe = /\/\/.*/g;

const replacePatterns = {
  EXPORT_RE: /(\bexport\s+(?:[^'"]+\s+from\s+)??)(['"])([^'"]+)(\2)/g,
  IMPORT_RE: /(\bimport\s+(?:[^'"]+\s+from\s+)??)(['"])([^'"]+)(\2)/g,
  REQUIRE_EXTENSIONS_PATTERN: /(\b(?:require\s*?\.\s*?(?:requireActual|requireMock)|jest\s*?\.\s*?genMockFromModule)\s*?\(\s*?)([`'"])([^`'"]+)(\2\s*?\))/g,
  REQUIRE_RE: /(\brequire\s*?\(\s*?)([`'"])([^`'"]+)(\2\s*?\))/g };


function extractRequires(code) {
  const dependencies = new Set();
  const addDependency = (match, pre, quot, dep, post) => {
    dependencies.add(dep);
    return match;
  };

  code.
  replace(blockCommentRe, '').
  replace(lineCommentRe, '').
  replace(replacePatterns.EXPORT_RE, addDependency).
  replace(replacePatterns.IMPORT_RE, addDependency).
  replace(replacePatterns.REQUIRE_EXTENSIONS_PATTERN, addDependency).
  replace(replacePatterns.REQUIRE_RE, addDependency);

  return Array.from(dependencies);
}

module.exports = extractRequires;