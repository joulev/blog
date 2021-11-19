import "../styles/globals.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", setLoaded(false));
    router.events.on("routeChangeComplete", setLoaded(true));
  }, [router])
  const [dark, setDark] = useState(true);
  const changeMode = () => setDark(dark => !dark);
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDark(storedTheme ? storedTheme === "dark" : true);
  }, []);
  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return <>{
    loaded ? <Component dark={dark} changeMode={changeMode} {...pageProps} />
           : <div style={{ fontSize: "100px" }}>Loading</div>
  }</>;
}