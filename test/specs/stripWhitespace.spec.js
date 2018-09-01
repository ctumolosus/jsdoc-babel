import stripWhitespace from '../../src/stripWhitespace';

describe('stripWhitespace', () => {
  it('should remove whitespace', () => {
    expect(stripWhitespace('f o o')).to.equal('foo');
  });

  it('should remove leading whitespace', () => {
    expect(stripWhitespace(' foo')).to.equal('foo');
  });

  it('should remove trailing whitespace', () => {
    expect(stripWhitespace('foo ')).to.equal('foo');
  });
});
