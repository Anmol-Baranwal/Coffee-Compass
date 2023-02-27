import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/Poppins-Medium.ttf"
          as="font"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="preload"
          href="/fonts/Poppins-Regular.ttf"
          as="font"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="preload"
          href="/fonts/Poppins-SemiBold.ttf"
          as="font"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="preload"
          href="/fonts/Poppins-Light.ttf"
          as="font"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="preload"
          href="/fonts/Poppins-ExtraBold.ttf"
          as="font"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <body>
        <Main></Main>
        <NextScript />
      </body>
    </Html>
  );
}
