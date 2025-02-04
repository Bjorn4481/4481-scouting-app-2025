import React, { useState } from "react";
import TopBar from "./components/TopBar";
import SubBar from "./components/SubBar";
import ScoutingInputDiv from "./components/ScoutingInputDiv";

const App = () => {
  const [timer, setTimer] = useState(null);
  const [state, setState] = useState("Start Match");

  const [scoutingData, setScoutingData] = useState({
    scoutName: "",
    teamNumber: "",
    matchString: "",
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

  const [configData, setConfigData] = useState({
    selectedRobot: "red1",
    scouts: [{ name: "Bjorn" }, { name: "Feije" }, { name: "Gijs" }],
    matches: [
      {
        matchString: "Q1",
        blue1: "111",
        blue2: "4481",
        blue3: "4414",
        red1: "254",
        red2: "2910",
        red3: "118",
      },
      {
        matchString: "Q2",
        blue1: "604",
        blue2: "112",
        blue3: "114",
        red1: "5940",
        red2: "27",
        red3: "16",
      },
      {
        matchString: "Q3",
        blue1: "330",
        blue2: "125",
        blue3: "67",
        red1: "71",
        red2: "25",
        red3: "7333",
      },
    ],
  });

  return (
    <div className="bg-[#111111] min-h-screen flex flex-col">
      <div className="border-2 border-white rounded-lg">
        <TopBar
          scoutingData={scoutingData}
          setScoutingData={setScoutingData}
          configData={configData}
          setConfigData={setConfigData}
        />
        <SubBar
          scoutingData={scoutingData}
          setScoutingData={setScoutingData}
          configData={configData}
          setConfigData={setConfigData}
          timer={timer}
          setTimer={setTimer}
          state={state}
          setState={setState}
        />
      </div>
      <div className="flex-grow">
        <ScoutingInputDiv
          scoutingData={scoutingData}
          setScoutingData={setScoutingData}
          state={state}
          configData={configData}
        />
      </div>
    </div>
  );
};

export default App;
