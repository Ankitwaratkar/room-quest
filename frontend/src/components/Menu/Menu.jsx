import React, { useState, useEffect } from 'react';
import MenuCard from './MenuCard';

const Menu = () => {
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/user/menu'); // Endpoint for your menu data
                const data = await response.json();
                setMenuData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchMenuData();
    }, []);

    return (
        <div className="menu-container px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {menuData.map((menu, index) => (
                    <MenuCard key={index} menuData={menu} />
                ))}
            </div>
        </div>
    );
};

export default Menu;
