"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stripWhitespace;

function stripWhitespace(text) {
  return text.replace(/ /g, '');
}