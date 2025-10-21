"use client";

import { useState, useEffect } from "react";
import { setDefaults, fromAddress } from "react-geocode";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GEOCODING_API_KEY,
    language: "en",
    region: "us",
  });

  useEffect(() => {
    async function fetchCoords() {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );
        // check geocode results
        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        console.log("lat lng: ", lat, lng);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCoords();
  }, []);

  return <div>map</div>;
};

export default PropertyMap;
