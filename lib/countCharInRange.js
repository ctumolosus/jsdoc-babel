"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = countCharInRange;

function countCharInRange(source, from, to, char) {
  var count = 0;

  for (var i = from; i < to; i += 1) {
    if (source[i] === char) {
      count += 1;
    }
  }

  return count;
}