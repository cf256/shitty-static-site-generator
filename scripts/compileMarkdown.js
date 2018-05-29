const { promisify } = require('util');
const path = require('path');
const globP = promisify(require('glob'));
const readFileP = promisify(require('fs').readFile);
const writeFileP = promisify(require('fs').writeFile);
const showdown = require('showdown');
const handlebars = require('handlebars');
const error = require('./error').error;
const srcPath = './src/pages';
const converter = new showdown.Converter();

function compileHandlebars() {
  const filePath = path.join(process.cwd(), 'src', 'layout.hbs');

  return readFileP(filePath, 'utf8')
    .then(contents => {
      return handlebars.compile(contents);
    })
    .catch(error);
}

async function compileMarkdown() {
  const template = await compileHandlebars();
  const stylePath = 'style.css';
  globP('**/*.md', { cwd: `${srcPath}` })
    .then(files => {
      files.forEach(file => {
        const fileHtmlName = file.replace('.md', '.html');
        const filePath = path.join(process.cwd(), 'src', 'pages', file);

        readFileP(filePath, 'utf8')
          .then(contents => {
            const body = converter.makeHtml(contents);

            // TODO: Front matter for page metadata
            const html = template({
              title: 'Test',
              stylesheet: stylePath,
              content: body
            });

            writeFileP(
              path.join(process.cwd(), 'public', `${fileHtmlName}`),
              html,
              'utf8'
            ).catch(error);
          })
          .catch(error);
      });
    })
    .catch(error);
}

module.exports = compileMarkdown;
