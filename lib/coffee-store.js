const getUrlForAPIFourSqare = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};
// 
export const fetchCoffeeStores = async () => {
  console.log("hi coffee-store lib dir");
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_PLACES_API_KEY,
    },
  };
  
  const response = await fetch(getUrlForAPIFourSqare(
    "43.653833032607096%2C-79.37896808855945", "coffee", "6"
  ), options);
  const data = await response.json();
  return data.results;
  // console.log(data.results);
  // .then((response) => response.json())
  // .then((response) => console.log(response))
  // .catch((err) => console.error(err));
};
