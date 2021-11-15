import "../styles/globals.scss";
import React, { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [dark, setDark] = useState(true);
  const changeMode = () => setDark(dark => !dark);
  useEffect(() => {
    console.log("updated");
    document.body.className = dark ? "dark" : "light";
  }, [dark]);
  return <Component dark={dark} changeMode={changeMode} {...pageProps} />
}