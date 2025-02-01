import React from "react";
import Barge from "./Barge";
import Reef from "./Reef";

const ScoutingInputDiv = ({ scoutingData, setScoutingData }) => {
  return (
    <div className="scouting-input-div flex">
      <div className="flex-1">
        <Reef type="auto" scoutingData={scoutingData} setScoutingData={setScoutingData} />
      </div>
      <div className="flex-1">
        <Barge />
      </div>
    </div>
  );
};

export default ScoutingInputDiv;