"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preserveLineNumbers;

var _jsdocRegex = _interopRequireDefault(require("jsdoc-regex"));

var _countCharInRange = _interopRequireDefault(require("./countCharInRange"));

var _stripWhitespace = _interopRequireDefault(require("./stripWhitespace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function preserveLineNumbers(source) {
  var regex = (0, _jsdocRegex.default)();
  var doclets = {};
  var lastIndex = 0;
  var linesCount = 1;
  var match = regex.exec(source);

  while (match !== null) {
    var _match = match,
        index = _match.index;
    var key = (0, _stripWhitespace.default)(match[0]);
    linesCount += (0, _countCharInRange.default)(source, lastIndex, index, '\n');
    doclets[key] = linesCount;
    lastIndex = index;
    match = regex.exec(source);
  }

  return doclets;
}