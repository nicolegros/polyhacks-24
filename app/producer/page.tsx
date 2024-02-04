'use client';
import {useJsApiLoader} from "@react-google-maps/api";
import {useEffect, useState, useRef} from 'react';
import useGeolocation from '../hooks/geolocation';
import {Producer} from '@/models/producer';
import {useMutation, useQueryClient, UseMutationOptions, InvalidateQueryFilters} from '@tanstack/react-query';
import {Badge, Button, Input, InputGroup, InputRightAddon, Select, useToast} from "@chakra-ui/react";

const postToServer = async (data: Producer): Promise<Producer> => {
    const response = await fetch('/api/farmers', {
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


    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBBQreN_MQQtFOgQToOH3nkqTx7nPLvpPU"
    });
    const toast = useToast()

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
            }
    
            markerRef.current.setPosition({ lat: location.latitude, lng: location.longitude });
    
            map.addListener('click', (event: google.maps.MapMouseEvent) => {
                const latlng = event.latLng
                if (latlng) {
                    geocoder.geocode({ location: event.latLng }, (results, status) => {
                        
                        if (status === 'OK' && results && results[0]) {
                            const lat = latlng.lat();
                            const lng = latlng.lng();
    
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
    }, [isLoaded, location]);
    
    
    const handleFoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFoodInput(event.target.value);
    };


    const handleAddFood = () => {
        if (foodInput) {
            setFoods(prevFoods => [...prevFoods, foodInput]);
            setFormData(prevFormData => ({...prevFormData, product: [...prevFormData.product, foodInput]}));
            setFoodInput('');

        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value}));
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
        setFoods([])
    };
    


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postToServer(formData).then(response => {
            resetForm();
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            })
        })
    };


    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        setFormData(currentFormData => ({
            ...currentFormData,
            types: selectedType ? [selectedType] : []
        }));
    };
    
    

    return (

        <form onSubmit={handleSubmit} >
            <div className="mx-4 mb-8">
                <div className="flex">
                    <Input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange}
                           required variant="filled" className="mr-4 mb-4"/>
                    <Input type="email"
                           name="email"
                           placeholder="Email"
                           value={formData.email}
                           onChange={handleChange}
                           variant="filled"
                           required/>
                </div>
                <Input type="text" name="formattedAddress" placeholder="Address" value={formData.formattedAddress}
                       onChange={handleChange} variant="filled" required className="mb-4"/>
                <Select name="types" value={formData.types[0] || ''} onChange={handleDropdownChange} required
                        variant="filled" className="mb-4">
                    <option value="">Select type</option>
                    <option value="greenhouse">Greenhouse</option>
                    <option value="farm">Farm</option>
                    <option value="market">Market</option>
                </Select>
                <div className="flex">
                    <Input
                        type="text"
                        value={foodInput}
                        onChange={handleFoodChange}
                        variant="filled"
                        placeholder="Enter what you produce here..."
                        className="mb-2 mr-4"
                    />
                    <Button type="button" onClick={handleAddFood}>+</Button>

                </div>
                <div className="mb-4">
                    {foods.map((food, index) => (
                        <Badge key={index} className="mx-2">{food}</Badge>
                    ))}
                </div >
                <button type="submit" className="bg-pine
                                  hover:bg-tangerine
                                  text-white
                                  w-48
                                  rounded-full
                                  p-2">Submit
                </button>

            </div>
            <div ref={mapRef} style={{width: '100%', height: '100%', position: "absolute"}}></div>
        </form>
    );
};

export default Producer;