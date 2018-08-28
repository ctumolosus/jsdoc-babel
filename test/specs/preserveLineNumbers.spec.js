import fs from 'fs';

import preserveLineNumbers from '../../src/preserveLineNumbers';

describe('preserveLineNumbers', () => {
  it('should map comment blocks to line numbers in original source file', () => {
    const source = fs.readFileSync('./test/fixtures/react.js', 'utf8');
    const doclets = preserveLineNumbers(source);
    expect(Object.values(doclets)).to.deep.equal([3, 8, 20, 29, 38]);
  });

  it('should remove whitespaces from comment blocks used as keys', () => {
    const source = fs.readFileSync('./test/fixtures/react.js', 'utf8');
    const doclets = preserveLineNumbers(source);
    const whitespace = ' ';
    Object.keys(doclets).forEach((key) => {
      expect(key).to.not.contain(whitespace);
    });
  });
});
