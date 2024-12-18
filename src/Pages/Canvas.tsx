import  { useState, useEffect } from 'react';

interface Location {
  lat: number | null;
  lng: number | null;
}

function LocationTracker() {
  const [location, setLocation] = useState<Location>({ lat: null, lng: null });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err: GeolocationPositionError) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Latitude: {location.lat}, Longitude: {location.lng}</p>
      )}
    </div>
  );
}

export default LocationTracker;
