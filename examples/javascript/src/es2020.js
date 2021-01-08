const a = {
  b: {
    c: 100,
  },
};

/**
 * A number with optional chaining
 * @type {number}
 */
const d = a.b.c?.d;

export default d;
