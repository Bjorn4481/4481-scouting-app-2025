import React, { useState } from "react";
import QRCode from "react-qr-code"; // Correct QR Code library

const QRCodeGenerator = () => {
  const [scoutingData, setScoutingData] = useState("");

  const handleChange = (e) => {
    setScoutingData(e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl mb-4">QR Code Generator</h2>
      <textarea
        className="border rounded p-2 mb-4 w-full max-w-md"
        rows="4"
        placeholder="Enter scouting data here..."
        value={scoutingData}
        onChange={handleChange}
      />
      {scoutingData && (
        <div className="p-4 bg-white rounded shadow">
          <QRCode value={scoutingData} size={256} />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
