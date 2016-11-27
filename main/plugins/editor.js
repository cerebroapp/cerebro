import fs from 'fs';
import search from 'lib/search';
import shellCommand from 'lib/shellCommand';

// TODO: make configurable
const PROJECTS_PATH = `/Users/${process.env.USER}/projects`;

/**
 * Plugin to open directory in editor
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const editorPlugin = ({term, display}) => {
  const match = term.match(/^e\s(.*)/);
  if (match) {
    fs.readdir(PROJECTS_PATH, (err, items) => {
      const result = search(items, match[1]).map(file => {
        const path = [PROJECTS_PATH, file].join('/');
        return {
          term: `e ${file}`,
          title: file,
          subtitle: `Open ${path} in editor`,
          onSelect: shellCommand.bind(null, `e ${path}`),
        };
      });
      display(result);
    });
  }
};

export default {
  name: 'Open in editor',
  keyword: 'e',
  fn: editorPlugin,
};
