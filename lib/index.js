"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlers = void 0;

var _lodash = require("lodash");

var _core = require("@babel/core");

var _jsdocRegex = _interopRequireDefault(require("jsdoc-regex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  extensions: ['js']
};

function shouldProcessFile(filename, _ref) {
  var extensions = _ref.extensions;
  return (0, _lodash.includes)(extensions, (0, _lodash.last)(filename.split('.')));
}

function countCharInRange(source, from, to, char) {
  var cnt = 0;

  for (var i = from; i < to; i += 1) {
    if (source[i] === char) {
      cnt += 1;
    }
  }

  return cnt;
}

function stripWhitespace(text) {
  return text.replace(/ /g, '');
}

function processFile(source, options, doclets) {
  var regex = (0, _jsdocRegex.default)();
  var lastIndex = 0;
  var linesCount = 1;
  var match = regex.exec(source);

  while (match !== null) {
    var _match = match,
        index = _match.index;
    linesCount += countCharInRange(source, lastIndex, index, '\n');
    var key = stripWhitespace(match[0]); // eslint-disable-next-line no-param-reassign

    doclets[key] = linesCount;
    lastIndex = index;
    match = regex.exec(source);
  }

  return (0, _core.transform)(source, (0, _lodash.omit)(options, 'extensions')).code;
}

var doclets = {}; // eslint-disable-next-line import/prefer-default-export

var handlers = {
  beforeParse: function beforeParse(event) {
    doclets = {};
    var options = (0, _lodash.assign)(defaults, {
      filename: event.filename
    }, (0, _lodash.get)(global, 'env.conf.babel'));

    if (shouldProcessFile(event.filename, options)) {
      // eslint-disable-next-line no-param-reassign
      event.source = processFile(event.source, options, doclets);
    }
  },
  newDoclet: function newDoclet(e) {
    if (e) {
      if (doclets[stripWhitespace(e.doclet.comment)]) {
        e.doclet.meta.lineno = doclets[stripWhitespace(e.doclet.comment)];
      }
    }
  }
};
exports.handlers = handlers;