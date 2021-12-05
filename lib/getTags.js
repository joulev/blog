import fs from "fs";
import matter from "gray-matter";
import path from "path";
import tagDescriptions from "../data/tagDescriptions";
import { listPosts } from "./getPosts";

const postDir = path.join(process.cwd(), "posts");

/**
 * Get all tags used
 * @returns An array of all tags used so far. There are no repetitions, but
 * the tags are not sorted
 */
export function getTags() {
  var tags = new Set();
  fs.readdirSync(postDir).forEach(file => {
    const filePath = path.join(postDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const matterRes = matter(fileContent);
    matterRes.data.tag.split(" ").forEach(tag => tags.add(tag));
  });
  return [...tags];
}

export function getTagCount() {
  var tags = getTags().reduce((prev, tag) => ({ ...prev, [tag]: 0 }), {});
  fs.readdirSync(postDir).forEach(file => {
    const filePath = path.join(postDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const matterRes = matter(fileContent);
    matterRes.data.tag.split(" ").forEach(tag => tags[tag]++);
  });
  return tags;
}

/**
 * Get all information about a tag
 * @param {string} tag The name of the tag
 * @returns An object containing the tag name, the tag description, and an array
 * of all articles with that tags with their respective metadata
 */
export function getTagInformation(tag) {
  const postList = listPosts().filter(post => post.tag.split(" ").indexOf(tag) != -1);
  return {
    tag,
    description: tagDescriptions[tag],
    postList
  };
}
