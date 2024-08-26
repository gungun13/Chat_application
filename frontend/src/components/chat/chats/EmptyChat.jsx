import React from 'react';
import landingPhoto from '../../../assets/images/landing_page .png'

const EmptyChat = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="text-center space-y-16">
        <img
          className="w-108 h-80 ml-48 object-cover mr-32"
          src={landingPhoto}
          alt="Empty chat placeholder"
        />
        <div className="text-center mt-2 ml-32">
          <p className="text-gray-800 text-xl mt-4">Start your conversation!!</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;



