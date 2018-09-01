import fs from 'fs';

import countCharInRange from '../../src/countCharInRange';

describe('countCharInRange', () => {
  it('should count newline appearances in file', () => {
    const source = fs.readFileSync('./test/fixtures/async.js', 'utf8');
    expect(countCharInRange(source, 0, source.length, '\n')).to.equal(15);
  });

  it('should count number of characters within section of file', () => {
    const source = fs.readFileSync('./test/fixtures/async.js', 'utf8');
    const startIndex = source.indexOf('try');
    const endIndex = source.indexOf('return');
    expect(countCharInRange(source, startIndex, endIndex, '\n')).to.equal(6);
  });
});
