import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Outlets = () => {
    const { userType } = useAuth();
    const [outlets, setOutlets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOutlets = async () => {
            setLoading(true);

            // Determine the API endpoint based on userType
            const apiEndpoint =
                userType === 'Residency Owner'
                    ? 'http://localhost:5000/api/v1/residence/outlets'
                    : 'http://localhost:5000/api/v1/mess/mess-outlets';

            try {
                const response = await fetch(apiEndpoint);
                if (!response.ok) throw new Error('Failed to fetch outlets');
                const data = await response.json();

                // Filter outlets by userType and outletType
                const filteredOutlets = data.filter(outlet => outlet.outletType === (userType === 'Residency Owner' ? 'Residence' : 'Mess'));
                setOutlets(filteredOutlets);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOutlets();
    }, [userType]);

    const handleMoreInfo = (id) => {
        let route = '';

        // Determine the route based on userType
        if (userType === 'Residency Owner') {
            route = `/outlet/${id}`;  // Route for Residency Owner
        } else if (userType === 'Multi-Mess Manager') {
            route = `/mess-outlet/${id}`;  // Route for Multi Mess Manager
        } else {
            console.error('Invalid userType for routing');
            return;
        }

        navigate(route);
    };


    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold text-jet mb-6">Our Outlets</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {outlets.map(outlet => (
                    <div key={outlet._id} className="bg-misty-rose p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <h2 className="text-xl font-bold text-eggplant mb-2">{outlet.outletName}</h2>
                        <p className="text-thulian-pink mb-1">📞 Phone: {outlet.phone}</p>
                        <p className="text-thulian-pink mb-1">✉️ Email: {outlet.email}</p>
                        <p className="text-jet mb-1">🕒 Opening Hours: {outlet.openingHours}</p>
                        <p className="text-jet mb-1">🗺️ Coordinates: ({outlet.coordinates.lat}, {outlet.coordinates.lng})</p>
                        <p className="text-jet mb-1">📝 Description: {outlet.description}</p>
                        <button
                            onClick={() => handleMoreInfo(outlet._id)}
                            className="mt-4 bg-thulian-pink text-white px-4 py-2 rounded-lg hover:bg-eggplant transition-colors duration-200"
                        >
                            More Info
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Outlets;
