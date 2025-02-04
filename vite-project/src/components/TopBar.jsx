import React, { useState, useEffect } from "react";
import QRCodeScanner from "./QRCodeScanner";
import Logo from "../assets/TR-Logo.png";

const TopBar = ({
  scoutingData,
  setScoutingData,
  configData,
  setConfigData,
}) => {
  const [isScannerDialogOpen, setIsScannerDialogOpen] = useState(false);

  const onUserChange = (e) => {
    setScoutingData({
      ...scoutingData,
      scoutName: e.target.value,
    });
  };

  const handlePrevMatch = () => {
    const currentMatchIndex = configData.matches.findIndex(
      (match) => match.matchString === scoutingData.matchString
    );
    const newIndex = (currentMatchIndex - 1 + configData.matches.length) % configData.matches.length;
    setScoutingData({
      ...scoutingData,
      matchString: configData.matches[newIndex].matchString,
      teamNumber: configData.matches[newIndex][configData.selectedRobot],
    });
  };

  const handleNextMatch = () => {
    const currentMatchIndex = configData.matches.findIndex(
      (match) => match.matchString === scoutingData.matchString
    );
    const newIndex = (currentMatchIndex + 1) % configData.matches.length;
    setScoutingData({
      ...scoutingData,
      matchString: configData.matches[newIndex].matchString,
      teamNumber: configData.matches[newIndex][configData.selectedRobot],
    });
  };

  useEffect(() => {
    const selectElement = document.querySelector(".user-dropdown");
    if (selectElement) {
      setScoutingData({
        ...scoutingData,
        scoutName: selectElement.value,
        matchString: configData.matches[0].matchString,
        teamNumber: configData.matches[0][configData.selectedRobot],
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
    <div className="topbar flex items-center h-16 px-4 p-2 m-1">
      <div>
        <img src={Logo} alt="TR Logo" className="logo h-12" />
      </div>
      <div className="ml-4 border border-white rounded-lg p-1">
        <select
          value={scoutingData.scoutName}
          onChange={onUserChange}
          className="user-dropdown text-white p-2 rounded bg-[#111111] text-lg"
        >
          {configData.scouts.map((scout) => (
            <option key={scout.name} value={scout.name}>
              {scout.name}
            </option>
          ))}
        </select>
      </div>
      <div className="info ml-auto flex border border-white rounded-lg">
        <div className="info text-white text-lg bg-[#ff6600] rounded-l-lg">
          <button
            className="info text-white text-lg p-2 bg-[#ff6600] rounded-l-lg"
            onClick={handlePrevMatch}
          >
            {"<"}
          </button>
        </div>
        <div className="info text-white text-lg p-2">
          <span>{scoutingData.matchString}</span>
        </div>
        <div className="info text-white text-lg bg-[#ff6600] rounded-r-lg">
          <button
            className="info text-white text-lg p-2 bg-[#ff6600] rounded-r-lg"
            onClick={handleNextMatch}
          >
            {">"}
          </button>
        </div>
      </div>
      <div
        className={`info text-white text-lg bg-red-500 p-2 ml-2 rounded-l-lg ${
          configData.selectedRobot === "red1" ? "font-bold" : "opacity-70"
        }`}
      >
        <span>
          {configData.matches.find(
            (match) => match.matchString === scoutingData.matchString
          )?.red1}
        </span>
      </div>
      <div
        className={`info text-white text-lg bg-red-500 p-2 ${
          configData.selectedRobot === "red2" ? "font-bold" : "opacity-70"
        }`}
      >
        <span>
          {configData.matches.find(
            (match) => match.matchString === scoutingData.matchString
          )?.red2}
        </span>
      </div>
      <div
        className={`info text-white text-lg bg-red-500 p-2 ${
          configData.selectedRobot === "red3" ? "font-bold" : "opacity-70"
        }`}
      >
        <span>
          {configData.matches.find(
            (match) => match.matchString === scoutingData.matchString
          )?.red3}
        </span>
      </div>
      <div
        className={`info text-white text-lg bg-blue-500 p-2 ${
          configData.selectedRobot === "blue1" ? "font-bold" : "opacity-70"
        }`}
      >
        <span>
          {configData.matches.find(
            (match) => match.matchString === scoutingData.matchString
          )?.blue1}
        </span>
      </div>
      <div
        className={`info text-white text-lg bg-blue-500 p-2 ${
          configData.selectedRobot === "blue2" ? "font-bold" : "opacity-70"
        }`}
      >
        <span>
          {configData.matches.find(
            (match) => match.matchString === scoutingData.matchString
          )?.blue2}
        </span>
      </div>
      <div
        className={`info text-white text-lg bg-blue-500 p-2 rounded-r-lg ${
          configData.selectedRobot === "blue3" ? "font-bold" : "opacity-70"
        }`}
      >
        <span>
          {configData.matches.find(
            (match) => match.matchString === scoutingData.matchString
          )?.blue3}
        </span>
      </div>

      {/* QR Code Scanner Dialog */}
      {isScannerDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <QRCodeScanner
              configData={configData}
              setConfigData={setConfigData}
              setIsScannerDialogOpen={setIsScannerDialogOpen}
            />
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 mx-auto block"
              onClick={() => {
                  setIsScannerDialogOpen(false)
                  scoutingData.matchString = configData.matches[0].matchString
                  scoutingData.teamNumber = configData.matches[0][configData.selectedRobot]
                  setScoutingData(scoutingData)
                }
              }
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
