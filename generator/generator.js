// This should only be run server-side to add new articles.
// To add articles, write the article to post.md, then run node generator.js
if (typeof window !== "undefined") {
  console.error("Error: generator should not be run client-side.");
  process.exit(1);
}

const fs = require("fs");
const matter = require("gray-matter");
const moment = require("moment");
const path = require("path");

const srcFile = path.join(process.cwd(), "generator/post.md");
const dstDir = path.join(process.cwd(), "posts");

const srcContent = fs.readFileSync(srcFile, "utf8");
const matterRes = matter(srcContent);
const frontMatter = {
  date: moment().format("DD/MM/YYYY"),
  ...matterRes.data
}

const dstFileName = `${matterRes.data.title.toLowerCase().replace(/\W/g, "-")}.md`;
const dstFile = path.join(dstDir, dstFileName);

let output = `---
title: "${frontMatter.title}"
tag: ${frontMatter.tag}
time: ${frontMatter.date}
---
${matterRes.content}`;

fs.writeFile(dstFile, output, { flag: "wx" }, (e) => {
  if (e) console.error(`Write file ${dstFileName}: unsuccessful\n${e}`);
  else console.log(`Write file ${dstFileName}: successful`);
});
