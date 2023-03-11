import { fetchCoffeeStores } from "@/lib/coffee-store";

const getCoffeeStoresByLocation = async (req, res) => {
    
    // configure latlong & limit
    try{
        const {latLong, limit} = req.query;
        const response = await fetchCoffeeStores(latLong, limit);
        res.status(200);
        res.json(response);

    } catch(err) {
        console.error('An error occured', err);
        res.status(500);
        res.json({message: "Oh! Something unexpected happened", err});
    }
    

}

export default getCoffeeStoresByLocation;