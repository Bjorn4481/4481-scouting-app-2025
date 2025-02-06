import React, { useState, useEffect } from "react";
import QRCodeScanner from "./QRCodeScanner";
import Logo from "../assets/TR-Logo.png";

const TopBar = ({
  currentMatchString,
  setCurrentMatchString,
  scoutingData,
  setScoutingData,
  configData,
  setConfigData,
}) => {
  const [isScannerDialogOpen, setIsScannerDialogOpen] = useState(false);

  // Update scoutName of current match in scoutingData whenever the user changes
  const onUserChange = (e) => {
    // Update scoutName of current match in scoutingData
    setScoutingData((prev) => ({
      ...prev,
      matches: {
        ...prev.matches,
        [currentMatchString]: {
          ...prev.matches[currentMatchString],
          scoutName: e.target.value,
        },
      },
    }));
  };

  // Handle previous match button click
  const handlePrevMatch = () => {
    // get previous match from configData and setCurrentMatchString
    const currentMatchIndex = configData.matches.findIndex(
      (match) => match.matchString === currentMatchString
    );
    const newIndex = (currentMatchIndex - 1 + configData.matches.length) % configData.matches.length;
    setCurrentMatchString(configData.matches[newIndex].matchString);
  };
  
  // Handle next match button click
  const handleNextMatch = () => {
    // get next match from configData and setCurrentMatchString
    const currentMatchIndex = configData.matches.findIndex(
      (match) => match.matchString === currentMatchString
    );
    const newIndex = (currentMatchIndex + 1 + configData.matches.length) % configData.matches.length;
    setCurrentMatchString(configData.matches[newIndex].matchString);
  };

  // Update scoutingData whenever currentMatchString changes
  useEffect(() => {
    const selectElement = document.querySelector(".user-dropdown");
    if (selectElement) {
      // Update scoutName of current match in scoutingData only if it doesn't already exist
      setScoutingData((prev) => {
        const currentMatch = prev.matches[currentMatchString];
        if (!currentMatch || !currentMatch.scoutName) {
          return {
            ...prev,
            matches: {
              ...prev.matches,
              [currentMatchString]: {
                ...currentMatch,
                scoutName: selectElement.value,
                teamNumber: configData.matches.find(
                  (match) => match.matchString === currentMatchString
                )[configData.selectedRobot],
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
              },
            },
          };
        } else {
          // Set the value of the user-dropdown to the existing scoutName
          selectElement.value = currentMatch.scoutName;
        }
        return prev;
      });
    }
  }, [currentMatchString, scoutingData]);

  // Add long press event listener to the logo to open the QR code scanner dialog
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
          <span>{currentMatchString}</span>
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
            (match) => match.matchString === currentMatchString
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
            (match) => match.matchString === currentMatchString
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
            (match) => match.matchString === currentMatchString
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
            (match) => match.matchString === currentMatchString
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
            (match) => match.matchString === currentMatchString
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
            (match) => match.matchString === currentMatchString
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
              scoutingData={scoutingData}
              setScoutingData={setScoutingData}
              setIsScannerDialogOpen={setIsScannerDialogOpen}
            />
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 mx-auto block"
              onClick={() => {
                  setIsScannerDialogOpen(false);
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
