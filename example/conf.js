module.exports = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure']
  },
  source: {
    include: ['src'],
    includePattern: '.+\\.js(doc)?$',
    excludePattern: '(^|\\/|\\\\)_'
  },
  plugins: [
    'node_modules/jsdoc-babel'
  ],
  templates: {
    cleverLinks: true,
    monospaceLinks: true
  },
  opts: {
    encoding: 'utf8',
    private: true,
    recurse: true
  },
}
