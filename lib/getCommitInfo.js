import { execSync } from "child_process";

/**
 * Get current information. If this is run during build time, the function will
 * return the build information, so it is intended to be used inside
 * getStaticProps() only.
 * @returns Object of current information
 */
export default function getCommitInfo() {
  return {
    time: execSync("git log -1 --pretty=format:%cI").toString(),
    hash: execSync("git rev-parse --short HEAD").toString().trim()
  };
}
