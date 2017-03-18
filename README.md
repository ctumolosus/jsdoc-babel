[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

# jsdoc-babel

[![Greenkeeper badge](https://badges.greenkeeper.io/ctumolosus/jsdoc-babel.svg)](https://greenkeeper.io/)

A JSDoc plugin that transforms source files with Babel 6 before they are processed.

## Installation

The `jsdoc-babel` plugin can be installed using NPM.

```bash
npm install jsdoc-babel --save-dev
```

## Usage

To use plugin you should include the plugin module in the `plugins` array of
[JSDoc's configuration file](http://usejsdoc.org/about-configuring-jsdoc.html).

```json
{
    "plugins": ["node_modules/jsdoc-babel"]
}
```

### Processing files with different extensions

By default, the plugin only processes files that have a `.js` extension. You
could enable transformation for other file extensions by adding the following
settings to your JSDoc configuration file:

```json
{
    "plugins": ["node_modules/jsdoc-babel"],
    "babel": {
        "extensions": ["js", "es6", "jsx"]
    }
}
```

### Passing options through Babel

If Babel can resolve a `.babelrc` file in your project, it will be parsed as the
transformer options.

Alternatively, you can define [options](https://babeljs.io/docs/usage/api/#options)
to be passed through Babel by adding them to your JSDoc configuration file:

```json
{
    "plugins": ["node_modules/jsdoc-babel"],
    "babel": {
        "presets": ["es2015"]
    }
}
```

Note that options defined in the JSDoc configuration file will take precedence
over those defined in your `.babelrc` file.

If you would prefer to disable `.babelrc` file resolution, you can use the
`babelrc` option:

```json
{
    "plugins": ["node_modules/jsdoc-babel"],
    "babel": {
        "presets": ["es2015"],
        "babelrc": false
    }
}
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/jsdoc-babel.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/jsdoc-babel
[travis-image]: https://img.shields.io/travis/ctumolosus/jsdoc-babel/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/ctumolosus/jsdoc-babel
[downloads-image]: https://img.shields.io/npm/dm/jsdoc-babel.svg?style=flat-square
[downloads-url]: https://www.npmjs.com/package/jsdoc-babel
