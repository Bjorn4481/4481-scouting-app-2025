import React, { useState } from "react";
import QRCodeGenerator from "./QRCodeGenerator";

const SubBar = ({scoutingData, setScoutingData}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
        <QRCodeGenerator isOpen={isDialogOpen} onClose={handleCloseDialog} scoutingData={scoutingData}/>
      )}
    </div>
  );
};

export default SubBar;
