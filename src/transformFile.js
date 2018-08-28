import { transform } from '@babel/core';

export default function transformFile(source, options) {
  const { code } = transform(source, options);
  return code;
}
