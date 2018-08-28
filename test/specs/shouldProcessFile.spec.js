import shouldProcessFile from '../../src/shouldProcessFile';

describe('shouldProcessFile', () => {
  it('should return whether file can be transformed', () => {
    const options = { extensions: ['js', 'jsx'] };
    expect(shouldProcessFile('filename.js', options)).to.equal(true);
    expect(shouldProcessFile('filename.jsx', options)).to.equal(true);
    expect(shouldProcessFile('filename.css', options)).to.equal(false);
  });
});
