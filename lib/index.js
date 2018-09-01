"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlers = void 0;

var _assign = _interopRequireDefault(require("lodash/assign"));

var _get = _interopRequireDefault(require("lodash/get"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _preserveLineNumbers = _interopRequireDefault(require("./preserveLineNumbers"));

var _shouldProcessFile = _interopRequireDefault(require("./shouldProcessFile"));

var _stripWhitespace = _interopRequireDefault(require("./stripWhitespace"));

var _transformFile = _interopRequireDefault(require("./transformFile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  extensions: ['js']
};
var doclets = {}; // eslint-disable-next-line import/prefer-default-export

var handlers = {
  beforeParse: function beforeParse(event) {
    var filename = event.filename,
        source = event.source;
    var globalOptions = (0, _get.default)(global, 'env.conf.babel');
    var options = (0, _assign.default)({}, defaultOptions, globalOptions, {
      filename: filename
    });
    doclets = {};

    if ((0, _shouldProcessFile.default)(event.filename, options)) {
      doclets = (0, _preserveLineNumbers.default)(source); // eslint-disable-next-line no-param-reassign

      event.source = (0, _transformFile.default)(source, (0, _omit.default)(options, 'extensions'));
    }
  },
  newDoclet: function newDoclet(event) {
    if (event) {
      if (doclets[(0, _stripWhitespace.default)(event.doclet.comment)]) {
        // eslint-disable-next-line no-param-reassign
        event.doclet.meta.lineno = doclets[(0, _stripWhitespace.default)(event.doclet.comment)];
      }
    }
  }
};
exports.handlers = handlers;