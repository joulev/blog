import moment from "moment";
import { execSync } from "child_process";

/**
 * Get current information. If this is run during build time, the function will
 * return the build information, so it is intended to be used inside
 * getStaticProps() only.
 * @returns Object of current information
 */
export function getBuildInfo() {
  if (typeof window !== undefined) console.log("Don't run this on client side");
  return {
    time: moment().format("HH:mm:ss D/MM/YY (ZZ)"),
    hash: execSync("git rev-parse --short HEAD").toString().trim()
  }
}
