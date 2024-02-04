'use client';
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState, useRef } from 'react';
import useGeolocation from '../hooks/geolocation';
import { Producer } from '../../models/producer';
import { useMutation, useQueryClient, UseMutationOptions, InvalidateQueryFilters } from '@tanstack/react-query';

const postToServer = async (data:Producer):Promise<Producer> => {
    const response = await fetch('/api/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
};

const usePostToServerMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation<unknown, Error, Producer, unknown>((newProducer: Producer) => postToServer(newProducer), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: 'producers' } as InvalidateQueryFilters);
      },
      onError: (error: Error) => {
        console.error('Error posting data:', error);
      },
    } as UseMutationOptions<unknown, Error, Producer, unknown>);
};


const Producer = () => {
    const location = useGeolocation();

    const [foods, setFoods] = useState<string[]>([]); 
    
    const [foodInput, setFoodInput] = useState('');
    const [formData, setFormData] = useState<Producer>({
        name: '',
        email: '',
        formattedAddress: '',
        types: [],
        product: [],
        location: {
            lat: 0,
            lng: 0,
        },
        displayName: {
            text: '',
            languageCode: 'en',
        },
    });
    const mapRef = useRef(null);
    const geocoderRef = useRef<google.maps.Geocoder | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);
    formData.location= { lat:location.latitude, lng:location.longitude };


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBBQreN_MQQtFOgQToOH3nkqTx7nPLvpPU"
    });

   useEffect(() => {
    if (isLoaded && mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
            center: { lat: location.latitude, lng: location.longitude },
            zoom: 11,
        });

        const geocoder = new google.maps.Geocoder();
        geocoderRef.current = geocoder;
        
        if (!markerRef.current) {
            markerRef.current = new google.maps.Marker({
                position: { lat: location.latitude, lng: location.longitude },
                map: map,
            });
        } else {
            markerRef.current.setPosition({ lat: location.latitude, lng: location.longitude });
            markerRef.current.setMap(map);
        }

        map.addListener('click', (event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
                geocoder.geocode({ location: event.latLng }, (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                        const lat = event.latLng.lat();
                        const lng = event.latLng.lng();
        
                        setFormData(currentFormData => ({
                            ...currentFormData,
                            formattedAddress: results[0].formatted_address,
                            location: { lat, lng }
                        }));

                        if (markerRef.current) {
                            markerRef.current.setPosition(event.latLng);
                        }
                    }
                });
            }
        });
    }
}, [isLoaded, location.latitude, location.longitude]);
    
    
    const handleFoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFoodInput(event.target.value);
    };
    

    const handleAddFood = () => {
        if (foodInput) { 
            setFoods(prevFoods => [...prevFoods, foodInput]);
            setFormData(prevFormData => ({ ...prevFormData, product: [...prevFormData.product, foodInput] }));
            setFoodInput(''); 

        }
    };
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));

    };

    const resetForm = () => {
        setFormData({
            types: [],
            product: [],
            location: {
                lat: 0,  
                lng: 0, 
            },
            formattedAddress: '',
            email: '',
            name: '',
            displayName: {
                text: '',
                languageCode: '', 
            },
        });
    };
    


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitting', formData);
        resetForm();
    };


    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        setFormData(currentFormData => ({
            ...currentFormData,
            types: selectedType ? [selectedType] : []
        }));
    };
    
    

    return (
        <form onSubmit={handleSubmit}>
            <h1>Tell us more about you!</h1>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required

                />
            </label>
            <br />
            <label>
                Address:
                <input type="text" name="formattedAddress" value={formData.formattedAddress} onChange={handleChange}required />
            </label>
            <label>
                Type:
                <select name="types" value={formData.types[0] || ''} onChange={handleDropdownChange}required>
                    <option value="">Select type</option>
                    <option value="greenhouse">Greenhouse</option>
                    <option value="farm">Farm</option>
                    <option value="market">Market</option>
                </select>

            </label>
            <br />
            <input
                type="text" 
                value={foodInput} 
                onChange={handleFoodChange} 
                placeholder="Enter what you produce here..."
            />
            <button type="button" onClick={handleAddFood}>Add it</button>
            <ul>
                {foods.map((food, index) => (
                    <li key={index}>{food}</li>
                ))}
            </ul>
            <button type="submit">Submit</button>
            <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
        </form>
    );
};

export default Producer;