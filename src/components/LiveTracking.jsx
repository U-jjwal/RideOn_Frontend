import React, { useState, useEffect } from 'react'
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 23.2576987,
    lng: 77.5017428
};

const LiveTracking = () => {
    const [ currentPosition, setCurrentPosition ] = useState(center);
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    if (!isLoaded) {
        return <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">Loading Map...</div>
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={15}
        >
            <Marker position={currentPosition} />
        </GoogleMap>
    )
}

export default LiveTracking