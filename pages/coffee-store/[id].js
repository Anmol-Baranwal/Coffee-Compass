// import React from "react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import { StoreContext } from "../../store/store-context";
import coffeeStoreData from "../../data/coffee-stores.json";
import { fetchCoffeeStores } from "../../lib/coffee-store";
import { isEmpty } from "@/utils";
import useSWR from "swr";

import styles from "../../styles/coffee-store.module.css";

export async function getStaticProps(staticProps) {
  const params = staticProps.params; // we can also destructure params in above parameter directly
  const coffeeStores = await fetchCoffeeStores();
  const coffeeStoreFromContext= coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; // dynamic id
  });
  return {
    props: {
      coffeeStore: coffeeStoreFromContext ? coffeeStoreFromContext : {}
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

const coffeeStore = (initialProps) => {
  const router = useRouter();

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore || {}
  );;

  if (router.isFallback) {
    return <div>Loading State</div>;
  }

  const { address, name, neighborhood, imgURL } = coffeeStore;

  const [votingCount, setVotingCount] = useState(1);  // we need to use previous value from airtable

  const fetcher = (url) => fetch(url).then((res) => res.json());    // we can include this in util accordingly
  const { data, err, isLoading } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      console.log("data from SWR", data);
      setCoffeeStore(data[0]);
      setVotingCount(data[0].voting);
    }
  },[data]);

  const handleUpvoteButton = async () => {
    console.log("upvote handling happens here");

    try {
      const response = await fetch("/api/favouriteCoffeeStore", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const dbCoffeeStore = await response.json();
      console.log({ 'airtable db': dbCoffeeStore });

      if(dbCoffeeStore && dbCoffeeStore.length > 0){
        let count= votingCount + 1;
        setVotingCount(count);
      }

    } catch (err) {
      console.error("Error in upvoting coffee store", err);
    }
  };

  if (err) {
    return <div>Something went wrong retrieving coffee store page</div>;
  }

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const { id, name, voting, imgURL, neighbourhood, address } = coffeeStore;
      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          voting: 0,
          imgURL,
          neighbourhood: neighbourhood || "",
          address: address || "",
        }),
      });

      const dbCoffeeStore = await response.json();
      console.log({ 'airtable db': dbCoffeeStore });
    } catch (err) {
      console.error("Error in creating coffee store", err);
    }
  };

  useEffect(() => {
    if(isEmpty(initialProps.coffeeStore)) { 
      if (coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id; //dynamic id
        });

        if(coffeeStoreFromContext){
          setCoffeeStore(coffeeStoreFromContext);
          handleCreateCoffeeStore(coffeeStoreFromContext);
        }
        else {
          // static generated route stores
          handleCreateCoffeeStore(initialProps.coffeeStore);
        }
      }
    }
  }, [id, initialProps, initialProps.coffeeStore]);

  // <div>Coffee Page nested routing {router.query.id}</div>
  // <Link href="/coffee-store/dynamic">
  // <>Go to dynamic page</>
  // </Link>{" "}
  // it doesnt refresh the page like anchor tag
  return (
    <div className={styles.layout}>
      <Head>
      <title>{name}</title>
        <meta name="description" content={`${name} coffee store`} />
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
            <p className={styles.text}>{votingCount}</p>
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
