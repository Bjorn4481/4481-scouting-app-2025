import React, { useState } from "react";
import QRCodeGenerator from "./QRCodeGenerator";

const SubBar = ({
  scoutingData,
  setScoutingData,
  configData,
  setConfigData,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
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
    });
  };

  return (
    <div className="subbar h-12 flex items-center justify-around text-white">
      <div>
        <span>Auto</span>
      </div>
      <div>
        <button
          className="bg-[#ff6600] hover:bg-black text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          Submit
        </button>
      </div>
      <div>
        <span>Teleop</span>
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
