import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import Banner from "@/components/banner";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log("banner btn clicked");
  };

  return (
    <>
      <Head>
        <title>Coffee Project</title>
        <meta name="description" content="for finding nearby coffee stores" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/github.svg" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonTxt="View the stores list"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image3.png" width={500} height={300} />
        </div>
      </main>
    </>
  );
}
