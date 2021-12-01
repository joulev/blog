import { escapeHTML, escapeRegex } from "./utils";

/**
 * Parse search query.
 * @param {string} query The search query
 * @returns An object containing an object of two arrays of tags and words used
 * in the query. Both arrays don't have repetitive elements
 */
export function parseSearchQuery(query) {
  let tags = new Set();
  let words = new Set();
  query = query.toLowerCase()
    // https://github.com/shelfio/quotation-marks-regex/blob/a1c93fbe35f1d3243577fc2b4b0a56112f57b3bf/index.js#L2
    .replace(/["',‘«»”“’‚‛„‹›〈〉《》「」『』﹁﹂﹃﹄]/g, '"')
    .replace(/"[^"]*"/g, str => {
      const tmpStr = str.replace(/"/g, "");
      if (tmpStr.length !== 0) words.add(escapeHTML(tmpStr));
      return "";
    });
  query.split(" ").map(word => {
    const thisWord = word.replace(/[,\.]/g, "");
    if (thisWord === "" || thisWord === "tag:") return;
    if (thisWord.indexOf("tag:") === -1) words.add(escapeHTML(thisWord));
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
 * Find all occurences of some words inside a given post content
 * @param {string} post The plain content of the post
 * @param {string[]} words The array of word to find occurences of
 * @returns An object indicating the starting and ending point of all occurences,
 * sorted in increasing order, and a boolean array of whether a word has appeared
 * @example
 * // For a string "...___.__...___....." (where ___ are matches), this
 * // array should be returned:
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
 * @example
 * {
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

  // find max element x in match[] such that x[i] <= max_end
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
 * @example
 * {
 *   wordMatchedCount: 4, // number of words in the query that match
 *   matchedCount: 8,     // number of matches in the plain AND the title of the post
 *   countNotPreview: 3,  // number of matches outside the preview
 *   preview: "html",     // the html content of the preview
 *   ...post
 * }
 */
function filterPostWords(post, words) {
  const processTitle = getWordsOccurences(post.title, words);
  const processPlain = getWordsOccurences(post.plain, words);

  const previewInfo = getPreviewInfo(post.plain, processPlain.match);

  let preview = post.plain.substring(previewInfo.start, previewInfo.end);
  const wordsEscaped = words.map(word => escapeRegex(word));
  preview = preview.replace(new RegExp(`(${wordsEscaped.join("|")})`, "gi"),
    '<span class="font-bold underline text-secondary-light dark:text-secondary-dark">$1</span>');
  if (previewInfo.start !== 0) preview = "…" + preview;
  if (previewInfo.end !== post.plain.length - 1) preview = preview + "…";

  const wordAppearPlain = processPlain.wordAppear;
  const wordAppearTitle = processTitle.wordAppear;
  let wordMatchedCount = 0;
  for (let i = 0; i < words.length; i++) if (wordAppearTitle[i] || wordAppearPlain[i]) wordMatchedCount++;

  return {
    wordMatchedCount,
    matchedCount: processPlain.match.length + processTitle.match.length,
    countNotPreview: processPlain.match.length + processTitle.match.length - previewInfo.countPreview,
    preview,
    ...post
  };
}

/**
 * Filter posts that matches the query
 * @param {object[]} posts An array of all posts
 * @param {string[]} words An array of all words in the search query
 * @returns The filtered array of posts where post.wordMatchedCount > 0, sorted
 * by wordMatchedCount then matchedCount
 */
function filterPostsWords(posts, words) {
  return posts.map(post => filterPostWords(post, words)).filter(post => post.wordMatchedCount !== 0)
    .sort((a, b) => a.wordMatchedCount === b.wordMatchedCount ? b.matchedCount - a.matchedCount
                                                              : b.wordMatchedCount - a.wordMatchedCount);
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
