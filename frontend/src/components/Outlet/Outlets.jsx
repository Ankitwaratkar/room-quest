import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Outlets = () => {
    const { userType } = useAuth();
    const { outletType } = useParams(); // Get outletType from URL parameter
    const [outlets, setOutlets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOutlets, setExpandedOutlets] = useState({});  // Track expanded outlets
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOutlets = async () => {
            setLoading(true);

            let apiEndpoint = '';


            // Check for valid outletType
            if (userType !== 'Residency Owner' && userType !== 'Multi-Mess Manager') {
                // Log outletType to check if it's being received correctly
                console.log('outletType from URL:', outletType);

                if (!outletType || (outletType !== 'Residence' && outletType !== 'Mess')) {
                    console.error('Invalid outletType provided');
                    setLoading(false);
                    return;
                }
            }


            if (userType === 'Residency Owner') {
                apiEndpoint = 'http://localhost:5000/api/v1/residence/outlets';
            } else if (userType === 'Multi-Mess Manager') {
                apiEndpoint = 'http://localhost:5000/api/v1/mess/mess-outlets';
            } else if (userType === 'User') {
                if (outletType === 'Residence' || outletType === 'Mess') {
                    apiEndpoint = `http://localhost:5000/api/v1/user/outlets?outletType=${outletType}`;
                } else {
                    console.error('Invalid outletType provided');
                    setLoading(false);
                    return;
                }
            } else {
                console.error('Invalid userType provided');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(apiEndpoint);
                if (!response.ok) throw new Error('Failed to fetch outlets');
                const data = await response.json();

                // For User, filter based on both userType and outletType (from URL)
                if (userType === 'User') {
                    const filteredOutlets = data.filter(outlet =>
                        outlet.outletType.toLowerCase() === outletType.toLowerCase() // Case-insensitive comparison
                    );
                    setOutlets(filteredOutlets); // Set filtered data for User
                } else {
                    // For Residency Owner and Multi-Mess Manager, filter based on outletType ('Residence' or 'Mess')
                    const filteredOutlets = data.filter(outlet =>
                        outlet.outletType.toLowerCase() === (userType === 'Residency Owner' ? 'residence' : 'mess')
                    );
                    setOutlets(filteredOutlets); // Set filtered data for Residency Owner and Multi-Mess Manager
                }

            } catch (error) {
                console.error('Error fetching outlets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOutlets();
    }, [userType, outletType]); // Dependency on userType and outletType from the URL

    const handleMoreInfo = (id) => {
        let route = '';

        if (userType === 'Residency Owner') {
            route = `/outlet/${id}`;  // Route for Residency Owner
        }
        else if (userType === 'Multi-Mess Manager') {
            route = `/mess-outlet/${id}`;  // Route for Multi Mess Manager
        }
        else if (userType === 'User') {
            if (outletType === 'Residence') {
                route = `/resi-outlets/${id}`;  // Route for Residency Owner
            }
            if (outletType === 'Mess') {
                route = `/mess-outlets/${id}`;  // Route for Multi Mess Manager
            }
        }
        else {
            console.error('Invalid userType for routing');
            return;
        }

        navigate(route);
    };

    // Toggle full description for an outlet
    const handleToggleDescription = (id) => {
        setExpandedOutlets(prevState => ({
            ...prevState,
            [id]: !prevState[id] // Toggle the expanded state for the outlet
        }));
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

                        {/* Show only first 3 lines of description */}
                        <p className="text-jet mb-1">
                            {expandedOutlets[outlet._id]
                                ? outlet.description // Show full description if expanded
                                : outlet.description.split('\n').slice(0, 3).join('\n') // Show first 3 lines
                            }
                        </p>

                        <button
                            onClick={() => handleToggleDescription(outlet._id)} // Toggle description
                            className="mt-2 text-thulian-pink hover:underline"
                        >
                            {expandedOutlets[outlet._id] ? 'Show Less' : 'Show More'}
                        </button>

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
