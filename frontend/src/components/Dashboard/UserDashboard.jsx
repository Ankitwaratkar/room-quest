import React from 'react';
import user from '../../assets/dash/user.png';

const UserDashboard = () => {
  return (
    <div className="bg-pink-100 min-h-screen flex flex-col h-full w-full">
      {/* Full Width Image */}
      <div className="flex justify-center h-full w-full my-8">
        <img
          src={user}
          alt="Dashboard Image 1"
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>
      {/* Other Components */}
    </div>
  );
};

export default UserDashboard;
