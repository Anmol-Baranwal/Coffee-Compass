// import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import { StoreContext } from "../../store/store-context";
import coffeeStoreData from "../../data/coffee-stores.json";
import { fetchCoffeeStores } from "../../lib/coffee-store";

import styles from "../../styles/coffee-store.module.css";

export async function getStaticProps(staticProps) {
  const params = staticProps.params; // we can also destructure params in above parameter directly
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById= coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; // dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {}
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    // paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    paths,
    fallback: true,
  };
}

const coffeeStore = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading State</div>;
  }

  const { address, name, neighborhood, imgURL } = props.coffeeStore;

  const handleUpvoteButton = () => {
    console.log("what");
  };

  // <div>Coffee Page nested routing {router.query.id}</div>
  // <Link href="/coffee-store/dynamic">
  // <>Go to dynamic page</>
  // </Link>{" "}
  // it doesnt refresh the page like anchor tag
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <> ← Go to Home</>   {/* ◀ */}
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              coffeeStore.imgURL ||
              "https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          ></Image>
        </div>
        <div className={cls("glass", styles.col2)}>
          {address && (     /* only display when adress is not empty */
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/places.svg" width="24" height="24" />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/near.svg" width="24" height="24" />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default coffeeStore;
