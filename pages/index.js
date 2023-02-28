import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import Banner from "@/components/banner";
import Card from "@/components/card";

import coffeeStoresData from "../data/coffee-stores.json";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  // const data= fetch(coffeeStores)
  console.log("hey");
  return {
    props: {
      coffeeStores: coffeeStoresData, // both key & value
    },
  };
}

export default function Home(props) {
  console.log("props", props);
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
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Coffee Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    // imgURL={coffeeStore.imgURL}
                    href={`/coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
}
