export default function countCharInRange(source, from, to, char) {
  let count = 0;

  for (let i = from; i < to; i += 1) {
    if (source[i] === char) {
      count += 1;
    }
  }

  return count;
}
