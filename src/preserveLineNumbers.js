import jsdocRegex from 'jsdoc-regex';

import countCharInRange from './countCharInRange';
import stripWhitespace from './stripWhitespace';

export default function preserveLineNumbers(source) {
  const regex = jsdocRegex();
  const doclets = {};

  let lastIndex = 0;
  let linesCount = 1;
  let match = regex.exec(source);

  while (match !== null) {
    const { index } = match;
    const key = stripWhitespace(match[0]);
    linesCount += countCharInRange(source, lastIndex, index, '\n');
    doclets[key] = linesCount;
    lastIndex = index;
    match = regex.exec(source);
  }

  return doclets;
}
