import React from 'react';

const Aboutus = () => {
  return (
    <div className="bg-cover flex items-center"  >
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="card">
            <div className="card-content text-center">
              <h3 className="text-xl text-red-500">Email</h3>
              <span className="text-black">Grisly@address.com</span>
            </div>
          </div>
          <div className="card">
            <div className="card-content text-center">
              <h3 className="text-xl text-red-500">Phone Number</h3>
              <span className="text-black">+977 9812365478</span>
            </div>
          </div>
          <div className="card">
            <div className="card-content text-center">
              <h3 className="text-xl text-red-500">Location</h3>
              <span className="text-black">Balaju, Kathmandu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
