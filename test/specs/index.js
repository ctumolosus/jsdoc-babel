import { set } from 'lodash';
import * as babel from '@babel/core';
import { handlers } from '../../src/index';

describe('babel parser', () => {
  const sandbox = sinon.sandbox.create();
  const source = 'const { attribute } = object;';
  const transpiled = '"use strict"; var _object = object, attribute = _object.attribute;';

  set(global, 'env.conf.babel', {
    extensions: ['js', 'jsx'],
    presets: ['es2015'],
    plugins: ['transform-runtime'],
  });

  beforeEach(() => {
    sandbox.stub(babel, 'transform')
      .withArgs(source, sinon.match.object)
      .returns({ code: transpiled });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should transpile source code', () => {
    const event = { source, filename: '/path/to/file.js' };
    handlers.beforeParse(event);
    expect(babel.transform).to.have.been.calledOnce;
    expect(event.source).to.equal(transpiled);
  });

  it('should not transpile files that do not match configured extensions', () => {
    const event = { source, filename: '/path/to/file.ufo' };
    handlers.beforeParse(event);
    expect(babel.transform).to.not.have.been.called;
    expect(event.source).to.equal(source); // not transpiled
  });

  it('should not pass extensions to babel transformer', () => {
    const event = { source, filename: '/path/to/file.jsx' };
    handlers.beforeParse(event);
    expect(babel.transform).to.have.been.calledOnce;
    expect(babel.transform).to.not.have.been.calledWith(source, sinon.match({
      extensions: ['js', 'jsx'],
    }));
  });

  it('should pass other options to babel transformer', () => {
    const event = { source, filename: '/path/to/file.jsx' };
    handlers.beforeParse(event);
    expect(babel.transform).to.have.been.calledOnce;
    expect(babel.transform).to.have.been.calledWith(source, sinon.match({
      presets: ['es2015'],
      plugins: ['transform-runtime'],
    }));
  });

  it('should pass file name to babel transformer', () => {
    const event = { source, filename: '/path/to/file.jsx' };
    handlers.beforeParse(event);
    expect(babel.transform).to.have.been.calledOnce;
    expect(babel.transform).to.have.been.calledWithExactly(source, sinon.match({
      filename: event.filename,
    }));
  });
});
