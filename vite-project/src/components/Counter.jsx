import React, { useState, useEffect } from "react";

const Counter = ({ path, currentMatchString, scoutingData, setScoutingData }) => {
  const [count, setCount] = useState(0);
  const phase = path.split(".")[0];
  const action = path.split(".")[1];
  
  useEffect(() => {
    const currentMatch = scoutingData.matches[currentMatchString];
    const currentCount = currentMatch?.[phase]?.[action] || 0;
    setCount(currentCount);
  }, [currentMatchString, scoutingData, path]);

  const updateScoutingData = (newCount) => {
    setScoutingData((prev) => ({
      ...prev,
      matches: {
        ...prev.matches,
        [currentMatchString]: {
          ...prev.matches[currentMatchString],
          [phase]: {
            ...prev.matches[currentMatchString][phase],
            [action]: newCount,
          },
        },
      },
    }));
  }

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
      <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg">
        <span className="text-white text-xl font-semibold">{phase}: {action}</span>
        <div className="flex items-center space-x-6">
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
    </div>
  );
};

export default Counter;
