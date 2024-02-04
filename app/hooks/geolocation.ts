import { useState, useEffect } from 'react';


type LocationState = {
    latitude: number;
    longitude: number;
  };

  const useGeolocation = () => {
    const [location, setLocation] = useState<LocationState>({ latitude:45.508888 , longitude: -73.561668});
  
    useEffect(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            setLocation({
              latitude: coords.latitude,
              longitude: coords.longitude
            });
          }
        );
      }
    }, []);
  
    return location;
  };
  
  export default useGeolocation;