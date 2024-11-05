import React, { useState } from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import { RiArrowDownSFill, RiArrowRightSFill } from "react-icons/ri";
import logo from '../../assets/logo.png';

const links = [
    { href: '/residence-owner-home', label: 'Home' },
    { href: '/add-outlet', label: 'Add Outlet' },
    { href: '/add-roomie', label: 'Add Roommate' },
    { href: '/outlets', label: 'Outlets' },
    // { href: '/owner-booking', label: 'Owner Bookings', hasDropdown: true },
];

const dropdownLinks = [
    { href: '/logout', label: 'Logout' }
];

const RecidencyNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const [isBookingsDropdownOpen, setIsBookingsDropdownOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    // const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    // const toggleBookingsDropdown = (e) => {
    //     e.preventDefault();
    //     setIsBookingsDropdownOpen(!isBookingsDropdownOpen);
    // };

    return (
        <nav className="bg-[#361a25]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Mobile Menu Button */}
                    <div className="flex items-center">
                        <div className="-ml-2 mr-2 flex md:hidden">
                            <button
                                onClick={toggleMenu}
                                type="button"
                                className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isMenuOpen ? <FaBarsStaggered /> : <GrClose />}
                            </button>
                        </div>
                        <div className="flex-shrink-0 h-24 w-32"> {/* Increased size here */}
                            <a href="/" className="text-white text-xl font-bold">
                                <img src={logo} alt="logo" className="h-full w-full object-contain" />
                            </a>
                        </div>
                    </div>

                    {/* Main Links for Desktop */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {links.map(({ href, label, hasDropdown }) => (
                                <div key={href} className="relative flex items-center">
                                    <a
                                        href={href}
                                        className={`text-white px-3 py-2 rounded-md text-sm font-medium ${hasDropdown ? 'flex items-center cursor-pointer' : ''}`}
                                        onClick={hasDropdown ? toggleBookingsDropdown : undefined}
                                    >
                                        {label}
                                        {hasDropdown && (
                                            isBookingsDropdownOpen ? <RiArrowRightSFill className="ml-2 h-5 w-5" aria-hidden="true" />
                                                : <RiArrowDownSFill className="ml-2 h-5 w-5" aria-hidden="true" />
                                        )}
                                    </a>
                                    {/* Bookings Dropdown Menu */}
                                    {hasDropdown && isBookingsDropdownOpen && (
                                        <div className="origin-top-right absolute left-0 mt-32 ml-4 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {dropdownLinks.map(({ href, label }) => (
                                                <a
                                                    key={href}
                                                    href={href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Logout Link */}
                    <div className="flex items-center">
                        <div className="relative ml-3">
                            <a
                                href="/logout"
                                className="text-white bg-transparent border border-white rounded-md px-4 py-2 text-sm font-bold hover:bg-white hover:text-[#361a25] transition duration-200" // Unique styles for Logout
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {links.map(({ href, label, hasDropdown }) => (
                        <div key={href} className="relative flex items-center">
                            <a
                                href={href}
                                className={`text-white block px-3 py-2 rounded-md text-base font-medium ${hasDropdown ? 'flex items-center cursor-pointer' : ''}`}
                                onClick={hasDropdown ? toggleBookingsDropdown : undefined}
                            >
                                {label}
                                {hasDropdown && (
                                    isBookingsDropdownOpen ? <RiArrowRightSFill className="ml-2 h-5 w-5" aria-hidden="true" />
                                        : <RiArrowDownSFill className="ml-2 h-5 w-5" aria-hidden="true" />
                                )}
                            </a>
                            {/* Bookings Dropdown for Mobile */}
                            {hasDropdown && isBookingsDropdownOpen && (
                                <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-md shadow-lg mt-2 w-48">
                                    {dropdownLinks.map(({ href, label }) => (
                                        <a
                                            key={href}
                                            href={href}
                                            className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {/* Logout link in mobile menu */}
                    <div className="flex items-center">
                        <a
                            href="/logout"
                            className="text-white block px-3 py-2 rounded-md text-base font-bold border border-white bg-transparent hover:bg-white hover:text-[#361a25] transition duration-200" // Unique styles for Logout in mobile
                        >
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default RecidencyNav;
