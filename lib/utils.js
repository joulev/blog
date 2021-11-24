import { compile } from "html-to-text";

/**
 * Convert HTML to plain text for use in previews
 * @param {string} html The HTML string
 * @returns The plain string version of the HTML string
 */
export function getPlainFromHTML(html) {
  return compile({
    formatters: {
      "plainHeading": (elem, walk, builder, formatOptions) => {
        builder.openBlock({ trailingLineBreaks: 1 });
        walk(elem.children, builder);
        builder.addInline(":");
        builder.closeBlock({ trailingLineBreaks: 1 });
      }
    },
    selectors: [
      { selector: "h1", format: "plainHeading" },
      { selector: "h2", format: "plainHeading" },
      { selector: "h3", format: "plainHeading" },
      { selector: "h4", format: "plainHeading" },
      { selector: "h5", format: "plainHeading" },
      { selector: "h6", format: "plainHeading" },
      { selector: "table", options: { uppercaseHeaderCells: false } }
    ]
  })(html);
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
