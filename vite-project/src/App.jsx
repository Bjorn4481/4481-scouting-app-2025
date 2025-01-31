import React, { useState } from "react";
import MatchScouting from "./components/MatchScouting";
import QRCodeGenerator from "./components/QRCodeGenerator";
import QRCodeScanner from "./components/QRCodeScanner";

const App = () => {
  const [activeComponent, setActiveComponent] = useState("matchScouting");

  const renderComponent = () => {
    switch (activeComponent) {
      case "matchScouting":
        return <MatchScouting />;
      case "qrCodeGenerator":
        return <QRCodeGenerator />;
      case "qrCodeScanner":
        return <QRCodeScanner />;
      default:
        return <MatchScouting />;
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center">
      <h1 className="text-4xl text-gray-800 mb-4">FRC Scouting App 2025</h1>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setActiveComponent("matchScouting")} className="bg-blue-500 text-white px-4 py-2 rounded">Match Scouting</button>
        <button onClick={() => setActiveComponent("qrCodeGenerator")} className="bg-blue-500 text-white px-4 py-2 rounded">QR Code Generator</button>
        <button onClick={() => setActiveComponent("qrCodeScanner")} className="bg-blue-500 text-white px-4 py-2 rounded">QR Code Scanner</button>
      </div>
      {renderComponent()}
    </div>
  );
}

export default App;