'use strict';






















const EventEmitter = require('events');
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 *
 */
const os = require('os');
const path = require('path');
const crypto = require('crypto');
var _require = require('child_process');
const execSync = _require.execSync;
const fs = require('graceful-fs');
const sane = require('sane');
const workerFarm = require('worker-farm');
const VERSION = require('../package.json').version;

const H = require('./constants');
const HasteFS = require('./HasteFS');
const HasteModuleMap = require('./ModuleMap');
const getMockName = require('./getMockName');

const getPlatformExtension = require('./lib/getPlatformExtension');
const nodeCrawl = require('./crawlers/node');
const watchmanCrawl = require('./crawlers/watchman');
const worker = require('./worker');














































const CHANGE_INTERVAL = 30;
const MAX_WAIT_TIME = 240000;
const NODE_MODULES = path.sep + 'node_modules' + path.sep;

const canUseWatchman = (() => {
  try {
    execSync('watchman --version', {
      stdio: ['ignore']
    });
    return true;
  } catch (e) {}
  return false;
})();

const escapePathSeparator = string =>
  path.sep === '\\' ? string.replace(/(\/|\\)/g, '\\\\') : string;

const getWhiteList = list => {
  if (list && list.length) {
    return new RegExp(
      '(' +
      escapePathSeparator(NODE_MODULES) +
      '(?:' +
      list.join('|') +
      ')(?=$|' +
      escapePathSeparator(path.sep) +
      '))',
      'g');

  }
  return null;
};

/**
 * HasteMap is a JavaScript implementation of Facebook's haste module system.
 *
 * This implementation is inspired by https://github.com/facebook/node-haste
 * and was built with for high-performance in large code repositories with
 * hundreds of thousands of files. This implementation is scalable and provides
 * predictable performance.
 *
 * Because the haste map creation and synchronization is critical to startup
 * performance and most tasks are blocked by I/O this class makes heavy use of
 * synchronous operations. It uses worker processes for parallelizing file
 * access and metadata extraction.
 *
 * The data structures created by `jest-haste-map` can be used directly from the
 * cache without further processing. The metadata objects in the `files` and
 * `map` objects contain cross-references: a metadata object from one can look
 * up the corresponding metadata object in the other map. Note that in most
 * projects, the number of files will be greater than the number of haste
 * modules one module can refer to many files based on platform extensions.
 *
 * type HasteMap = {
 *   clocks: WatchmanClocks,
 *   files: {[filepath: string]: FileMetaData},
 *   map: {[id: string]: ModuleMapItem},
 *   mocks: {[id: string]: string},
 * }
 *
 * // Watchman clocks are used for query synchronization and file system deltas.
 * type WatchmanClocks = {[filepath: string]: string};
 *
 * type FileMetaData = {
 *   id: ?string, // used to look up module metadata objects in `map`.
 *   mtime: number, // check for outdated files.
 *   visited: boolean, // whether the file has been parsed or not.
 *   dependencies: Array<string>, // all relative dependencies of this file.
 * };
 *
 * // Modules can be targeted to a specific platform based on the file name.
 * // Example: Platform.ios.js and Platform.android.js will both map to the same
 * // `Platform` module. The platform should be specified during resolution.
 * type ModuleMapItem = {[platform: string]: ModuleMetaData};
 *
 * //
 * type ModuleMetaData = {
 *   path: string, // the path to look up the file object in `files`.
 *   type: string, // the module type (either `package` or `module`).
 * };
 *
 * Note that the data structures described above are conceptual only. The actual
 * implementation uses arrays and constant keys for metadata storage. Instead of
 * `{id: 'flatMap', mtime: 3421, visited: true, dependencies: []}` the real
 * representation is similar to `['flatMap', 3421, 1, []]` to save storage space
 * and reduce parse and write time of a big JSON blob.
 *
 * The HasteMap is created as follows:
 *  1. read data from the cache or create an empty structure.
 *  2. crawl the file system.
 *     * empty cache: crawl the entire file system.
 *     * cache available:
 *       * if watchman is available: get file system delta changes.
 *       * if watchman is unavailable: crawl the entire file system.
 *     * build metadata objects for every file. This builds the `files` part of
 *       the `HasteMap`.
 *  3. parse and extract metadata from changed files.
 *     * this is done in parallel over worker processes to improve performance.
 *     * the worst case is to parse all files.
 *     * the best case is no file system access and retrieving all data from
 *       the cache.
 *    * the average case is a small number of changed files.
 *  4. serialize the new `HasteMap` in a cache file.
 *     Worker processes can directly access the cache through `HasteMap.read()`.
 *
 */
class HasteMap extends EventEmitter {










  constructor(options) {
    super();
    this._options = {
      cacheDirectory: options.cacheDirectory || os.tmpdir(),
      extensions: options.extensions,
      forceNodeFilesystemAPI: !!options.forceNodeFilesystemAPI,
      hasteImplModulePath: options.hasteImplModulePath,
      ignorePattern: options.ignorePattern,
      maxWorkers: options.maxWorkers,
      mocksPattern: options.mocksPattern ?
        new RegExp(options.mocksPattern) : null,
      name: options.name,
      platforms: options.platforms,
      resetCache: options.resetCache,
      retainAllFiles: options.retainAllFiles,
      roots: Array.from(new Set(options.roots)),
      throwOnModuleCollision: !!options.throwOnModuleCollision,
      useWatchman: options.useWatchman == null ? true : options.useWatchman,
      watch: !!options.watch
    };

    this._console = options.console || global.console;
    this._cachePath = HasteMap.getCacheFilePath(
      this._options.cacheDirectory,
      `haste-map-${this._options.name}`,
      VERSION,
      this._options.roots.join(':'),
      this._options.extensions.join(':'),
      this._options.platforms.join(':'),
      options.mocksPattern || '');

    this._whitelist = getWhiteList(options.providesModuleNodeModules);
    this._buildPromise = null;
    this._workerPromise = null;
    this._workerFarm = null;
    this._watchers = [];
  }

  static getCacheFilePath(tmpdir, name) {
    const hash = crypto.createHash('md5');
    Array.from(arguments).slice(1).forEach(arg => hash.update(arg));
    return path.join(
      tmpdir,
      name.replace(/\W/g, '-') + '-' + hash.digest('hex'));

  }

  build() {
    if (!this._buildPromise) {
      this._buildPromise = this._buildFileMap().
      then(fileMap => this._buildHasteMap(fileMap)).
      then(hasteMap => {
        this._persist(hasteMap);
        const hasteFS = new HasteFS(hasteMap.files);
        const moduleMap = new HasteModuleMap(hasteMap.map, hasteMap.mocks);
        const __hasteMapForTest =
          process.env.NODE_ENV === 'test' && hasteMap || null;
        return this._watch(hasteMap, hasteFS, moduleMap).then(() => ({
          __hasteMapForTest,
          hasteFS,
          moduleMap
        }));

      });
    }
    return this._buildPromise;
  }

  /**
   * 1. read data from the cache or create an empty structure.
   */
  read() {
    return this._parse(fs.readFileSync(this._cachePath, 'utf8'));
  }

  readModuleMap() {
    const data = this.read();
    return new HasteModuleMap(data.map, data.mocks);
  }

  /**
   * 2. crawl the file system.
   */
  _buildFileMap() {
    const read = this._options.resetCache ? this._createEmptyMap : this.read;

    return Promise.resolve().
    then(() => read.call(this)).
    catch(() => this._createEmptyMap()).
    then(hasteMap => this._crawl(hasteMap));
  }

  /**
   * 3. parse and extract metadata from changed files.
   */
  _processFile(
    hasteMap,
    map,
    mocks,
    filePath,
    workerOptions) {
    const setModule = (id, module) => {
      if (!map[id]) {
        map[id] = Object.create(null);
      }
      const moduleMap = map[id];
      const platform =
        getPlatformExtension(module[H.PATH], this._options.platforms) ||
        H.GENERIC_PLATFORM;
      const existingModule = moduleMap[platform];
      if (existingModule && existingModule[H.PATH] !== module[H.PATH]) {
        const message =
          `jest-haste-map: @providesModule naming collision:\n` +
          `  Duplicate module name: ${id}\n` +
          `  Paths: ${module[H.PATH]} collides with ` +
          `${existingModule[H.PATH]}\n\nThis ` +
          `${this._options.throwOnModuleCollision ? 'error' : 'warning'} ` +
          `is caused by a @providesModule declaration ` +
          `with the same name across two different files.`;
        if (this._options.throwOnModuleCollision) {
          throw new Error(message);
        }
        this._console.warn(message);
        // We do NOT want consumers to use a module that is ambiguous.
        delete moduleMap[platform];
        if (Object.keys(moduleMap).length === 1) {
          delete map[id];
        }
        let dupsByPlatform = hasteMap.duplicates[id];
        if (dupsByPlatform == null) {
          dupsByPlatform = hasteMap.duplicates[id] = Object.create(null);
        }
        const dups = dupsByPlatform[platform] = Object.create(null);
        dups[module[H.PATH]] = module[H.TYPE];
        dups[existingModule[H.PATH]] = existingModule[H.TYPE];
        return;
      }

      const dupsByPlatform = hasteMap.duplicates[id];
      if (dupsByPlatform != null) {
        const dups = dupsByPlatform[platform];
        if (dups != null) {
          dups[module[H.PATH]] = module[H.TYPE];
        }
        return;
      }

      moduleMap[platform] = module;
    };

    // If we retain all files in the virtual HasteFS representation, we avoid
    // reading them if they aren't important (node_modules).
    if (this._options.retainAllFiles && this._isNodeModulesDir(filePath)) {
      return null;
    }

    console.log(mockPath, filePath, this._options.mocksPattern, this._options.mocksPattern.test(filePath));

    if (
      this._options.mocksPattern &&
      this._options.mocksPattern.test(filePath)) {
      const mockPath = getMockName(filePath);
      if (mocks[mockPath]) {
        this._console.warn(
          `jest-haste-map: duplicate manual mock found:\n` +
          `  Module name: ${mockPath}\n` +
          `  Duplicate Mock path: ${filePath}\nThis warning ` +
          `is caused by two manual mock files with the same file name.\n` +
          `Jest will use the mock file found in: \n` +
          `${filePath}\n` +
          ` Please delete one of the following two files: \n ` +
          `${mocks[mockPath]}\n${filePath}\n\n`);

      }
      mocks[mockPath] = filePath;
    }

    const fileMetadata = hasteMap.files[filePath];
    const moduleMetadata = hasteMap.map[fileMetadata[H.ID]];
    if (fileMetadata[H.VISITED]) {
      if (!fileMetadata[H.ID]) {
        return null;
      } else if (fileMetadata[H.ID] && moduleMetadata) {
        map[fileMetadata[H.ID]] = moduleMetadata;
        return null;
      }
    }

    return this._getWorker(workerOptions)({
      filePath,
      hasteImplModulePath: this._options.hasteImplModulePath
    }).
    then(
      metadata => {
        // `1` for truthy values instead of `true` to save cache space.
        fileMetadata[H.VISITED] = 1;
        const metadataId = metadata.id;
        const metadataModule = metadata.module;
        if (metadataId && metadataModule) {
          fileMetadata[H.ID] = metadataId;
          setModule(metadataId, metadataModule);
        }
        fileMetadata[H.DEPENDENCIES] = metadata.dependencies || [];
      },
      error => {
        // If a file cannot be read we remove it from the file list and
        // ignore the failure silently.
        delete hasteMap.files[filePath];
      });

  }

  _buildHasteMap(hasteMap) {
    const map = Object.create(null);
    const mocks = Object.create(null);
    const promises = [];

    for (const filePath in hasteMap.files) {
      const promise = this._processFile(hasteMap, map, mocks, filePath);
      if (promise) {
        promises.push(promise);
      }
    }

    const cleanup = () => {
      if (this._workerFarm) {
        workerFarm.end(this._workerFarm);
      }
      this._workerFarm = null;
      this._workerPromise = null;
    };

    return Promise.all(promises).
    then(cleanup).
    then(() => {
      hasteMap.map = map;
      hasteMap.mocks = mocks;
      return hasteMap;
    }).
    catch(error => {
      cleanup();
      return Promise.reject(error);
    });
  }

  /**
   * 4. serialize the new `HasteMap` in a cache file.
   */
  _persist(hasteMap) {
    fs.writeFileSync(this._cachePath, JSON.stringify(hasteMap), 'utf8');
  }

  /**
   * Creates workers or parses files and extracts metadata in-process.
   */
  _getWorker(
    options) {
    if (!this._workerPromise) {
      let workerFn;
      if (options && options.forceInBand || this._options.maxWorkers <= 1) {
        workerFn = worker;
      } else {
        this._workerFarm = workerFarm({
            maxConcurrentWorkers: this._options.maxWorkers
          },

          require.resolve('./worker'));

        workerFn = this._workerFarm;
      }

      this._workerPromise = message =>
        new Promise((resolve, reject) =>
          workerFn(message, (error, metadata) => {
            if (error || !metadata) {
              reject(error);
            } else {
              resolve(metadata);
            }
          }));

    }

    return this._workerPromise;
  }

  _parse(hasteMapPath) {
    const hasteMap = JSON.parse(hasteMapPath);
    for (const key in hasteMap) {
      Object.setPrototypeOf(hasteMap[key], null);
    }
    return hasteMap;
  }

  _crawl(hasteMap) {
    const options = this._options;
    const ignore = this._ignore.bind(this);
    const crawl = canUseWatchman && this._options.useWatchman ?
      watchmanCrawl :
      nodeCrawl;

    const retry = error => {
      if (crawl === watchmanCrawl) {
        this._console.warn(
          `jest-haste-map: Watchman crawl failed. Retrying once with node ` +
          `crawler.\n` +
          `  Usually this happens when watchman isn't running. Create an ` +
          `empty \`.watchmanconfig\` file in your project's root folder or ` +
          `initialize a git or hg repository in your project.\n` +
          `  ` +
          error);

        return nodeCrawl({
          data: hasteMap,
          extensions: options.extensions,
          forceNodeFilesystemAPI: options.forceNodeFilesystemAPI,
          ignore,
          roots: options.roots
        }).
        catch(e => {
          throw new Error(
            `Crawler retry failed:\n` +
            `  Original error: ${error.message}\n` +
            `  Retry error: ${e.message}\n`);

        });
      }

      throw error;
    };

    try {
      return crawl({
        data: hasteMap,
        extensions: options.extensions,
        forceNodeFilesystemAPI: options.forceNodeFilesystemAPI,
        ignore,
        roots: options.roots
      }).
      catch(retry);
    } catch (error) {
      return retry(error);
    }
  }

  /**
   * Watch mode
   */
  _watch(
    hasteMap,
    hasteFS,
    moduleMap) {
    if (!this._options.watch) {
      return Promise.resolve();
    }

    // In watch mode, we'll only warn about module collisions and we'll retain
    // all files, even changes to node_modules.
    this._options.throwOnModuleCollision = false;
    this._options.retainAllFiles = true;

    const Watcher = canUseWatchman && this._options.useWatchman ?
      sane.WatchmanWatcher :
      sane.NodeWatcher;
    const extensions = this._options.extensions;
    const ignorePattern = this._options.ignorePattern;
    let changeQueue = Promise.resolve();
    let eventsQueue = [];
    // We only need to copy the entire haste map once on every "frame".
    let mustCopy = true;

    const createWatcher = root => {
      const watcher = new Watcher(root, {
        dot: false,
        glob: extensions.map(extension => '**/*.' + extension),
        ignored: ignorePattern
      });


      return new Promise((resolve, reject) => {
        const rejectTimeout = setTimeout(
          () => reject(new Error('Failed to start watch mode.')),
          MAX_WAIT_TIME);


        watcher.once('ready', () => {
          clearTimeout(rejectTimeout);
          watcher.on('all', onChange);
          resolve(watcher);
        });
      });
    };

    const emitChange = () => {
      if (eventsQueue.length) {
        mustCopy = true;
        this.emit('change', {
          eventsQueue,
          hasteFS: new HasteFS(hasteMap.files),
          moduleMap: new HasteModuleMap(hasteMap.map, hasteMap.mocks)
        });

        eventsQueue = [];
      }
    };

    const onChange = (
      type,
      filePath,
      root,
      stat) => {
      filePath = path.join(root, filePath);
      if (
        this._ignore(filePath) ||
        !extensions.some(extension => filePath.endsWith(extension))) {
        return;
      }

      changeQueue = changeQueue.
      then(() => {
        // If we get duplicate events for the same file, ignore them.
        if (
          eventsQueue.find(
            event =>
            event.type === type &&
            event.filePath === filePath && (!event.stat && !stat ||
              event.stat &&
              stat &&
              event.stat.mtime.getTime() === stat.mtime.getTime())))

        {
          return null;
        }

        if (mustCopy) {
          mustCopy = false;
          hasteMap = {
            clocks: copy(hasteMap.clocks),
            duplicates: copy(hasteMap.duplicates),
            files: copy(hasteMap.files),
            map: copy(hasteMap.map),
            mocks: copy(hasteMap.mocks)
          };

        }

        const add = () => eventsQueue.push({
          filePath,
          stat,
          type
        });

        // Delete the file and all of its metadata.
        const moduleName =
          hasteMap.files[filePath] && hasteMap.files[filePath][H.ID];
        delete hasteMap.files[filePath];
        delete hasteMap.map[moduleName];
        if (
          this._options.mocksPattern &&
          this._options.mocksPattern.test(filePath)) {
          const mockName = getMockName(filePath);
          delete hasteMap.mocks[mockName];
        }

        this._recoverDuplicates(hasteMap, filePath, moduleName);

        // If the file was added or changed,
        // parse it and update the haste map.
        if (type === 'add' || type === 'change') {
          const fileMetadata = ['', stat.mtime.getTime(), 0, []];
          hasteMap.files[filePath] = fileMetadata;
          const promise = this._processFile(
            hasteMap,
            hasteMap.map,
            hasteMap.mocks,
            filePath, {
              forceInBand: true
            });


          // Cleanup
          this._workerPromise = null;
          if (promise) {
            return promise.then(add);
          } else {
            // If a file in node_modules has changed,
            // emit an event regardless.
            add();
          }
        } else {
          add();
        }
        return null;
      }).
      catch(error => {
        this._console.error(
          `jest-haste-map: watch error:\n  ${error.stack}\n`);

      });
    };

    this._changeInterval = setInterval(emitChange, CHANGE_INTERVAL);
    return Promise.all(
      this._options.roots.map(createWatcher)).
    then(watchers => {
      this._watchers = watchers;
    });
  }

  /**
   * This function should be called when the file under `filePath` is removed
   * or changed. When that happens, we want to figure out if that file was
   * part of a group of files that had the same ID. If it was, we want to
   * remove it from the group. Furthermore, if there is only one file
   * remaining in the group, then we want to restore that single file as the
   * correct resolution for its ID, and cleanup the duplicates index.
   */
  _recoverDuplicates(
    hasteMap,
    filePath,
    moduleName) {
    let dupsByPlatform = hasteMap.duplicates[moduleName];
    if (dupsByPlatform == null) {
      return;
    }
    const platform =
      getPlatformExtension(filePath, this._options.platforms) ||
      H.GENERIC_PLATFORM;
    let dups = dupsByPlatform[platform];
    if (dups == null) {
      return;
    }
    dupsByPlatform = hasteMap.duplicates[moduleName] = copy(
      dupsByPlatform);

    dups = dupsByPlatform[platform] = copy(dups);
    const dedupType = dups[filePath];
    delete dups[filePath];
    const filePaths = Object.keys(dups);
    if (filePaths.length > 1) {
      return;
    }
    let dedupMap = hasteMap.map[moduleName];
    if (dedupMap == null) {
      dedupMap = hasteMap.map[moduleName] = Object.create(null);
    }
    dedupMap[platform] = [filePaths[0], dedupType];
    delete dupsByPlatform[platform];
    if (Object.keys(dupsByPlatform).length === 0) {
      delete hasteMap.duplicates[moduleName];
    }
  }

  end() {
    clearInterval(this._changeInterval);
    if (!this._watchers.length) {
      return Promise.resolve();
    }

    return Promise.all(
      this._watchers.map(
        watcher => new Promise(resolve => watcher.close(resolve)))).

    then(() => this._watchers = []);
  }

  /**
   * Helpers
   */
  _ignore(filePath) {
    const ignorePattern = this._options.ignorePattern;
    const ignoreMatched = ignorePattern instanceof RegExp ?
      ignorePattern.test(filePath) :
      ignorePattern(filePath);

    return (
      ignoreMatched ||
      !this._options.retainAllFiles && this._isNodeModulesDir(filePath));

  }

  _isNodeModulesDir(filePath) {
    if (!filePath.includes(NODE_MODULES)) {
      return false;
    }

    if (this._whitelist) {
      const whitelist = this._whitelist;
      const match = whitelist.exec(filePath);
      const matchEndIndex = whitelist.lastIndex;
      whitelist.lastIndex = 0;

      if (!match) {
        return true;
      }

      const filePathInPackage = filePath.substr(matchEndIndex);
      return filePathInPackage.startsWith(NODE_MODULES);
    }

    return true;
  }

  _createEmptyMap() {
    return {
      clocks: Object.create(null),
      duplicates: Object.create(null),
      files: Object.create(null),
      map: Object.create(null),
      mocks: Object.create(null)
    };

  }
}





const copy = object => Object.assign(Object.create(null), object);

HasteMap.H = H;
HasteMap.ModuleMap = HasteModuleMap;

module.exports = HasteMap;
