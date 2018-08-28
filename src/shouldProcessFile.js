import includes from 'lodash/includes';
import last from 'lodash/last';

export default function shouldProcessFile(filename, options) {
  const { extensions } = options;
  return includes(extensions, last(filename.split('.')));
}
