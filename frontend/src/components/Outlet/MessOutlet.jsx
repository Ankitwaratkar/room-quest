import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import Menu from '../Menu/Menu';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MessOutlet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userType } = useAuth();
    const [selectedTab, setSelectedTab] = useState("Description");
    const [outletData, setOutletData] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuLimit, setMenuLimit] = useState(2);

    useEffect(() => {
        const fetchOutletData = async () => {
            if (!id) {
                console.error('Outlet ID is undefined.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/api/v1/mess/mess-outlet/${id}`);
                setOutletData(response.data);
            } catch (error) {
                console.error('Error fetching outlet data:', error);
                setOutletData(null);
            } finally {
                setLoading(false);
            }
        };

        const fetchMenuData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/mess/menu');
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchOutletData();
        fetchMenuData();  // Fetch menu items when the component mounts
    }, [id]);

    const loadMoreMenuItems = () => {
        setMenuLimit((prevLimit) => prevLimit + 2);
    };

    if (loading) {
        return <div className="text-center">Loading outlet information...</div>;
    }

    if (!outletData) {
        return <div className="text-center">Outlet not found.</div>;
    }

    const { outletName, description, coordinates, phone, email, openingHours, image, reviews = [] } = outletData;
    const lat = coordinates.lat;
    const lng = coordinates.lng;

    return (
        <div className="bg-misty-rose min-h-screen flex flex-col items-center p-8">
            <h1 className="text-eggplant font-bold text-3xl mb-6">Mess Outlet Information</h1>

            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-7xl flex flex-col">
                <div className="flex mb-6 relative">
                    <div className="pr-4">
                        <img
                            src={image.url || "https://via.placeholder.com/300x300"}
                            alt={outletName}
                            className="rounded-lg shadow-md object-fill w-fit h-fit"
                            style={{ width: '250px', height: '250px' }}
                        />
                    </div>
                    <div className="">
                        <h2 className="text-eggplant font-bold text-2xl mb-4">{outletName}</h2>
                        <p><strong>Location:</strong> {lat}, {lng}</p>
                        <p><strong>Phone Number:</strong> {phone}</p>
                        {description}
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Opening Hours:</strong> {openingHours}</p>

                        {userType === 'Multi-Mess Manager' && (
                            <button
                                className="absolute top-0 right-0 m-4 bg-eggplant text-white px-4 py-2 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:bg-eggplant-dark hover:scale-105 hover:shadow-lg"
                                onClick={() => navigate(`/add-menu/${id}`)} // Pass the outlet ID dynamically
                            >
                                Add Menu
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 mb-4">
                    {["Description", "Menu", "Reviews"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`px-4 py-2 rounded-lg font-semibold ${selectedTab === tab ? "bg-eggplant text-white" : "bg-gray-200 text-eggplant"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div>
                    {selectedTab === "Description" && (
                        <div>
                            <h2 className="text-eggplant font-bold text-xl mb-4">Description</h2>
                            <p>{description}</p>
                            <div className="w-full h-80 relative mt-4">
                                <MapContainer
                                    center={[lat, lng]}
                                    zoom={13}
                                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[lat, lng]}>
                                        <Popup>{outletName}</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                    )}

                    {selectedTab === "Menu" && (
                        <div className="w-full">
                            <h2 className="text-eggplant font-bold text-xl mb-4">Menu</h2>
                            {menuItems.length === 0 ? (
                                <p className="text-gray-500">No menu items available.</p>
                            ) : (
                                <>
                                    <div className="min-h-screen bg-misty-rose flex items-center justify-center">
                                        <Menu />
                                    </div>
                                    {menuLimit < menuItems.length && (
                                        <button
                                            className="mt-4 px-4 py-2 bg-eggplant text-white rounded-lg hover:bg-eggplant-dark transition duration-200"
                                            onClick={loadMoreMenuItems}
                                        >
                                            Load More Menu Items
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {selectedTab === "Reviews" && (
                        <div>
                            <h2 className="text-eggplant font-bold text-xl mb-4">Reviews</h2>
                            {reviews.length === 0 ? (
                                <p className="text-gray-500">No reviews yet.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {reviews.map((review, index) => (
                                        <li key={index} className="border-b pb-2">
                                            <p><strong>{review.reviewer}</strong> - Rating: {review.rating}/5</p>
                                            <p>{review.comment}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessOutlet;
