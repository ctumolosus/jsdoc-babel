import { assign, includes, get, last, omit } from 'lodash';
import { transform } from 'babel-core';

const defaults = { extensions: ['js'] };

function shouldProcessFile(filename, { extensions }) {
  return includes(extensions, last(filename.split('.')));
}

function process(source, options) {
  return transform(source, omit(options, 'extensions')).code;
}

export const handlers = {
  beforeParse: (event) => {
    const options = assign(defaults, get(global, 'env.conf.babel'));

    if (shouldProcessFile(event.filename, options)) {
      event.source = process(event.source, options); // eslint-disable-line
    }
  },
};
