import React, { useState, useEffect } from "react";

// Utility function to update nested fields
const updateNestedField = (obj, path, value) => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const lastObj = keys.reduce((obj, key) => obj[key], obj);
  lastObj[lastKey] = value;
};

const Counter = ({ path, scoutingData, setScoutingData }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const keys = path.split(".");
    const value = keys.reduce((obj, key) => obj[key], scoutingData);
    setCount(value);
  }, [path, scoutingData]);

  const updateScoutingData = (newCount) => {
    setScoutingData((prevData) => {
      const newData = { ...prevData };
      updateNestedField(newData, path, newCount);
      return newData;
    });
  };

  const handleIncrement = () => {
    const newCount = Math.min(count + 1, 12);
    setCount(newCount);
    updateScoutingData(newCount);
  };

  const handleDecrement = () => {
    const newCount = Math.max(count - 1, 0);
    setCount(newCount);
    updateScoutingData(newCount);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center space-x-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-4xl px-6 py-4 rounded transition duration-300"
          onClick={handleDecrement}
        >
          -
        </button>
        <span className="text-white text-8xl font-bold">{count}</span>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold text-4xl px-6 py-4 rounded transition duration-300"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;