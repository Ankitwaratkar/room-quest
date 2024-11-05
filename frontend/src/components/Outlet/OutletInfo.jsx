import React, { useState, useEffect, useRef } from 'react'; // Import useRef for scroll detection
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import RoomCard from '../Residence/RoomCard';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const OutletInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userType } = useAuth();
    const [selectedTab, setSelectedTab] = useState("Description");
    const [outletData, setOutletData] = useState(null);
    const [rooms, setRooms] = useState([]);  // State to store rooms data
    const [loading, setLoading] = useState(true);
    const [roomLimit, setRoomLimit] = useState(2); // Number of rooms to show initially

    const roomListRef = useRef(); // Reference to the room list

    useEffect(() => {
        const fetchOutletData = async () => {
            if (!id) {
                console.error('Outlet ID is undefined.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/api/v1/residence/outlet/${id}`);
                setOutletData(response.data);
            } catch (error) {
                console.error('Error fetching outlet data:', error);
                setOutletData(null);
            } finally {
                setLoading(false);
            }
        };

        const fetchRoomsData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/residence/rooms');
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms data:', error);
            }
        };

        fetchOutletData();
        fetchRoomsData();
    }, [id]);

    const loadMoreRooms = () => {
        setRoomLimit((prevLimit) => prevLimit + 2); // Load two more rooms on each call
    };

    if (loading) {
        return <div className="text-center">Loading outlet information...</div>;
    }

    if (!outletData) {
        return <div className="text-center">Outlet not found.</div>;
    }

    const { outletName, coordinates, phone, email, openingHours, image, reviews = [] } = outletData;
    const lat = coordinates.lat;
    const lng = coordinates.lng;

    return (
        <div className="bg-misty-rose min-h-screen flex flex-col items-center p-8">
            <h1 className="text-eggplant font-bold text-3xl mb-6">Outlet Information</h1>

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
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Opening Hours:</strong> {openingHours}</p>

                        {userType === 'Residency Owner' && (
                            <button
                                className="absolute top-0 right-0 m-4 bg-eggplant text-white px-4 py-2 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:bg-eggplant-dark hover:scale-105 hover:shadow-lg"
                                onClick={() => navigate('/add-room')}
                            >
                                Add A Room
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 mb-4">
                    {["Description", "Rooms", "Reviews"].map((tab) => (
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
                            <p>This outlet offers a variety of services and is located in a prime area.</p>
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

                    {selectedTab === "Rooms" && (
                        <div className="w-full">
                            <h2 className="text-eggplant font-bold text-xl mb-4">Rooms</h2>
                            {rooms.length === 0 ? ( // Check if rooms array is empty
                                <p className="text-gray-500">No rooms available.</p> // Message when there are no rooms
                            ) : (
                                <>
                                    <div className="overflow-y-auto h-64"> {/* Scrollable area */}
                                        <div className="flex flex-col gap-4 w-full">
                                            {rooms.slice(0, roomLimit).map((room, index) => ( // Show rooms up to roomLimit
                                                <RoomCard key={index} roomData={room} />
                                            ))}
                                        </div>
                                    </div>
                                    {roomLimit < rooms.length && ( // Only show button if there are more rooms to load
                                        <button
                                            className="mt-4 px-4 py-2 bg-eggplant text-white rounded-lg hover:bg-eggplant-dark transition duration-200"
                                            onClick={loadMoreRooms}
                                        >
                                            Load More Rooms
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {selectedTab === "Reviews" && (
                        <div>
                            <h2 className="text-eggplant font-bold text-xl mb-4">Reviews</h2>
                            {reviews.length === 0 ? ( // Check if reviews array is empty
                                <p className="text-gray-500">No reviews yet.</p> // Message when there are no reviews
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

export default OutletInfo;
