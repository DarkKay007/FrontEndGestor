import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center pt-48 items-center  h-full">
    <div className="flex space-x-2">
      <div className="w-11 h-11 bg-yellow-500 animate-bounce"></div>
      <div className="w-11 h-11 bg-yellow-500 animate-bounce200"></div>
      <div className="w-11 h-11 bg-yellow-500 animate-bounce400"></div>
    </div>
  </div>
  );
};

export default LoadingSpinner;
