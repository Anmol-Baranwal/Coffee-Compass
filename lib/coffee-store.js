import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_API_KEY,
  //...other fetch options
});

const getUrlForAPIFourSqare = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getImagesOfCoffeeStores = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    // page: 1,
    perPage: 30,
    // color: "green",
    // orientation: "portrait",
  });
  const unsplashResults = photos.response?.results ;  // || []
  
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
  latLong = "43.653833032607096%2C-79.37896808855945",
  limit = 6
) => {
  console.log("hi coffee-store lib dir");

  const photos = await getImagesOfCoffeeStores();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_PLACES_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForAPIFourSqare(latLong, "coffee shop", limit),
    options
  );
  const data = await response.json();
  return data.results.map((result, idx) => {
    const neighborhood = result.location.neighborhood;
    return {
      // ...result,
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      neighbourhood: neighborhood?.length > 0 ? neighborhood[0] : "",
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });
};
