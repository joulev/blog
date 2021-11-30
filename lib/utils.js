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
 * Strip all Markdown element from a given Markdown string.
 * 
 * Note that this is ONLY DESIGNED TO WORK FOR THE POST FILES HERE. I just add
 * minimal number of rules here and add more to it as I need in the future, so
 * it doesn't necessarily work for any (valid) Markdown string.
 * 
 * tl;dr this is not for anything other than the md files inside /posts
 * 
 * @param {string} md Markdown content without frontmatter
 * @returns The plain text version
 */
export function removeMarkdown(md) {
  // Heading: end with colon
  md = md.replace(/^#{1,6}\s(.*)$/gm, "$1:");
  // Hyperlink: note: I intentionally skip [text][1] case. I only use [text](url).
  md = md.replace(/\[(.*)\]\(.*\)/g, "$1");
  // En dash and minus
  md = md.replace(/&(ndash|minus);/g, "–");
  // Right arrow
  md = md.replace(/&rarr;/g, "→");
  // Blockquote: note: I never write > at start of line unless it's blockquote
  md = md.replace(/^>\s/gm, "");
  // <hr>
  md = md.replace(/^---$/gm, "");
  // Unordered list
  md = md.replace(/^\*/gm, "•");
  // Formatting: bold
  md = md.replace(/\*\*(.*)\*\*/g, "$1");
  // Formatting: emph: note: I never use _italic_
  md = md.replace(/\*(.*)\*/g, "$1");
  // Code block: not gonna use regex for this
  let i = 0;
  let inCodeBlock = false;
  while (i < md.length) {
    if (md[i] === "`") {
      if (md[i + 1] === "`") {
        inCodeBlock = !inCodeBlock;
        // cmon there must be an easier way to mutate strings...
        while (md[i] != "\n") md = md.substr(0, i) + md.substr(i + 1);
        i++;
      } else {
        if (!inCodeBlock) md = md.substr(0, i) + md.substr(i + 1);
        else i++;
      }
    } else i++;
  }
  // HTML tags
  md = md.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return md;
}
