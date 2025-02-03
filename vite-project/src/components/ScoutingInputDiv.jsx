import React from "react";
import Barge from "./Barge";
import Reef from "./Reef";

const ScoutingInputDiv = ({ scoutingData, setScoutingData, state, configData }) => {
  if (state === "auto" || state === "teleop") {
    return (
      <div className="scouting-input-div flex">
        <div className="flex-1">
          <Reef
            type={state}
            scoutingData={scoutingData}
            setScoutingData={setScoutingData}
          />
        </div>
        <div className="flex-1">
          <Barge
            type={state}
            scoutingData={scoutingData}
            setScoutingData={setScoutingData}
          />
        </div>
      </div>
    );
  } else if (state === "Ready") {
    return (
      <div className="scouting-input-div text-5xl flex flex-col items-center justify-center" style={{ marginTop: '15%' }}>
      <span className="mb-4">{`Hey ${scoutingData.scoutName}!`}</span>
      <span className="mb-10">Click <span className="text-green-500">Ready</span> to Start Scouting</span>
      <span>Match: {scoutingData.matchString}</span>
      <span>Team: <span className={`${configData.selectedRobot.includes("red") ? "text-red-500" : "text-blue-500"}`}>{scoutingData.teamNumber}</span></span>
      </div>
    );
  }
};

export default ScoutingInputDiv;
