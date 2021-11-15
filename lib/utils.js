/**
 * Get the URL of a post
 * @param {string} time The date of the article
 * @param {string} name The file name of the article
 * @returns The URL to the article
 */
export function getPostUrlFromProps(time, name) {
  const dateArr = time.split("/");
  return `/posts/${dateArr[2]}/${dateArr[1]}/${dateArr[0]}/${name}`;
}

/**
 * Truncate a string to only 150 characters
 * @param {string} content The plain content
 * @returns The truncated content
 */
export function truncatePlainContent(content) {
  const truncateNum = 150;
  return content.length <= truncateNum ? content : content.substring(0, truncateNum) + "…";
}
