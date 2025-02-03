import React, { useState } from "react";
import QRCodeGenerator from "./QRCodeGenerator";

const SubBar = ({
  scoutingData,
  setScoutingData,
  configData,
  setConfigData,
  timer,
  setTimer,
  state,
  setState,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    if (state === "Ready") {
      setState("Start Match");
    }
    else if (state === "Start Match") {
      setState("auto");
    } 
    else if (state === "auto" || state === "teleop") {
      setIsDialogOpen(true);
      setState("Ready");
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const onNext = () => {
    handleCloseDialog();
    const currentMatchIndex = configData.matches.findIndex(
      (match) => match.matchString === scoutingData.matchString
    );
    const newIndex = currentMatchIndex === configData.matches.length - 1 
      ? currentMatchIndex 
      : currentMatchIndex + 1;
    setScoutingData({
      ...scoutingData,
      matchString: configData.matches[newIndex].matchString,
      teamNumber: configData.matches[newIndex][configData.selectedRobot],
    });
  };

  return (
    <div className="subbar h-18 flex items-center justify-around text-white border-t-2 border-white">
      <div className="flex items-center font-bold text-2xl border-r-2 border-white w-3/7 justify-center h-full">
        <button
          className={`${state=="auto" ? "bg-[#ff6600]" : "bg-[#111111]"} text-white font-bold py-2 px-4 h-full w-full`}
        >
          Auto
        </button>
      </div>
      <div className="flex items-center w-1/7 justify-center h-full">
        <button
          className={`${state=="Ready" ? "bg-green-500" : "bg-[#111111]"} text-white font-bold py-2 px-4 h-full w-full text-2xl`}
          onClick={handleButtonClick}
        >
          {state=="Ready" ? "Ready" : state=="Start Match" ? "Start Match" : state=="auto" || state=="teleop" ? "Get QR Code" : ""}
        </button>
      </div>
      <div className="flex items-center font-bold text-2xl border-l-2 border-white w-3/7 justify-center h-full">
        <button
          className={`${state=="teleop" ? "bg-[#ff6600]" : "bg-[#111111]"} text-white font-bold py-2 px-4 h-full w-full`}
        >
          Teleop
        </button>
      </div>

      {isDialogOpen && (
        <QRCodeGenerator
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onNext={onNext}
          scoutingData={scoutingData}
        />
      )}
    </div>
  );
};

export default SubBar;
