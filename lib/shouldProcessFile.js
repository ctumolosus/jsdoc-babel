"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shouldProcessFile;

var _includes = _interopRequireDefault(require("lodash/includes"));

var _last = _interopRequireDefault(require("lodash/last"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shouldProcessFile(filename, options) {
  var extensions = options.extensions;
  return (0, _includes.default)(extensions, (0, _last.default)(filename.split('.')));
}