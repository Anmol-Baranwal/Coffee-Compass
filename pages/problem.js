function Problem() {
    return (
      <div>
        <h1>
          You need to configure your environment variables, check the Readme:
        </h1>
        <p>
          process.env.NEXT_PUBLIC_FOURSQUARE_PLACES_API_KEY,
          process.env.AIRTABLE_WEB_API_KEY, AIRTABLE_BASE_KEY,
          process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_API_KEY
        </p>
      </div>
    );
  }
  
  export default Problem;