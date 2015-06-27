'use strict';

var _ = require('lodash');
var babel = require('babel-core');

var defaults = {
    extensions: ['js']
};

var options = _.assign(defaults, global.env.conf.babel);

function shouldProcessFile (filename) {
    var extensions = options.extensions;
    var parts = filename.split('.');

    if (parts.length) {
        return (extensions.indexOf(parts[parts.length - 1]) >= 0);
    } else {
        return false;
    }
}

function process (source) {
    var result = babel.transform(source, _.omit(options, 'extensions'));
    return result.code;
}

exports.handlers = {

    beforeParse: function (event) {
        if (shouldProcessFile(event.filename)) {
            event.source = process(event.source);
        }
    }
};
