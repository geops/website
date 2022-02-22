import Document, { Html, Head, Main, NextScript } from "next/document";

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"]
}

class WebsiteDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Import Lato font family from Typekit because open source version is missing font weights. */}
          <link href="https://use.typekit.net/not7ezq.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default WebsiteDocument;
