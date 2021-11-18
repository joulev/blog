import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className={ this.props.dark ? "dark" : "light" } bgcolor="#222">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
