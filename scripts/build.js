/**
 * Favicon
 * 4. Working Partials
 * async await
 * 5. Read Config
 * 6. Read Data
 * 7. Site Metadata
 * 8. Hot Reload
 * 9. Auto Deploy
 * Asset loading
 */
const clean = require('./clean');
const compileStylus = require('./compileStylus');
const compileMarkdown = require('./compileMarkdown');

function build() {
  clean();
  compileStylus();
  compileMarkdown();
}

module.exports = build;
