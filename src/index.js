import { assign, includes, get, last, omit } from 'lodash';
import { transform } from 'babel-core';

const defaults = { extensions: ['js'] };

function shouldProcessFile(filename, { extensions }) {
  return includes(extensions, last(filename.split('.')));
}

function processFile(source, options) {
  return transform(source, omit(options, 'extensions')).code;
}

// eslint-disable-next-line import/prefer-default-export
export const handlers = {
  beforeParse: (event) => {
    const options = assign(defaults, {
      filename: event.filename,
    }, get(global, 'env.conf.babel'));

    if (shouldProcessFile(event.filename, options)) {
      // eslint-disable-next-line no-param-reassign
      event.source = processFile(event.source, options);
    }
  },
};
