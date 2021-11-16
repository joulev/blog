/**
 * Parse search query.
 * @param {string} query The search query
 * @returns An object containing an object of two arrays of tags and words used
 * in the query. Both arrays don't have repetitive elements
 */
export function parseSearchQuery(query) {
  let tags = new Set();
  let words = new Set();
  query.split(" ").map(word => {
    if (word.indexOf("tag:") === -1) words.add(word);
    else tags.add(word.substring(4));
  });
  return { tags: [...tags], words: [...words] };
}
