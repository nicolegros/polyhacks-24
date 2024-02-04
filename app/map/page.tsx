'use client';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Market } from '@/models/market';
import { useNavigate,BrowserRouter } from 'react-router-dom';
import {Table, Thead,Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'
//import { MarkerClusterer } from "@react-google-maps/marker-clusterer";



type LocationState = {
  latitude: number;
  longitude: number;
};

const containerStyle = {
  width: '100%',
  height: '400px'
};

const queryClient = new QueryClient()

export default function MapWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <Map />
    </QueryClientProvider>
  );
}
  
  function Map() {
    const [showTable, setShowTable] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<Market | null>(null);
    const [location, setLocation] = useState<LocationState | null>(null);
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: 'AIzaSyBBQreN_MQQtFOgQToOH3nkqTx7nPLvpPU'
    });
  
    useEffect(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const { latitude, longitude } = coords;
            setLocation({ latitude, longitude });
          },
          (err) => {
            console.error('Error obtaining location:', err);
          }
        );
      }
    }, []);
  

    const fetchFromServer = async (latitude: number, longitude: number) => {
      const response = await fetch(`/api?latitude=${latitude}&longitude=${longitude}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      data.places.sort((a: { distance: number }, b: { distance: number }) => a.distance - b.distance);

      return data;
    };

  
    const { isLoading, error, data: mensenData } = useQuery({
      queryKey: ['mensenData', location], 
      queryFn: () => fetchFromServer(location!.latitude, location!.longitude), 
      enabled: !!location
    });
    
      return (
        <QueryClientProvider client={queryClient}>
          <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Nearby Market</h1>
            <p>Find local producer near you!</p>
            <button onClick={() => setShowTable(!showTable)}>
              {showTable ? 'Show Map' : 'Show Table'}
            </button>
            {showTable ? (
        <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>distance</Th>

            </Tr>
          </Thead>
          <Tbody>
            {mensenData?.places.map((market:Market, index:Number) => (
              <Tr key={index}>
                <Td>{market.displayName.text}</Td>
                <Td>{market.formattedAddress}</Td>
                <Td>{market.distance} km</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
            ) : (
              isLoaded && (
                <GoogleMap
                mapContainerStyle={containerStyle}
                center={location ? { lat: location.latitude, lng: location.longitude } : { lat: 0, lng: 0 }}
                zoom={11}
              >
                {mensenData?.places.map((market: Market, index: number) => (
                  <Marker
                    key={index}
                    position={market.location}
                    label={market.displayName.text}
                    onClick={() => setSelectedPlace(market)} 
                  />
                ))}
            
                {selectedPlace && (
                  <InfoWindow
                    position={{
                      lat: selectedPlace.location.lat,
                      lng: selectedPlace.location.lng
                    }}
                    onCloseClick={() => setSelectedPlace(null)}
                  >
                    <div>
                       <h2>{selectedPlace.displayName.text}</h2>
                      <p>{selectedPlace.formattedAddress}</p>
                      {/*  */}
                       <Link href={`/market/${selectedPlace.displayName.text}`} passHref>
                      <a>More Info</a> {/* */}
                     </Link>
                  </div>
                  </InfoWindow>
                )}
              </GoogleMap>
              )
            )}
          </div>
        </QueryClientProvider>
      );
}
