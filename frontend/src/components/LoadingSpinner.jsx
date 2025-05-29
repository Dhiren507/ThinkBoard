import React from 'react';

const LoadingSpinner = ({ size = "md", message = "Loading..." }) => {
  const sizeClass = {
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
  }[size] || "loading-md";

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-2">
      <div className={`loading loading-spinner ${sizeClass} text-primary`}></div>
      {message && (
        <p className="text-base-content/60 text-sm font-medium mt-2 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
