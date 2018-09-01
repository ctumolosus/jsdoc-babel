"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformFile;

var _core = require("@babel/core");

function transformFile(source, options) {
  var _transform = (0, _core.transform)(source, options),
      code = _transform.code;

  return code;
}