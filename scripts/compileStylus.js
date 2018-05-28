const { promisify } = require('util');
const path = require('path');
const globP = promisify(require('glob'));
const readFileP = promisify(require('fs').readFile);
const apppendFileP = promisify(require('fs').appendFile);
const stylusP = promisify(require('stylus').render);
const error = require('./error').error;
const srcPath = './src/styles';
const fileName = 'style.css';

function compileStylus() {
  globP('**/*.styl', { cwd: `${srcPath}` })
    .then(files => {
      files.forEach(file => {
        const fileCssName = file.replace('.styl', '.css');

        const filePath = path.join(process.cwd(), 'src', 'styles', file);
        readFileP(filePath, 'utf8')
          .then(contents => {
            stylusP(contents, { filename: fileCssName })
              .then(css => {
                apppendFileP(
                  path.join(process.cwd(), 'public', `${fileName}`),
                  css,
                  'utf8'
                ).catch(error);
              })
              .catch(error);
          })
          .catch(error);
      });
    })
    .catch(error);
}

module.exports = compileStylus;
