import assign from 'lodash/assign';
import get from 'lodash/get';
import omit from 'lodash/omit';

import preserveLineNumbers from './preserveLineNumbers';
import shouldProcessFile from './shouldProcessFile';
import stripWhitespace from './stripWhitespace';
import transformFile from './transformFile';

const defaultOptions = {
  extensions: ['js'],
};

let doclets = {};

// eslint-disable-next-line import/prefer-default-export
export const handlers = {
  beforeParse: (event) => {
    const { filename, source } = event;
    const globalOptions = get(global, 'env.conf.babel');
    const options = assign({}, defaultOptions, globalOptions, { filename });

    doclets = {};

    if (shouldProcessFile(event.filename, options)) {
      doclets = preserveLineNumbers(source);
      // eslint-disable-next-line no-param-reassign
      event.source = transformFile(source, omit(options, 'extensions'));
    }
  },
  newDoclet: (event) => {
    if (event) {
      if (doclets[stripWhitespace(event.doclet.comment)]) {
        // eslint-disable-next-line no-param-reassign
        event.doclet.meta.lineno = doclets[stripWhitespace(event.doclet.comment)];
      }
    }
  },
};
