import fs from "fs";
import matter from "gray-matter";
import moment from "moment";
import path from "path";
import { removeMarkdown } from "./utils";

const postDir = path.join(process.cwd(), "posts");

/**
 * @description List all posts inside /posts directory
 * 
 * @returns An array listing all posts
 * 
 * @example
 * [
 *   {
 *     name: "name",
 *     plain: "plain content"
 *     title: "title",
 *     tag: "a space-separated list of tags",
 *     time: "timestamp"
 *   },
 *   ...
 * ]
 */
export function listPosts() {
  const nameList = fs.readdirSync(postDir).map(rawName => {
    const name = rawName.replace(/\.md$/, "");
    const filePath = path.join(postDir, rawName);
    const content = fs.readFileSync(filePath, "utf8");
    const matterRes = matter(content);
    const plainContent = removeMarkdown(matterRes.content);
    return {
      name,
      plain: plainContent,
      ...matterRes.data
    };
  }).sort((a, b) => moment(b.time).unix() - moment(a.time).unix());
  return nameList;
}

/**
 * Fetch the content of a file
 * 
 * @param {string} fileName The filename
 * @returns An object for the file
 * 
 * @example
 * {
 *   content: "md content",
 *   title: "title",
 *   tag: "tag",
 *   time: "time"
 * }
 */
export function getPostContent(fileName) {
  const filePath = path.join(postDir, `${fileName}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const matterRes = matter(fileContent);
  return {
    content: matterRes.content,
    data: matterRes.data
  };
}
