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
import AddRoom from './components/Residence/AddRoom';

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
            </Route>

            <Route element={<ProtectedRoute allowedTypes={["Residency Owner"]} />}>
              <Route path="/residence-owner-home" element={<ResidencyOwnerHome />} />
              <Route path="/add-outlet" element={<AddOutlet />} />
              <Route path="/outlets" element={<Outlets />} />
              <Route path="/outlet/:id" element={<OutletInfo />} />
              <Route path="/add-room" element={<AddRoom />} />
            </Route>

            <Route element={<ProtectedRoute allowedTypes={["Multi-Mess Manager"]} />}>
              <Route path="/multi-mess-manager-home" element={<MultiMessManagerHome />} />
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
