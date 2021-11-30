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
 * @param {object[]} posts The post array
 * @param {string[]} tags An array of tags to filter
 * @returns The updated post array after the filter
 */
function filterPostsTags(posts, tags) {
  if (tags.length === 0) return posts;
  return posts.filter(post => postHasTags(post, tags));
}




/**
 * Add phrases before and after all occurences of a word
 * @param {string} original Original plain content
 * @param {string} src The word to be replaced, CASE-INSENSITIVE
 * @param {string} before The phrase to add before the word
 * @param {string} after The phrase to add after the word
 * @returns The altered plain content
 */
function addHeadAndTailToString(original, src, before, after) {
  const original_lower = original.toLowerCase();
  const src_lower = src.toLowerCase();
  let res = "";
  for (let i = 0; i < original.length; i++) {
    if (original_lower[i] === src_lower[0]) {
      let j = i + 1;
      while (j < original.length && j - i < src.length && original_lower[j] === src_lower[j - i]) j++;
      if (j - i === src.length) {
        res += (before + original.substring(i, j) + after);
        i = j - 1;
      } else res += original[i];
    } else res += original[i];
  }
  return res;
}

/**
 * Find all occurences of some words inside a given post content
 * @param {string} post The plain content of the post
 * @param {string[]} words The array of word to find occurences of
 * @returns An object indicating the starting and ending point of all occurences,
 * sorted in increasing order, and a boolean array of whether a word has appeared
 * @example For a string "...___.__...___....." (where ___ are matches), this
 * array should be returned:
 * {
 *   match: [
 *     [3, 5],
 *     [7, 8],
 *     [12, 14]
 *   ],
 *   wordAppear: [true, false, true, ...]
 * }
 */
function getWordsOccurences(post, words) {
  let matchArr = [];
  const wordAppear = words.map(word => {
    let postLower = post.toLowerCase();
    let index = postLower.indexOf(word);
    let thiswordAppeared = false;
    while (index !== -1) {
      matchArr.push([index, index + word.length - 1]);
      index = postLower.indexOf(word, index + 1);
      thiswordAppeared = true;
    }
    return thiswordAppeared;
  });
  matchArr.sort((a, b) => a[0] - b[0]); // can also guarantee sorted by a[1] too
  return { match: matchArr, wordAppear };
}

/**
 * Get information about the preview string
 * @param {string} post The plain content of the post
 * @param {array[]} match The array retrieved by getWordsOccurences
 * @returns An object of information about the preview string
 * @example {
 *   start: 1,        // Starting index of the preview text in the plain string
 *   end: 5,          // Ending index of the preview text in the plain string,
 *   countPreview: 2  // Number of occurences inside the preview text
 * }
 */
function getPreviewInfo(post, match) {
  const length = 150;
  const padding = 30;

  const failureCase = { start: 0, end: length, countPreview: 0 };

  if (match.length === 0) return failureCase;

  const max_start = Math.max(0, match[0][0] - padding);
  const max_end = Math.min(max_start + length, post.length + padding);

  // find max element x in match[] such that x[i] <= max_end: binary search?
  const max_match_pos = ((match, max_val) => {
    for (let i = 0; i < match.length; i++) if (match[i][1] > max_val) return i - 1;
    return match.length - 1;
  })(match, max_end - padding);

  if (max_match_pos === -1) return failureCase;

  const elm_end = match[max_match_pos][1];
  const elm_start = match[0][0];
  const res_mid = Math.floor((elm_end + elm_start) / 2);
  const start = Math.max(0, res_mid - Math.floor(length / 2));
  const end = Math.min(post.length, start + length);

  return {start, end, countPreview: max_match_pos + 1};
}

/**
 * Process a post against the words in the search query
 * @param {object} post The post with all metadata as retrieved from listPosts()
 * @param {string[]} words The words in the search query
 * @returns An object of all information of the post with the information of the preview
 * @example {
 *   count: 5,         // total number of distinct words in the query that appear
 *                     // in both the title and body
 *   countPreview: 3,  // total number of occurences in the preview
 *   preview: "html",  // the html content of the preview
 *   ...post
 * }
 */
function filterPostWords(post, words) {
  const processPlain = getWordsOccurences(post.plain, words);
  const matchArr = processPlain.match;
  const previewInfo = getPreviewInfo(post.plain, matchArr);

  let preview = post.plain.substring(previewInfo.start, previewInfo.end);
  const wordsEscaped = words.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  preview = preview.replace(new RegExp(`(${wordsEscaped.join("|")})`, "gi"),
    '<span class="font-bold underline text-secondary-light dark:text-secondary-dark">$1</span>');

  if (previewInfo.start !== 0) preview = "…" + preview;
  if (previewInfo.end !== post.plain.length - 1) preview = preview + "…";

  const wordAppearPlain = processPlain.wordAppear;
  const wordAppearTitle = getWordsOccurences(post.title, words).wordAppear;
  let matchedCount = 0;
  for (let i = 0; i < words.length; i++) if (wordAppearTitle[i] || wordAppearPlain[i]) matchedCount++;

  return {
    count: matchedCount,
    countPreview: previewInfo.countPreview,
    countNotPreview: matchArr.length - previewInfo.countPreview,
    preview,
    ...post
  };
}

/**
 * Filter posts that matches the query
 * @param {object[]} posts An array of all posts
 * @param {string[]} words An array of all words in the search query
 * @returns The filtered array of posts where post.count > 0, sorted by count
 */
function filterPostsWords(posts, words) {
  return posts.map(post => filterPostWords(post, words))
              .filter(post => post.count !== 0)
              .sort((a, b) => b.count - a.count);
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
