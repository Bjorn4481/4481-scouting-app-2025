import React from "react";
import Barge from "./Barge";
import Reef from "./Reef";

const ScoutingInputDiv = ({ 
  currentMatchString,
  setCurrentMatchString,
  scoutingData, 
  setScoutingData, 
  state, configData 
}) => {
  if (state === "auto" || state === "teleop") {
    return (
      <div className="scouting-input-div flex">
        <div className="flex-1">
          <Reef
            type={state}
            currentMatchString={currentMatchString}
            scoutingData={scoutingData}
            setScoutingData={setScoutingData}
          />
        </div>
        <div className="flex-1">
          <Barge
            type={state}
            currentMatchString={currentMatchString}
            scoutingData={scoutingData}
            setScoutingData={setScoutingData}
          />
        </div>
      </div>
    );
  }

  if (state === "Start Match") {
    const currentMatch = scoutingData.matches[currentMatchString];
    const scoutName = currentMatch?.scoutName || "";
    const teamNumber = currentMatch?.teamNumber || "";
    return (
      <div
        className="scouting-input-div text-5xl flex flex-col items-center justify-center"
        style={{ marginTop: "15%" }}
      >
        <span className="mb-4">{`Hey ${scoutName}!`}</span>
        <span className="mb-10">
          Click <span className="text-green-500">Start Match</span> to Start
          Scouting
        </span>
        <span>Match: {currentMatchString}</span>
        <span>
          Team:{" "}
          <span
            className={`${
              configData.selectedRobot.includes("red")
                ? "text-red-500"
                : "text-blue-500"
            }`}
          >
            {teamNumber}
          </span>
        </span>
      </div>
    );
  }
};

export default ScoutingInputDiv;
