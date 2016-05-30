[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

# jsdoc-babel

A JSDoc plugin that transforms source files with Babel 6 before they are processed.

## Installation

The `jsdoc-babel` plugin can be installed using NPM.

```bash
npm install jsdoc-babel --save-dev
```

## Usage

To use plugin you should include the plugin module in the `plugins` array of [JSDoc's configuration file](http://usejsdoc.org/about-configuring-jsdoc.html).

```json
{
    "plugins": ["node_modules/jsdoc-babel"]
}
```

### Processing files with different extensions

By default, the plugin only processes files that have a `.js` extension. You could enable transformation for other file extensions by adding the following settings to your JSDoc configuration file:

```json
{
    "plugins": ["node_modules/jsdoc-babel"],
    "babel": {
        "extensions": ["js", "es6", "jsx"]
    }
}
```

### Passing options through Babel

You can define [options](http://babeljs.io/docs/usage/options/) to be passed through Babel by adding them to your JSDoc configuration file:

```json
{
    "plugins": ["node_modules/jsdoc-babel"],
    "babel": {
        "presets": ["es2015"]
    }
}
```

[npm-image]: https://img.shields.io/npm/v/jsdoc-babel.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/jsdoc-babel
[travis-image]: https://img.shields.io/travis/ctumolosus/jsdoc-babel/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/ctumolosus/jsdoc-babel
