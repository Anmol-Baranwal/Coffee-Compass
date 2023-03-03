import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_API_KEY,
  //...other fetch options
});

const getUrlForAPIFourSqare = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getImagesOfCoffeeStores = async () => {
    const photos = await unsplashApi.search.getPhotos({
      query: "coffee store",
      page: 1,
      perPage: 10,
      // color: "green",
      // orientation: "portrait",
    });
    const unsplashResults = photos.response.results;

    return unsplashResults.map((result) => result.urls["small"]);
}

export const fetchCoffeeStores = async () => {
  console.log("hi coffee-store lib dir");
  
  const photos = await getImagesOfCoffeeStores(); 
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_PLACES_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForAPIFourSqare(
      "43.653833032607096%2C-79.37896808855945",
      "coffee",
      "6"
    ),
    options
  );
  const data = await response.json();
  return data.results.map(result => {
    return {
        ...result,
        imgURL: photos[0],
    };
  });
  // console.log(data.results);
  // .then((response) => response.json())
  // .then((response) => console.log(response))
  // .catch((err) => console.error(err));
};
