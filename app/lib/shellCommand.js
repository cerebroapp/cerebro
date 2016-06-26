import { exec } from 'child_process';

/**
 * Promise-wrapper for shell-script execution
 * @param  {String} cmd command to be executed
 * @return {Promise}
 */
export default function (cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) {
        return reject(error);
      }
      resolve(stdout);
    });
  });
}
