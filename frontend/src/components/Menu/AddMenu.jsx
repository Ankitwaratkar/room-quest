import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Access route params and useNavigate
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const AddMenu = () => {
    const { id } = useParams();  // Get outletId from URL params
    const navigate = useNavigate(); // Hook for navigation
    const [menuData, setMenuData] = useState({
        name: '',
        price: '',
        deliveryTime: '',
        description: '',
        rating: '',
        image: null,
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMenuData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setMenuData({
            ...menuData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!menuData.image) {
            setError('Please upload an image.');
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', menuData.image);  // Make sure 'image' matches backend field name
            formData.append('name', menuData.name);
            formData.append('price', menuData.price);
            formData.append('deliveryTime', menuData.deliveryTime);
            formData.append('description', menuData.description);
            formData.append('rating', menuData.rating);
            formData.append('outletId', id);  // Outlet ID from route params

            const response = await axios.post('http://localhost:5000/api/v1/mess/add-menu', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setLoading(false);
                toast.success('Menu added successfully!'); // Show success toast
                setTimeout(() => {
                    navigate('/multi-mess-manager-home'); // Redirect to home after a delay
                }, 2000); // Adjust the time based on your preference
            }
        } catch (error) {
            setLoading(false);
            console.error('Error adding menu item:', error);
            setError('An error occurred while adding the menu item.');
            toast.error('An error occurred. Please try again.'); // Show error toast
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-misty-rose p-6 animate__animated animate__fadeIn">
            <div className="w-full sm:max-w-xl p-8 bg-white rounded-lg shadow-xl space-y-6 animate__animated animate__zoomIn animate__delay-1s">
                <h2 className="text-2xl font-semibold text-center text-thulian-pink mb-4">Add New Menu Item</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-thulian-pink">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={menuData.name}
                                onChange={handleChange}
                                placeholder="Enter menu name"
                                className="w-full px-5 py-3 rounded-lg border border-jet focus:ring-2 focus:ring-orchid-pink focus:outline-none transition duration-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-thulian-pink">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={menuData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                className="w-full px-5 py-3 rounded-lg border border-jet focus:ring-2 focus:ring-orchid-pink focus:outline-none transition duration-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="deliveryTime" className="block text-thulian-pink">Delivery Time</label>
                            <input
                                type="text"
                                id="deliveryTime"
                                name="deliveryTime"
                                value={menuData.deliveryTime}
                                onChange={handleChange}
                                placeholder="Enter delivery time"
                                className="w-full px-5 py-3 rounded-lg border border-jet focus:ring-2 focus:ring-orchid-pink focus:outline-none transition duration-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="rating" className="block text-thulian-pink">Rating (1-5)</label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                value={menuData.rating}
                                onChange={handleChange}
                                placeholder="Enter rating"
                                className="w-full px-5 py-3 rounded-lg border border-jet focus:ring-2 focus:ring-orchid-pink focus:outline-none transition duration-300"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-thulian-pink">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={menuData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="w-full px-5 py-3 rounded-lg border border-jet focus:ring-2 focus:ring-orchid-pink focus:outline-none transition duration-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-thulian-pink">Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full text-sm text-jet border border-jet rounded-lg py-3 px-4 focus:ring-2 focus:ring-orchid-pink focus:outline-none transition duration-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-orchid-pink text-white rounded-lg hover:bg-eggplant transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Menu'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMenu;
