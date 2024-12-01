import React, { useState, useEffect } from 'react';

const RoomMates = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [sortAge, setSortAge] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [expandedDetails, setExpandedDetails] = useState(null);
    const [expandedFacilities, setExpandedFacilities] = useState(null);
    const [roommates, setRoommates] = useState([]);

    // Fetch roommates data from the backend
    useEffect(() => {
        const fetchRoommates = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/user/roomies');
                const data = await response.json();
                setRoommates(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchRoommates();
    }, []);

    const filteredRoommates = roommates
        .filter(roommate =>
            roommate.roommateName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filter === '' || roommate.roommateGender === filter)
        )
        .sort((a, b) => {
            if (sortAge === 'asc') {
                return a.roommateAge - b.roommateAge;
            } else if (sortAge === 'desc') {
                return b.roommateAge - a.roommateAge;
            }
            return 0;
        })
        .filter(roommate => {
            if (ageRange === '18-25') {
                return roommate.roommateAge >= 18 && roommate.roommateAge <= 25;
            } else if (ageRange === '26-35') {
                return roommate.roommateAge >= 26 && roommate.roommateAge <= 35;
            } else if (ageRange === '36+') {
                return roommate.roommateAge >= 36;
            }
            return true; // If no age range is selected, return all roommates
        });

    return (
        <div className="bg-pink-100 min-h-screen flex flex-col h-full w-full">
            <h1 className="text-dark-grayish-brown text-4xl font-bold text-center mt-6">Find Your Roommate</h1>

            <div className="flex justify-center mb-6 mt-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="p-2 border border-gray-300 bg-[#E8B4BC] rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#F5E3E0]"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 border border-gray-300 bg-[#E8B4BC] rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#F5E3E0]"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <select
                    className="p-2 border border-gray-300 bg-[#E8B4BC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5E3E0] ml-4"
                    value={sortAge}
                    onChange={e => setSortAge(e.target.value)}
                >
                    <option value="">Sort by Age</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <select
                    className="p-2 border border-gray-300 bg-[#E8B4BC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5E3E0] ml-4"
                    value={ageRange}
                    onChange={e => setAgeRange(e.target.value)}
                >
                    <option value="">Select Age Range</option>
                    <option value="18-25">18-25</option>
                    <option value="26-35">26-35</option>
                    <option value="36+">36+</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-lg ml-4 mr-4 mb-10">
                {filteredRoommates.map(roommate => (
                    <div key={roommate._id} className="bg-[#F5E3E0] rounded-xl p-4 flex flex-col items-center">
                        <img
                            src={roommate.profilePicture.url}
                            alt={roommate.roommateName}
                            className="w-32 h-32 object-cover rounded-full mb-4"
                        />
                        <h2 className="text-xl text-black font-bold">{roommate.roommateName}</h2>
                        <p className="text-gray-900 font-semibold">Age: {roommate.roommateAge}</p>
                        <p className="text-gray-900 font-semibold">{roommate.roommateGender}</p>

                        {/* Display facilities with Show More functionality */}
                        <p className="text-gray-900 font-semibold text-center">
                            {Array.isArray(roommate.facilities) && roommate.facilities.length > 0
                                ? (expandedFacilities === roommate._id
                                    ? roommate.facilities.join(', ') // Show all facilities if expanded
                                    : roommate.facilities.slice(0, 3).join(', ') // Show only first 3 facilities by default
                                )
                                : 'No facilities listed'}
                        </p>

                        {/* Show More/Show Less for facilities */}
                        {roommate.facilities && roommate.facilities.length > 3 && (
                            <span
                                onClick={() => setExpandedFacilities(expandedFacilities === roommate._id ? null : roommate._id)}
                                className="text-blue-500 cursor-pointer ml-2"
                            >
                                {expandedFacilities === roommate._id ? ' Show Less' : ' ...Show More'}
                            </span>
                        )}

                        {/* Show Details functionality */}
                        <button
                            onClick={() => setExpandedDetails(expandedDetails === roommate._id ? null : roommate._id)}
                            className="bg-[#6E4555] hover:bg-[#ea86ac] text-white font-bold py-2 px-4 rounded mt-2"
                        >
                            {expandedDetails === roommate._id ? 'Hide Details' : 'Show Details'}
                        </button>

                        {/* Room Details when Show Details is clicked */}
                        {expandedDetails === roommate._id && (
                            <div className="mt-4 text-center">
                                <h3 className="text-lg font-bold">Room Details</h3>
                                <p className="text-gray-900 font-semibold">{roommate.roomType}</p>
                                <p className="text-gray-900 font-semibold">{roommate.furnishing}</p>
                                <p className="text-gray-900">{roommate.roomDesc}</p>
                                <p className="text-gray-900 font-semibold">Rent: ₹{roommate.price}</p>
                                <p className="text-gray-900 font-semibold">Vacancy: {roommate.vacancy}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomMates;
