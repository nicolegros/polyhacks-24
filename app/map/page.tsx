'use client';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Market } from '@/models/market';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Switch, Icon } from '@chakra-ui/react'
import { CiMap, CiViewTable } from 'react-icons/ci';
import { GoTable } from 'react-icons/go';



type LocationState = {
  latitude: number;
  longitude: number;
};

const containerStyle = {
  width: '100%',
  height: '100%'
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


  const { data: mensenData } = useQuery({
    queryKey: ['mensenData', location],
    queryFn: () => fetchFromServer(location!.latitude, location!.longitude),
    enabled: !!location
  });

  return (
    <div className="flex h-full flex-col items-start justify-start p-8 pt-4">
      <span className="pb-4">
        <Icon as={CiMap} boxSize="2em" />
        <Switch onChange={() => setShowTable(!showTable)} size="lg" />
        <Icon as={CiViewTable} boxSize="2em" />
      </span>
      {showTable ? (
        <div className="flex justify-center align-middle w-full">
          <TableContainer className="bg-white w-full">
            <Table variant="striped" size="sm" overflowY="scroll" whiteSpace="wrap">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Address</Th>
                  <Th>Distance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mensenData?.places.map((market: Market, index: number) => {
                  const name = market.displayName.text;
                  return (
                  <Tr key={index}>
                    <Td>{name}</Td>
                    <Td>{market.formattedAddress}</Td>
                    <Td>{market.distance} km</Td>
                  </Tr>
                )

                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location ? { lat: location.latitude, lng: location.longitude } : { lat: 0, lng: 0 }}
            zoom={13}
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
  );
}
