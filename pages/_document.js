import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render = () => (
    <Html>
      <Head />
      <body className="
        overflow-y-scroll bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100
      ">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
