'use strict';

var chai = require('chai');
var sinon = require('sinon');

global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;

chai.use(require('sinon-chai'));
