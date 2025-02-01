import React from "react";
import Counter from "./Counter";

const Barge = ({ type, scoutingData, setScoutingData }) => {
  return (
    <div className={`reef flex h-[calc(100vh-4rem)] justify-between`}>
      <div className="reef-image flex justify-end items-center h-full">
        <img
          src="/src/assets/BARGE.png"
          alt="Barge"
          className="h-full w-auto rounded-lg shadow-lg"
        />
      </div>
      <div className="counters flex flex-col gap-6 justify-center h-full flex-grow">
        <Counter
          path={`${type}.Net`}
          scoutingData={scoutingData}
          setScoutingData={setScoutingData}
        />
        <Counter
          path={`${type}.Remove`}
          scoutingData={scoutingData}
          setScoutingData={setScoutingData}
        />
        <Counter
          path={`${type}.Processor`}
          scoutingData={scoutingData}
          setScoutingData={setScoutingData}
        />
      </div>
    </div>
  );
};

export default Barge;
