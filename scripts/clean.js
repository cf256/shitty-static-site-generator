const rimraf = require('rimraf');
const path = require('path');
const publicFolder = path.join(process.cwd(), 'public');

function clean() {
  rimraf(`${publicFolder}/*`, () => {
    console.log('Cleaned public folder');
  });
}

module.exports = clean;
