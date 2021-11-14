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