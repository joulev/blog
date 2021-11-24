import { useState, useEffect } from "react";
import "../styles/styles.css";

export default function App({ Component, pageProps }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.querySelector("html").classList.toggle("dark");
  }, [dark]);
  return <Component dark={dark} changeMode={() => setDark(!dark)} {...pageProps} />;
}
