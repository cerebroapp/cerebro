import React from 'react';
import Preload from './Preload';
import { getFileIcon } from 'lib/rpc/functions';
import memoize from 'memoizee';

/**
 * Render icon for provided path.
 * It will render the same icon, that you see in Finder
 *
 * @param  {String} options.className
 * @param  {String} options.path
 * @return {Function}
 */
const FileIcon = ({className, path}) => {
  return (
    <Preload promise={getFileIcon(path)} key={path}>
      {(src) =>  <img src={src} alt="" className={className} />}
    </Preload>
  );
}

export default memoize(FileIcon);
