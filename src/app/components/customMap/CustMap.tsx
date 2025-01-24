"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import Image from "next/image";
import Link from "next/link";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function CustMap({
  activeCenter,
  activeMarkerPosition,
  AllMarkersPosition,
  hasAllMarkers,
  setAllValues,
  name,
}: any) {
  const { servData } = useContext(AxiosForSharingStatesAxiosContext);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA6DmkyAFw9yTF8KMQRJj8YtoazR14tE3I",
  });

  const [defaultCenter, setDefaultCenter] = useState({
    lat: 41.7151,
    lng: 44.8271,
  });

  const [markerPosition, setMarkerPosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedMarkerIdEachData, setSelectedMarkerIdEachData] =
    useState(null);
  const [selectedMarkerIdEachLocation, setSelectedMarkerIdEachLocation] =
    useState(null);

  useEffect(() => {
    if (activeCenter) {
      setDefaultCenter(activeCenter);
    }
  }, [activeCenter]);

  useEffect(() => {
    if (activeMarkerPosition) {
      setMarkerPosition(activeMarkerPosition);
    }
  }, [activeMarkerPosition]);

  useEffect(() => {
    if (setAllValues && markerPosition !== undefined) {
      setAllValues((prev: any) => ({ ...prev, [name]: markerPosition }));
    }
  }, [markerPosition]);

  const handleMapClick = (e) => {
    if (!AllMarkersPosition) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarkerPosition({ lat, lng });
    }
  };

  const handleMarkerClick = () => {
    setSelectedMarker(markerPosition);
  };

  const handleAllMarkerClick = (position, id) => {
    setSelectedMarker(position);
    const markerData = servData.find((data) => data.id === id);
    if (markerData) {
      const locationData = JSON.parse(markerData.location);
      const matchedLocation = locationData.find(
        (loc) =>
          loc.latlng.lat === position.lat && loc.latlng.lng === position.lng
      );
      setSelectedMarkerIdEachLocation(matchedLocation);
    }
    setSelectedMarkerIdEachData(servData.find((data) => data.id === id));
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={10}
      onClick={handleMapClick}
    >
      {markerPosition && (
        <Marker position={markerPosition} onClick={handleMarkerClick} />
      )}
      {hasAllMarkers &&
        AllMarkersPosition?.map((marker) => {
          const { id, latlng } = marker;
          return (
            <Marker
              key={id}
              position={latlng}
              onClick={() => handleAllMarkerClick(latlng, id)}
            />
          );
        })}
      {hasAllMarkers && selectedMarker && (
        <InfoWindow
          position={selectedMarker}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <Link
            href={`/services/${selectedMarkerIdEachData?.id}`}
            className="rounded-[10px] overflow-hidden "
          >
            {selectedMarkerIdEachData?.servcenters_imgs[0].url && (
              <div className="relative w-[230px] max-tiny:w-full h-[120px] bg-gray-200 rounded-t-[10px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${selectedMarkerIdEachData?.servcenters_imgs[0].url}`}
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <div className="bg-[#161B2C] text-white px-[20px] py-[15px] flex flex-col gap-y-[5px] rounded-b-[10px] overflow-hidden">
              <h1 className="text-[18px]">
                {selectedMarkerIdEachData?.servcenterName}
              </h1>
              <p className="text-[12px] text-[#D4D4D4]">
                {selectedMarkerIdEachLocation?.city},{" "}
                {selectedMarkerIdEachLocation?.adress}
              </p>
            </div>
          </Link>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}
