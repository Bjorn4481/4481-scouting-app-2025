import React, { useState, useEffect, useRef } from "react";

const Counter = ({ path, currentMatchString, scoutingData, setScoutingData, maxCount }) => {
  const [count, setCount] = useState(0);
  const phase = path.split(".")[0];
  const action = path.split(".")[1];

  // Refs to store timeout IDs for auto increment/decrement
  const incrementTimeoutId = useRef(null);
  const decrementTimeoutId = useRef(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(incrementTimeoutId.current);
      clearTimeout(decrementTimeoutId.current);
    };
  }, []);

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
  };

  // Update count using the function updater to ensure we always use the latest value.
  const handleIncrement = () => {
    setCount((prevCount) => {
      const newCount = Math.min(prevCount + 1, maxCount);
      updateScoutingData(newCount);
      return newCount;
    });
  };

  const handleDecrement = () => {
    setCount((prevCount) => {
      const newCount = Math.max(prevCount - 1, 0);
      updateScoutingData(newCount);
      return newCount;
    });
  };

  // Auto-repeat functions for incrementing/decrementing.
  // We start with an initial delay and then reduce the delay on each iteration.
  const startAutoIncrement = () => {
    let delay = 500; // initial delay in ms
    // Immediately perform an increment.
    handleIncrement();
    const repeat = () => {
      handleIncrement();
      // Exponential acceleration (reduce delay, but no less than 50ms)
      delay = Math.max(50, delay * 0.75);
      incrementTimeoutId.current = setTimeout(repeat, delay);
    };
    incrementTimeoutId.current = setTimeout(repeat, delay);
  };

  const stopAutoIncrement = () => {
    if (incrementTimeoutId.current) {
      clearTimeout(incrementTimeoutId.current);
      incrementTimeoutId.current = null;
    }
  };

  const startAutoDecrement = () => {
    let delay = 500;
    handleDecrement();
    const repeat = () => {
      handleDecrement();
      delay = Math.max(50, delay * 0.75);
      decrementTimeoutId.current = setTimeout(repeat, delay);
    };
    decrementTimeoutId.current = setTimeout(repeat, delay);
  };

  const stopAutoDecrement = () => {
    if (decrementTimeoutId.current) {
      clearTimeout(decrementTimeoutId.current);
      decrementTimeoutId.current = null;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg">
        <span className="text-white text-xl font-semibold">
          {phase}: {action}
        </span>
        <div className="flex items-center space-x-6">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-4xl px-6 py-4 rounded transition duration-300"
            // For desktop
            onMouseDown={startAutoDecrement}
            onMouseUp={stopAutoDecrement}
            onMouseLeave={stopAutoDecrement}
            // For mobile
            onTouchStart={startAutoDecrement}
            onTouchEnd={stopAutoDecrement}
            // Prevent the default onClick behavior so we don't trigger twice
            onClick={(e) => e.preventDefault()}
          >
            -
          </button>
          <span className="text-white text-8xl font-bold">{count}</span>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-4xl px-6 py-4 rounded transition duration-300"
            onMouseDown={startAutoIncrement}
            onMouseUp={stopAutoIncrement}
            onMouseLeave={stopAutoIncrement}
            onTouchStart={startAutoIncrement}
            onTouchEnd={stopAutoIncrement}
            onClick={(e) => e.preventDefault()}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
