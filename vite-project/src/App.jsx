import React, { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import SubBar from "./components/SubBar";
import ScoutingInputDiv from "./components/ScoutingInputDiv";

const App = () => {
  const [timer, setTimer] = useState(null);
  const [state, setState] = useState("Start Match");

  const initialConfigData = {
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
  };

  const initialScoutingData = {
    "matches": {
    }
  };

  const [configData, setConfigData] = useState(() => {
    const savedData = localStorage.getItem("configData");
    return savedData ? JSON.parse(savedData) : initialConfigData;
  });

  const [currentMatchString, setCurrentMatchString] = useState(() => {
    const savedData = localStorage.getItem("currentMatchString");
    return savedData ? savedData : initialConfigData.matches[0].matchString;
  });

  const [scoutingData, setScoutingData] = useState(() => {
    const savedData = localStorage.getItem("scoutingData");
    return savedData ? JSON.parse(savedData) : initialScoutingData;
  });

  // Save configData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("configData", JSON.stringify(configData));
  }, [configData]);

  // Save currentMatchString to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentMatchString", currentMatchString);
  }, [currentMatchString]);

  // Save scoutingData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("scoutingData", JSON.stringify(scoutingData));
  }, [scoutingData]);

  return (
    <div className="bg-[#111111] min-h-screen flex flex-col">
      <div className="border-2 border-white rounded-lg">
        <TopBar
          currentMatchString={currentMatchString}
          setCurrentMatchString={setCurrentMatchString}
          scoutingData={scoutingData}
          setScoutingData={setScoutingData}
          configData={configData}
          setConfigData={setConfigData}
        />
        <SubBar
          currentMatchString={currentMatchString}
          setCurrentMatchString={setCurrentMatchString}
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
          currentMatchString={currentMatchString}
          setCurrentMatchString={setCurrentMatchString}
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
