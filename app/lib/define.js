import shellCommand from './shellCommand';

export default (word) => {
  return shellCommand(`open dict://"${word}"`);
}
