import { set } from 'lodash';
import * as babel from 'babel-core';
import { handlers } from '../../src/index';

describe('babel parser', () => {
  const sandbox = sinon.sandbox.create();
  const source = 'const { attribute } = object;';

  set(global, 'env.conf.babel', {
    extensions: ['js', 'jsx'],
    presets: ['es2015'],
  });

  beforeEach(() => {
    sandbox.spy(babel, 'transform');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should transpile source code', () => {
    const event = { source, filename: '/path/to/file.js' };
    const transpiled = babel.transform(source, { presets: ['es2015'] }).code;
    handlers.beforeParse(event);
    expect(event.source).to.equal(transpiled);
  });

  it('should not transpile files that do not match configured extensions', () => {
    const event = { source, filename: '/path/to/file.ufo' };
    handlers.beforeParse(event);
    expect(babel.transform).to.not.have.been.called;
    expect(event.source).to.equal(source); // not transpiled
  });

  it('should pass options to babel transformer without extensions', () => {
    const event = { source, filename: '/path/to/file.jsx' };
    handlers.beforeParse(event);
    expect(babel.transform).to.have.been.calledOnce;
    expect(babel.transform).to.have.been.calledWithExactly(source, { presets: ['es2015'] });
  });
});
