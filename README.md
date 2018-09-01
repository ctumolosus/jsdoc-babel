[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/ctumolosus/jsdoc-babel.svg)](https://greenkeeper.io/)

# jsdoc-babel

A [JSDoc][jsdoc] plugin that transforms source files with [Babel][babel] before they are processed.

> JSDoc uses the Babylon JavaScript parser since [version 3.5.0](https://github.com/jsdoc3/jsdoc/releases/tag/3.5.0), which means that JSDoc can parse any JavaScript or JSX file that is supported by the Babel compiler. You may not need to use this plugin unless you need to preprocess unsupported syntax in your source code.

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

Alternatively, you can define [options](https://babeljs.io/docs/en/options)
to be passed through Babel by adding them to your JSDoc configuration file:

```json
{
    "plugins": ["node_modules/jsdoc-babel"],
    "babel": {
        "presets": ["@babel/env"]
    }
}
```

Note that options defined in the JSDoc configuration file will take precedence
over those defined in your `.babelrc` file.

If you would prefer to disable `.babelrc` file resolution, you can use the
[`babelrc`](https://babeljs.io/docs/en/options#babelrc) option:

```json
{
    "plugins": ["node_modules/jsdoc-babel"],
    "babel": {
        "presets": ["@babel/env"],
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
[jsdoc]: http://usejsdoc.org/
[babel]: https://babeljs.io/
