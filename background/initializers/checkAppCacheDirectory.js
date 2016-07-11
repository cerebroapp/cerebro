import fs from 'fs';

const CACHE_DIR = `/Users/${process.env.USER}/.cerebro/`

export default () => {
  if (!fs.existsSync(CACHE_DIR)){
    fs.mkdirSync(CACHE_DIR);
  }
}
