const { promisify } = require('util');
const path = require('path');
const globP = promisify(require('glob'));
const readFileP = promisify(require('fs').readFile);
const copyFileP = promisify(require('fs').copyFile);
const error = require('./error').error;
const srcPath = './src/assets';
const destPath = path.join(process.cwd(), 'public');

function moveAssets() {
  globP('*.*', { cwd: `${srcPath}` })
    .then(files => {
      files.forEach(file => {
        copyFileP(
          path.join(process.cwd(), 'src', 'assets', file),
          path.join(destPath, file)
        )
          .then(_ => {
            console.log('hello');
          })
          .catch(error);
      });
    })
    .catch(error);
}

module.exports = moveAssets;
