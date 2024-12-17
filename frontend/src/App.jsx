import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './contexts/AuthContext';
import ProtectedRoute from './private/ProtectedRoute';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Layout from './pages/Layout';
import UserHome from './pages/Home/UserHome';
import ResidencyOwnerHome from './pages/Home/ResidencyOwnerHome';
import MultiMessManagerHome from './pages/Home/MultiMessManagerHome';
import AboutUs from './pages/AboutUs';
// import MenuItem from './components/Menu/MenuItem';
import AddOutlet from './components/Outlet/AddOutlet';
import OutletInfo from './components/Outlet/OutletInfo';
import Outlets from './components/Outlet/Outlets';
import AddRoomie from './components/Residence/AddRoomie';
import AddRoom from './components/Residence/AddRoom';
import MessOutlet from './components/Outlet/MessOutlet';
import AddMenu from './components/Menu/AddMenu';
import RoomMates from './pages/RoomMates';
import Menu from './components/Menu/Menu';
import Room from './components/Residence/Room';

const App = () => {
  return (
    // <AuthProvider>
    //   <Router>
    //     <Routes>
    //       <Route path='/' element={<OutletInfo />}></Route>
    //     </Routes>
    //   </Router>
    // </AuthProvider >
    <AuthProvider>
      <Router>
        <ToastContainer />  {/* This will display toast messages on all pages */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/about-us' element={<AboutUs />} />

          {/* Protected Routes */}
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute allowedTypes={["User"]} />}>
              <Route path="/user-home" element={<UserHome />} />
              <Route path='/room-mates' element={<RoomMates />} />
              <Route path='/menu-items' element={<Menu />} />
              <Route path='/rooms' element={<Room />} />
              <Route path="/outlets/:outletType" element={<Outlets />} /> {/* Type-based route */}
              <Route path="/resi-outlets/:id" element={<OutletInfo />} />
              <Route path="/mess-outlets/:id" element={<MessOutlet />} />
            </Route>

            <Route element={<ProtectedRoute allowedTypes={["Residency Owner"]} />}>
              <Route path="/residence-owner-home" element={<ResidencyOwnerHome />} />
              <Route path="/add-outlet" element={<AddOutlet />} />
              <Route path="/outlets" element={<Outlets />} />
              <Route path="/outlet/:id" element={<OutletInfo />} />
              <Route path="/add-room" element={<AddRoom />} />
              <Route path="/add-roomie" element={<AddRoomie />} />
            </Route>

            <Route element={<ProtectedRoute allowedTypes={["Multi-Mess Manager"]} />}>
              <Route path="/multi-mess-manager-home" element={<MultiMessManagerHome />} />
              <Route path="/add-mess" element={<AddOutlet />} />
              <Route path="/mess-outlets" element={<Outlets />} />
              <Route path="/mess-outlet/:id" element={<MessOutlet />} />
              <Route path="/add-menu/:id" element={<AddMenu />} />
            </Route>
          </Route>

          {/* Redirect all other paths to the home page if not matched */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
