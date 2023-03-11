import { useContext, useState } from "react"

import {ACTION_TYPES, StoreContext} from "../store/store-context"

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState("");

    // const [latLong, setLatLong] = useState("");

    const [isFindingLocation, setFindingLocation] = useState(false);

    const {dispatch} = useContext(StoreContext);

    const success = (position) => {
        const latitude= position.coords.latitude;
        const longitude= position.coords.longitude;

        // setLatLong(`${latitude}, ${longitude}`)
        dispatch({
            type: ACTION_TYPES.SET_LAT_LONG,
            payload: {latLong: `${latitude},${longitude}`}
        });
        setLocationErrorMsg("");
        setFindingLocation(false);
    }

    const error = () => {
        setLocationErrorMsg("Unable to get your location");
        setFindingLocation(false);
    }

    const handleTrackLocation = () => {
        setFindingLocation(true);
        if(!navigator.geolocation){
            setLocationErrorMsg("Geolocation isn't supported by your browser");
            setFindingLocation(false);
        } else {
            // status.textContent = "Locating...";
            navigator.geolocation.getCurrentPosition(success, error);   
        }
    };

    return {
        // latLong,
        handleTrackLocation,
        locationErrorMsg,
        isFindingLocation,
    };
};

export default useTrackLocation;