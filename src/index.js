import { assign, includes, get, last, omit } from 'lodash';
import { transform } from 'babel-core';
import jsdocRegex from 'jsdoc-regex';

const defaults = { extensions: ['js'] };

function shouldProcessFile(filename, { extensions }) {
  return includes(extensions, last(filename.split('.')));
}

function countCharInRange(source, from, to, char) {
  let cnt = 0;
  for (let i = from; i < to; i += 1) {
    if (source[i] === char) {
      cnt += 1;
    }
  }
  return cnt;
}

function stripWhitespace(text) {
  return text.replace(/ /g, '');
}

function processFile(source, options, doclets) {
  const regex = jsdocRegex();
  let lastIndex = 0;
  let linesCount = 1;
  let match = regex.exec(source);
  while (match !== null) {
    const { index } = match;
    linesCount += countCharInRange(source, lastIndex, index, '\n');
    const key = stripWhitespace(match[0]);
    // eslint-disable-next-line no-param-reassign
    doclets[key] = linesCount;
    lastIndex = index;
    match = regex.exec(source);
  }
  return transform(source, omit(options, 'extensions')).code;
}

let doclets = {};
// eslint-disable-next-line import/prefer-default-export
export const handlers = {
  beforeParse: (event) => {
    doclets = {};
    const options = assign(defaults, {
      filename: event.filename,
    }, get(global, 'env.conf.babel'));

    if (shouldProcessFile(event.filename, options)) {
      // eslint-disable-next-line no-param-reassign
      event.source = processFile(event.source, options, doclets);
    }
  },
  newDoclet: (e) => {
    if (e) {
      if (doclets[stripWhitespace(e.doclet.comment)]) {
        e.doclet.meta.lineno = doclets[stripWhitespace(e.doclet.comment)];
      }
    }
  },
};
