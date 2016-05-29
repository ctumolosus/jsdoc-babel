var _ = require('lodash');
var babel = require('babel-core');
var plugin = require('../../src/index');

var expect = chai.expect;

describe('babel parser', function () {

  var sandbox = sinon.sandbox.create();

  var source = 'const { attribute } = object;';
  var transpiled = 'var attribute = object.attribute;';

  _.set(global, 'env.conf.babel', {
    extensions: ['js', 'jsx'],
    optional: ['runtime']
  });

  beforeEach(function () {
    sandbox.spy(babel, 'transform');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should transpile source code', () => {
    var event = { source: source, filename: '/path/to/file.js' };
    plugin.handlers.beforeParse(event);
    expect(event.source).to.equal(babel.transform(source).code);
  });

  it('should not transpile files that do not match configured extensions', function () {
    var event = { source: source, filename: '/path/to/file.ufo' };
    plugin.handlers.beforeParse(event);
    expect(babel.transform).to.not.have.been.called;
    expect(event.source).to.equal(source); // not transpiled
  });

  it('should pass options to babel transformer without extensions', function () {
    var event = { source: source, filename: '/path/to/file.jsx' };
    plugin.handlers.beforeParse(event);
    expect(babel.transform).to.have.been.calledOnce;
    expect(babel.transform).to.have.been.calledWithExactly(source, { optional: ['runtime'] });
  });

});
