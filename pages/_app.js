import { useState, useEffect } from "react";
import "../styles/styles.css";

export default function App({ Component, pageProps }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (dark) document.querySelector("html").classList.add("dark");
    else document.querySelector("html").classList.remove("dark");
  }, [dark]);
  return <Component dark={dark} changeMode={() => setDark(!dark)} {...pageProps} />;
}
