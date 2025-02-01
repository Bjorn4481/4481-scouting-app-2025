import React from "react";
import Counter from "./Counter";

const Reef = ({ type, scoutingData, setScoutingData }) => {
  return (
    <div className={`reef flex h-[calc(100vh-4rem)] justify-between`}>
      <div className="counters flex flex-col gap-6 justify-center h-full flex-grow">
        <Counter path={`${type}.L4`} scoutingData={scoutingData} setScoutingData={setScoutingData} />
        <Counter path={`${type}.L3`} scoutingData={scoutingData} setScoutingData={setScoutingData} />
        <Counter path={`${type}.L2`} scoutingData={scoutingData} setScoutingData={setScoutingData} />
        <Counter path={`${type}.L1`} scoutingData={scoutingData} setScoutingData={setScoutingData} />
      </div>
      <div className="reef-image flex justify-end items-center h-full">
        <img
          src="/src/assets/REEF.png"
          alt="Reef"
          className="h-full w-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Reef;