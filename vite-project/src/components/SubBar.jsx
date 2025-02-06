import React, { useState } from "react";
import QRCodeGenerator from "./QRCodeGenerator";

const SubBar = ({
  currentMatchString,
  setCurrentMatchString,
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
    if (state === "Start Match") {
      setState("auto");
    } else if (state === "auto" || state === "teleop") {
      setIsDialogOpen(true);
    }
  };
  

  const goToAuto = () => {
    setState("auto");
  };

  const goToTeleop = () => {
    setState("teleop");
  };

  const onClose = () => {
    setIsDialogOpen(false);
  };

  const onNext = () => {
    setState("Start Match");
    setIsDialogOpen(false);
    // get next match from configData and setCurrentMatchString
    const currentMatchIndex = configData.matches.findIndex(
      (match) => match.matchString === currentMatchString
    );
    const newIndex = (currentMatchIndex + 1 + configData.matches.length) % configData.matches.length;
    setCurrentMatchString(configData.matches[newIndex].matchString);
  };

  return (
    <div className="subbar h-18 flex items-center justify-around text-white border-t-2 border-white">
      <div className="flex items-center font-bold text-2xl border-r-2 border-white w-3/7 justify-center h-full">
        {state !== "Start Match" && (
          <button
            className={`${
              state === "auto" ? "bg-[#ff6600]" : "bg-[#111111]"
            } text-white font-bold py-2 px-4 h-full w-full flex items-center justify-center`}
            onClick={goToAuto}
          >
            Auto
          </button>
        )}
      </div>
      <div className="flex items-center w-1/7 justify-center h-full">
        <button
          className={`${
            state === "Start Match" ? "bg-green-500" : "bg-[#111111]"
          } text-white font-bold py-2 px-4 h-full w-full text-2xl flex items-center justify-center`}
          onClick={handleButtonClick}
        >
          {state === "Start Match"
            ? "Start Match"
            : state === "auto" || state === "teleop"
            ? "QR Code"
            : ""}
        </button>
      </div>
      <div className="flex items-center font-bold text-2xl border-l-2 border-white w-3/7 justify-center h-full">
        {state !== "Start Match" && (
          <button
            className={`${
              state === "teleop" ? "bg-[#ff6600]" : "bg-[#111111]"
            } text-white font-bold py-2 px-4 h-full w-full flex items-center justify-center`}
            onClick={goToTeleop}
          >
            Teleop
          </button>
        )}
      </div>

      {isDialogOpen && (
        <QRCodeGenerator
          isOpen={isDialogOpen}
          onClose={onClose}
          onNext={onNext}
          scoutingData={scoutingData}
        />
      )}
    </div>
  );
};

export default SubBar;
