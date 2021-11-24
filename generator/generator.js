"use strict";

// This should only be run server-side to add new articles.
// To add articles, write the article to post.md, then run node generator.js
if (typeof window !== "undefined") {
  console.error("Error: generator should not be run client-side.");
  process.exit(1);
}

// post.md should have a frontmatter as a normal post, where title and tag
// properties are expected.

const fs = require("fs");
const matter = require("gray-matter");
const moment = require("moment");
const path = require("path");

const srcFile = path.join(process.cwd(), "generator/post.md");
const dstDir = path.join(process.cwd(), "posts");

const srcContent = fs.readFileSync(srcFile, "utf8");
const matterRes = matter(srcContent);
const frontMatter = {
  time: moment().toISOString(true),
  ...matterRes.data
}

const dstFileName = `${matterRes.data.title.toLowerCase().replace(/\W+/g, "-")}.md`;
const dstFile = path.join(dstDir, dstFileName);

const output = `---
title: "${frontMatter.title}"
tag: ${frontMatter.tag}
time: "${frontMatter.time}"
---
${matterRes.content}`;

fs.writeFile(dstFile, output, { flag: "wx" }, (e) => {
  if (e) console.error(`Write file ${dstFileName}: unsuccessful\n${e}`);
  else console.log(`Write file ${dstFileName}: successful`);
});
