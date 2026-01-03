import { getURL } from "./tools";
import { useEffect, useState } from "react";

export default function Result({zipcode}){
    // states
    const [location, setLocation] = useState(null); // stores needed API response data
    const [valid, setValid] = useState(true); // stores validity of user input
    const [showMore, setShowMore] = useState(false); // stores state of the "show more" button

    // API calling
    useEffect(() => { 
        // method to call API, store response data, and validate user input
        const callAPI = async() => { 
            try{
                const url = getURL(zipcode);
                const response = await fetch(url);
                const data = await response.json();
                const places = data['places'] ? data['places'] : []; // if zipcode is valid, store data
                if(!places.length){ 
                    setValid(false); // update validity
                }
                else{
                    const place = places[0] // get zipcode data object from 'places' array in API
                    setLocation({
                        city: place['place name'],
                        stateab: place['state abbreviation'],
                        long: place['longitude'],
                        lat: place['latitude'],
                        state: place['state']
                    }); // update data
                    setValid(true); // update validity 
                }
                setShowMore(false);
            } 
            catch(err){
                // in case of error reset state
                setLocation([]); 
                setValid(false);    
            }   
        }
        // call API only after user input
        if(zipcode !== "init"){
            callAPI();
        }
        // on initial render: no return
        else{
            return;
        }
    }, [zipcode]); 

    // click handler for show more/less buttons
    function handleClick(){
        setShowMore(!showMore);
    }

    if(location === null){
        return
    }

    if(valid){
        return(
            <>
                <h1>Your zipcode ({zipcode}) is in {location.city}, {showMore? location.state : location.stateab}</h1>
                {showMore && (
                    <>
                        <h1>Longitude: {location.long}</h1>
                        <h1>Latitude: {location.lat}</h1>
                        <button onClick={handleClick}>Show Less</button>
                    </>
                )}
                {!showMore && <button onClick={handleClick}>Show More</button>}
                
            </>
        );
    }
    
    // when zipcode is invalid, display error message
    else{ 
        return <h1>Invalid zipcode.</h1>
    }  
}