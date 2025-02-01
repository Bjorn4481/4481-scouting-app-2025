import React, { useState, useEffect } from "react";
import QRCodeScanner from "./QRCodeScanner";

const TopBar = ({ scoutingData, setScoutingData }) => {
  const [isScannerDialogOpen, setIsScannerDialogOpen] = useState(false);

  const onUserChange = (e) => {
    setScoutingData({
      ...scoutingData,
      scoutName: e.target.value,
    });
  };

  useEffect(() => {
    const selectElement = document.querySelector(".user-dropdown");
    if (selectElement) {
      setScoutingData({
        ...scoutingData,
        scoutName: selectElement.value,
      });
    }
  }, []);

  useEffect(() => {
    let pressTimer;
    const logoElement = document.querySelector(".logo");

    const startPress = () => {
      pressTimer = setTimeout(() => {
        setIsScannerDialogOpen(true); // Show the scanner dialog
      }, 3000);
    };

    const cancelPress = () => {
      clearTimeout(pressTimer);
    };

    if (logoElement) {
      logoElement.addEventListener("mousedown", startPress);
      logoElement.addEventListener("mouseup", cancelPress);
      logoElement.addEventListener("mouseleave", cancelPress);
      logoElement.addEventListener("touchstart", startPress);
      logoElement.addEventListener("touchend", cancelPress);
    }

    return () => {
      if (logoElement) {
        logoElement.removeEventListener("mousedown", startPress);
        logoElement.removeEventListener("mouseup", cancelPress);
        logoElement.removeEventListener("mouseleave", cancelPress);
        logoElement.removeEventListener("touchstart", startPress);
        logoElement.removeEventListener("touchend", cancelPress);
      }
    };
  }, []);

  return (
    <div className="topbar flex items-center h-16 px-4 border border-white rounded-lg p-2 m-1">
      <div>
        <img
          src="/src/assets/TR-Logo.png"
          alt="TR Logo"
          className="logo h-12"
        />
      </div>
      <div className="ml-4 border border-white rounded-lg p-1">
        <select
          value={scoutingData.scoutName}
          onChange={onUserChange}
          className="user-dropdown text-white p-2 rounded bg-[#111111] text-lg"
        >
          <option value="Bjorn">Bjorn</option>
          <option value="Feije">Feije</option>
          <option value="Gijs">Gijs</option>
        </select>
      </div>
      <div className="info ml-auto text-white text-lg ">
        <span>{scoutingData.matchString}</span>
      </div>
      <div className="info text-white text-lg bg-red-500 p-2 ml-2 rounded-l-lg opacity-70">
        <span>{scoutingData.teamNumber}</span>
      </div>
      <div className="info text-white text-lg bg-red-500 p-2 opacity-70">
        <span>{scoutingData.teamNumber}</span>
      </div>
      <div className="info text-white text-lg bg-red-500 p-2 font-bold">
        <span>{scoutingData.teamNumber}</span>
      </div>
      <div className="info text-white text-lg bg-blue-500 p-2 opacity-70">
        <span>{scoutingData.teamNumber}</span>
      </div>
      <div className="info text-white text-lg bg-blue-500 p-2 opacity-70">
        <span>{scoutingData.teamNumber}</span>
      </div>
      <div className="info text-white text-lg bg-blue-500 p-2 rounded-r-lg opacity-70">
        <span>{scoutingData.teamNumber}</span>
      </div>

      {/* QR Code Scanner Dialog */}
      {isScannerDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <QRCodeScanner />
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 mx-auto block"
              onClick={() => setIsScannerDialogOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
