import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomCard from './RoomCard';  // Import RoomCard to display room details

const Room = () => {
    const [roomsData, setRoomsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoomsData = async () => {
            try {
                // Fetch all rooms without filtering by ID
                const response = await axios.get('http://localhost:5000/api/v1/residence/rooms');
                setRoomsData(response.data);  // Set all room data from API
            } catch (error) {
                console.error('Error fetching rooms data:', error);
                setRoomsData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomsData();
    }, []);

    if (loading) {
        return <div className="text-center">Loading rooms data...</div>;
    }

    if (roomsData.length === 0) {
        return <div className="text-center">No rooms available.</div>;
    }

    return (
        <div>
            {/* Render all rooms */}
            {roomsData.map((room, index) => (
                <RoomCard key={index} roomData={room} />
            ))}
        </div>
    );
};

export default Room;
