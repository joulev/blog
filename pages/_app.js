import "../styles/globals.scss";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [dark, setDark] = useState(false);
  const changeMode = () => setDark(dark => !dark);
  return <Component {...pageProps} dark={dark} changeMode={changeMode} />;
}
