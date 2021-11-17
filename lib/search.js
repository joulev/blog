/**
 * Parse search query.
 * @param {string} query The search query
 * @returns An object containing an object of two arrays of tags and words used
 * in the query. Both arrays don't have repetitive elements
 */
export function parseSearchQuery(query) {
  let tags = new Set();
  let words = new Set();
  query.toLowerCase().split(" ").map(word => {
    const thisWord = word.replace(/[,\.]/g, "");
    if (thisWord === "" || thisWord === "tag:") return;
    if (thisWord.indexOf("tag:") === -1) words.add(thisWord);
    else tags.add(thisWord.substring(4));
  });
  return { tags: [...tags], words: [...words] };
}




const postHasTag = (post, tag) => post.tag.toLowerCase().split(" ").indexOf(tag) !== -1;
const postHasTags = (post, tags) => {
  for (let i = 0; i < tags.length; i++) {
    if (!postHasTag(post, tags[i])) return false;
  }
  return true;
}
/**
 * Filter all posts that have one of given tags
 * @param {object} posts The post array
 * @param {array} tags An array of tags to filter
 * @returns The updated post array after the filter
 */
function filterPostsTags(posts, tags) {
  if (tags.length === 0) return posts;
  return posts.filter(post => postHasTags(post, tags));
}




const postHasWord = (post, word) =>
  post.title.toLowerCase().indexOf(word) !== -1 || post.plain.toLowerCase().indexOf(word) !== -1;
const postHasWords = (post, words) => {
  let count = 0;
  for (let i = 0; i < words.length; i++) {
    if (postHasWord(post, words[i])) count++;
  }
  return count;
}
/**
 * Filter all posts that have one of given words
 * @param {object} posts The post array
 * @param {array} words An array of words to filter
 * @returns The updated post array after the filter
 */
function filterPostsWords(posts, words) {
  if (words.length === 0) return posts;
  const postSearchWord = posts.map(post => {
    return { post, count: postHasWords(post, words) };
  }).sort((a, b) => b.count - a.count).filter(post => post.count !== 0);
  let res = [];
  postSearchWord.map(postObj => {res.push(postObj.post);});
  return res;
}




/**
 * Filter posts against given words and tags
 * @param {object} posts The post list
 * @param {object} query An object of words and tags to be filtered
 * @returns The filtered post list
 */
export function filterPosts(posts, query) {
  const parsedQuery = parseSearchQuery(query);
  const postAfterTagFilter = filterPostsTags(posts, parsedQuery.tags);
  return filterPostsWords(postAfterTagFilter, parsedQuery.words);
}
