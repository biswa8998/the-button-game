/**
 * Generate a random number based on the limit provided.
 * If ceil is not true, 0 will be included else random number will not return 0
 * @param {*} limit
 * @param {*} ceil
 */
export function getRandomNumber(limit, ceil = false) {
  return !ceil
    ? Math.floor(Math.random() * limit)
    : Math.ceil(Math.random() * limit);
}
