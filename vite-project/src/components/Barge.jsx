import React from "react";
import Counter from "./Counter";
import BargeImage from "../assets/BARGE.png";

const Barge = ({ type, currentMatchString, scoutingData, setScoutingData }) => {
  return (
    <div className={`reef flex h-[calc(100vh-9.5rem)] justify-between`}>
      <div className="reef-image flex justify-end items-center h-full">
        <img
          src={BargeImage}
          alt="Barge"
          className="h-full w-auto rounded-lg shadow-lg"
        />
      </div>
      <div className="counters flex flex-col gap-6 justify-center h-full flex-grow">
        <Counter
          path={`${type}.Net`}
          currentMatchString={currentMatchString}
          scoutingData={scoutingData}
          setScoutingData={setScoutingData}
        />
        <Counter
          path={`${type}.Remove`}
          currentMatchString={currentMatchString}
          scoutingData={scoutingData}
          setScoutingData={setScoutingData}
        />
        <Counter
          path={`${type}.Processor`}
          currentMatchString={currentMatchString}
          scoutingData={scoutingData}
          setScoutingData={setScoutingData}
        />
      </div>
    </div>
  );
};

export default Barge;
