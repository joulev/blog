import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark"
import html from "remark-html"

const postDir = path.join(process.cwd(), "posts");

/**
 * List all posts inside /posts directory
 * 
 * The output is something like this
 * [
 *   {
 *     name: "name",
 *     title: "title",
 *     tag: "a space-separated list of tags",
 *     time: "timestamp"
 *   },
 *   ...
 * ]
 * @returns An array listing all posts
 */
export function listPosts() {
  const nameList = fs.readdirSync(postDir).map(rawName => {
    const name = rawName.replace(/\.md$/, "");
    const filePath = path.join(postDir, rawName);
    const content = fs.readFileSync(filePath, "utf8");
    const frontMatter = matter(content).data;
    return { name, ...frontMatter };
  });
  return nameList;
}

/**
 * Fetch the content of a file
 * 
 * Output should look like this
 * {
 *   content: <file content>
 *   title: <title>
 *   tag: <tag>
 *   time: <time>
 * }
 * @param {string} id The number id of the md file
 * @param {string} fileName The filename
 * @returns An object for the file
 */
export async function getPostContent(fileName) {
  const filePath = path.join(postDir, `${fileName}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const matterRes = matter(fileContent);
  const content = await remark().use(html).process(matterRes.content);
  return {
    content: content.toString(),
    data: matterRes.data
  };
}
