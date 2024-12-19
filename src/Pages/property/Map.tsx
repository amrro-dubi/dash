import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";



type mapProps = {
  center: {
    lat: number;
    lng: number;
  };
  customHeight?:string
};

const GoogleMapComponent = (props: mapProps) => {
    const mapRef = useRef(null);
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });
  const containerStyle = {
    width: "100%",
    height: props.customHeight|| "580px",
  };

  useEffect(() => {
    if (
      //@ts-ignore
      props?.center?.latitude !== undefined &&
      //@ts-ignore
      props?.center?.longitude !== undefined
    ) {
      //@ts-ignore
      setCenter({ lat: props.center.latitude, lng: props.center.longitude });
    }
  }, [props?.center]);
  useEffect(() => {
    // Clean up Google Map instance when component unmounts or modal closes
    return () => {
      if (mapRef.current && mapRef.current.map) {
        mapRef.current.map = null; // Explicitly destroy the map instance
      }
    };
  }, []);
  return (
    <LoadScript googleMapsApiKey="AIzaSyAU62hceWz3iPyR_5Ado1UtLUV3i_4n6So">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}  onLoad={(map) => {
          mapRef.current = map;
        }}>
      
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;