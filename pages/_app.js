import "../styles/globals.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../components/loading";

export default function App({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => setLoaded(router.isReady), [router])
  const [dark, setDark] = useState(true);
  const changeMode = () => setDark(dark => !dark);
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        storedTheme = "light";
      }
    }
    setDark(storedTheme ? storedTheme === "dark" : true);
  }, []);
  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return <>{
    loaded ? <Component dark={dark} changeMode={changeMode} {...pageProps} />
           : <Loading />
  }</>;
}