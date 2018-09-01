import fs from 'fs';
import set from 'lodash/set';

import { handlers } from '../../src/index';
import * as transformFile from '../../src/transformFile';

describe('beforeParse', () => {
  before(() => {
    set(global, 'env.conf.babel', {
      extensions: ['js', 'jsx'],
      presets: ['@babel/env'],
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  after(() => {
    delete global.env.conf.babel;
  });

  it('should transpile source code', () => {
    const filename = './test/fixtures/async.js';
    const source = fs.readFileSync(filename, 'utf8');
    const event = { source, filename };
    handlers.beforeParse(event);
    expect(event.source).to.not.equal(source);
  });

  it('should not transpile files that do not match configured extensions', () => {
    const filename = './test/fixtures/async.html';
    const source = fs.readFileSync('./test/fixtures/async.js', 'utf8');
    const event = { source, filename };
    handlers.beforeParse(event);
    expect(event.source).to.equal(source);
  });

  it('should not pass extensions to babel transformer', () => {
    const filename = './test/fixtures/async.js';
    const source = fs.readFileSync(filename, 'utf8');
    const event = { source, filename };
    const spy = sinon.spy(transformFile, 'default');
    handlers.beforeParse(event);
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.not.have.been.calledWithExactly(source, sinon.match({
      extensions: ['js', 'jsx'],
    }));
  });

  it('should pass other options to babel transformer', () => {
    const filename = './test/fixtures/async.js';
    const source = fs.readFileSync(filename, 'utf8');
    const event = { source, filename };
    const spy = sinon.spy(transformFile, 'default');
    handlers.beforeParse(event);
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.been.calledWithExactly(source, sinon.match({
      presets: ['@babel/env'],
    }));
  });

  it('should pass file name to babel transformer', () => {
    const filename = './test/fixtures/async.js';
    const source = fs.readFileSync(filename, 'utf8');
    const event = { source, filename };
    const spy = sinon.spy(transformFile, 'default');
    handlers.beforeParse(event);
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.been.calledWithExactly(source, sinon.match({
      filename,
    }));
  });
});
