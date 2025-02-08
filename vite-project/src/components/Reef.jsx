import React from "react";
import Counter from "./Counter";
import ReefImage from "../assets/REEF.png";

const Reef = ({ type, currentMatchString, scoutingData, setScoutingData }) => {
  return (
    <div className={`reef flex h-[calc(100vh-9.5rem)] justify-between`}>
      <div className="counters flex flex-col justify-center h-full flex-grow">
        <Counter 
          path={`${type}.L4`} 
          currentMatchString={currentMatchString} 
          scoutingData={scoutingData} 
          setScoutingData={setScoutingData} 
          maxCount={type === "auto" ? 6 : 12} 
        />
        <Counter 
          path={`${type}.L3`} 
          currentMatchString={currentMatchString} 
          scoutingData={scoutingData} 
          setScoutingData={setScoutingData} 
          maxCount={type === "auto" ? 6 : 12} 
        />
        <Counter 
          path={`${type}.L2`} 
          currentMatchString={currentMatchString} 
          scoutingData={scoutingData} 
          setScoutingData={setScoutingData} 
          maxCount={type === "auto" ? 6 : 12} 
        />
        <Counter 
          path={`${type}.L1`} 
          currentMatchString={currentMatchString} 
          scoutingData={scoutingData} 
          setScoutingData={setScoutingData} 
          maxCount={type === "auto" ? 6 : 24} 
        />
      </div>
      <div className="reef-image flex justify-end items-center h-full">
        <img
          src={ReefImage}
          alt="Reef"
          className="h-full w-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Reef;