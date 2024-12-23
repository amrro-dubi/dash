import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useCallback, useEffect, useRef, useMemo } from "react"

type Map = google.maps.Map

const GoogleMapComponent = () => {
    const mapRef = useRef<Map | null>(null)

    const onLoad = useCallback((map: Map) => {
        mapRef.current = map
    }, [])

    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        // @ts-expect-error type error in import.meta.env
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY || "",
        libraries: ["places"],
    })

    const center = useMemo(() => ({ lat: -3.745, lng: -38.523 }), [])
    const containerStyle = useMemo(() => ({ width: "100%", height: "580px" }), [])

    useEffect(() => {
        // Clean up Google Map instance when component unmounts
        return () => {
            if (mapRef.current) {
                mapRef.current = null
            }
        }
    }, [])

    if (loadError) {
        return <p>Error loading Google Maps</p>
    }

    return isLoaded ? (
        <div className="w-full h-full col-span-full">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad}>
                <Marker position={center} />
            </GoogleMap>
        </div>
    ) : (
        <p>Loading...</p>
    )
}

export default GoogleMapComponent
