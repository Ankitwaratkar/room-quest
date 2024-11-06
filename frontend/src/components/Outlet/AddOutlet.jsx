import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker issue in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const AddOutlet = () => {
    const { currentUser, userType } = useAuth();
    const [formData, setFormData] = useState({
        outletName: '',
        location: '',
        phone: '',
        email: '',
        openingHours: '',
        description: '',
        image: null,
    });

    const [coordinates, setCoordinates] = useState({ lat: 28.6139, lng: 77.2090 });
    const [markerPosition, setMarkerPosition] = useState(coordinates);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData(prev => ({
                ...prev,
                image: files[0],
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update location with current marker position before submission
        const updatedLocation = `${markerPosition.lat}, ${markerPosition.lng}`;
        const updatedFormData = { ...formData, location: updatedLocation };

        if (userType === 'Residency Owner' || userType === 'Multi-Mess Manager') {
            const outletType = userType === 'Residency Owner' ? 'Residence' : 'Mess';
            await submitOutlet(outletType, updatedFormData);
        } else {
            alert('Only Residency Owners or Multi Mess Managers can add outlets.');
        }
    };

    const submitOutlet = async (outletType, formData) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('outletName', formData.outletName);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('openingHours', formData.openingHours);
            formDataToSend.append('description', formData.description);

            // Convert coordinates to numbers before appending
            const lat = parseFloat(markerPosition.lat); // Ensure lat is a number
            const lng = parseFloat(markerPosition.lng); // Ensure lng is a number

            // Check if lat and lng are valid numbers
            if (isNaN(lat) || isNaN(lng)) {
                console.error("Invalid coordinates:", { lat, lng });
                alert("Invalid coordinates provided.");
                return;
            }

            // Debugging: Log coordinates before appending
            console.log('Submitting with coordinates:', { lat, lng });

            // Append coordinates as numbers
            formDataToSend.append('coordinates[lat]', lat);
            formDataToSend.append('coordinates[lng]', lng);

            formDataToSend.append('outletType', outletType);
            formDataToSend.append('userType', userType);

            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            // Debugging: Log formDataToSend before sending
            for (let [key, value] of formDataToSend.entries()) {
                console.log(key, value);
            }

            // Determine the API endpoint based on userType
            const apiEndpoint = userType === 'Residency Owner'
                ? 'http://localhost:5000/api/v1/residence/add-outlet'
                : 'http://localhost:5000/api/v1/mess/add-mess';

            // Send the request to the selected endpoint
            const response = await axios.post(apiEndpoint, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Outlet added:', response.data);
            alert('Outlet successfully added!');

            // Reset form data
            setFormData({
                outletName: '',
                location: '',
                phone: '',
                email: '',
                openingHours: '',
                description: '',
                image: null,
            });
            setMarkerPosition(coordinates);
        } catch (error) {
            console.error('Error adding outlet:', error.response ? error.response.data : error);
            alert('Failed to add outlet. Please try again.');
        }
    };


    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setMarkerPosition(e.latlng);
            },
        });
        return null;
    };

    if (userType !== 'Residency Owner' && userType !== 'Multi-Mess Manager') {
        return <div className="text-center text-red-500 font-bold">You do not have permission to add an outlet.</div>;
    }

    return (
        <div className="bg-misty-rose min-h-screen flex justify-center items-center py-10 px-36">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-7xl flex flex-col"
            >
                <h2 className="text-eggplant font-bold text-2xl mb-6 text-center">Add New Outlet</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-jet font-semibold mb-1">Outlet Name:</label>
                        <input
                            type="text"
                            name="outletName"
                            value={formData.outletName}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-thulian-pink rounded-lg bg-orchid-pink focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="text-jet font-semibold mb-1">Phone Number:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-thulian-pink rounded-lg bg-orchid-pink focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="text-jet font-semibold mb-1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-thulian-pink rounded-lg bg-orchid-pink focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="text-jet font-semibold mb-1">Opening Hours:</label>
                        <input
                            type="text"
                            name="openingHours"
                            value={formData.openingHours}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-thulian-pink rounded-lg bg-orchid-pink focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-200"
                        />
                    </div>
                </div>

                <label className="text-jet font-semibold mb-1">Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mb-6 border border-thulian-pink rounded-lg bg-orchid-pink focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-200"
                    rows={4}
                />

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="text-jet font-semibold mb-1">Upload Image:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                        className="w-full p-3 border border-thulian-pink rounded-lg bg-orchid-pink focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-200"
                    />
                </div>

                <div className="flex items-center mb-4">
                    <label className="text-jet font-semibold mr-2">Location (Coordinates):</label>
                    <input
                        type="text"
                        name="location"
                        value={`${markerPosition.lat}, ${markerPosition.lng}`} // Display coordinates dynamically
                        readOnly
                        className="flex-1 p-3 bg-transparent focus:outline-none focus:ring-0"
                    />
                </div>

                <div className="w-full h-96 mb-6 mt-4 rounded-lg overflow-hidden">
                    <MapContainer center={coordinates} zoom={13} className="h-full w-full">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <MapClickHandler />
                        <Marker position={markerPosition}>
                            <Popup>You selected this location.</Popup>
                        </Marker>
                    </MapContainer>
                </div>

                <button
                    type="submit"
                    className="bg-eggplant text-white font-bold py-2 rounded-lg hover:bg-thulian-pink transition duration-200"
                >
                    Add Outlet
                </button>
            </form>
        </div>
    );
};

export default AddOutlet;
