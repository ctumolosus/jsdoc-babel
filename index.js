'use strict';

var _ = require('lodash');
var babel = require('babel-core');

var defaults = {
    extensions: ['js']
};

function shouldProcessFile (filename, options) {
    var extensions = options.extensions;
    var parts = filename.split('.');

    if (parts.length) {
        return (extensions.indexOf(parts[parts.length - 1]) >= 0);
    } else {
        return false;
    }
}

function process (source, options) {
    var result = babel.transform(source, _.omit(options, 'extensions'));
    return result.code;
}

exports.handlers = {

    beforeParse: function (event) {
        var options = _.assign(defaults, _.get(global, 'env.conf.babel'));

        if (shouldProcessFile(event.filename, options)) {
            event.source = process(event.source, options);
        }
    }
};
