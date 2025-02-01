import React, { useState } from "react";
import QRCodeGenerator from "./components/QRCodeGenerator";
import QRCodeScanner from "./components/QRCodeScanner";
import TopBar from "./components/TopBar";
import SubBar from "./components/SubBar";
import ScoutingInputDiv from "./components/ScoutingInputDiv";

const App = () => {
  const [scoutingData, setScoutingData] = useState({
    scoutName: "",
    teamNumber: "4481",
    matchString: "Q1",
    auto: {
      L4: 0,
      L3: 0,
      L2: 0,
      L1: 0,
      Net: 0,
      Remove: 0,
      Processor: 0,
    },
    teleop: {
      L4: 0,
      L3: 0,
      L2: 0,
      L1: 0,
      Net: 0,
      Remove: 0,
      Processor: 0,
    },
    comments: "",
  });

  return (
    <div className="bg-[#111111] min-h-screen flex flex-col">
      <TopBar scoutingData={scoutingData} setScoutingData={setScoutingData}/>
      <SubBar scoutingData={scoutingData} setScoutingData={setScoutingData}/>
      <div className="flex-grow">
        <ScoutingInputDiv scoutingData={scoutingData} setScoutingData={setScoutingData} />
      </div>
    </div>
  );
}

export default App;