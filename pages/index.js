import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import Banner from "@/components/banner";
import Card from "@/components/card";

import coffeeStoresData from "../data/coffee-stores.json";
import { fetchCoffeeStores } from "@/lib/coffee-store";

import useTrackLocation from "../hooks/use-track-location";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  // const data= fetch(coffeeStores)

  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores, // both data and value
      // coffeeStores: data.results,
    },
  };
}

export default function Home(props) {
  console.log("props", props);

  // handleTrackLocation();
  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  console.log({ latLong, locationErrorMsg }); // this will print key: value for both , easier syntax

  const [coffeeStores, setCoffeeStores] = useState("");

  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  useEffect(() => {   // this way works otherwise an error is raised: destroy is not a function
    async function setCoffeeStoresByLocation() {
    if (latLong) {
      try {
        const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);
        console.log({ fetchCoffeeStores });
        // set coffee store
        setCoffeeStores(fetchCoffeeStores);
      } catch (error) {
        console.log({ error });
        setCoffeeStoresError(error.message);
      }
    }
  }
    setCoffeeStoresByLocation();
  },[latLong])

  // useEffect(() => {
  //   async function setCoffeeStoresByLocation() {
  //         if (latLong) {
  //           // code
  //       }
  //   }
  //   setCoffeeStoresByLocation();
  //   },[latLong])
    
  const handleOnBannerBtnClick = () => {
    console.log("banner btn clicked");
    handleTrackLocation();
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
          buttonTxt={
            isFindingLocation ? "Loading..." : "View the nearby stores"
          }
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image3.png"
            alt="hero image"
            width={500}
            height={300}
          />
        </div>

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    imgURL={
                      coffeeStore.imgURL ||
                      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </div>
        )}


        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Diamond Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    imgURL={
                      coffeeStore.imgURL ||
                      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
