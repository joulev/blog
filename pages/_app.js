import { useState, useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";
import "../styles/styles.css";

export default function App({ Component, pageProps }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
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
  return <Component dark={dark} changeMode={() => setDark(!dark)} {...pageProps} />;
}
