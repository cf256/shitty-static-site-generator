/**
 * Link css with HTML
 * 3. Working Layouts
 * 4. Working Partials
 * 5. Read Config
 * 6. Read Data
 * 7. Site Metadata
 * 8. Hot Reload
 * 9. Auto Deploy
 * 11. Git + gitignore
 * Asset loading
 * Favicon
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
