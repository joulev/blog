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

/**
 * Selecting the class name for the current theme
 * @param {object} styles The imported styles from stylesheet file
 * @param {boolean} dark True if the current theme is dark, false otherwise
 * @returns styles.dark or styles.light depending on `dark`
 */
export function getThemeClassName(styles, dark) {
  return dark ? styles.dark : styles.light;
}