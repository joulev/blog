import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import smoothscroll from "smoothscroll-polyfill";
import Loading from "../components/loading";
import "../styles/styles.css";

export default function App({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => setLoaded(router.isReady), [router]);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        storedTheme = "light";
      }
    }
    setDark(storedTheme ? storedTheme === "dark" : true);
    smoothscroll.polyfill();
  }, []);
  useEffect(() => {
    if (dark) document.querySelector("html").classList.add("dark");
    else document.querySelector("html").classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return loaded ? <Component dark={dark} changeMode={() => setDark(!dark)} {...pageProps} /> : <Loading />;
}
