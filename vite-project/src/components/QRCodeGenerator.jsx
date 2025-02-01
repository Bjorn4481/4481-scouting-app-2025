import React from "react";
import QRCode from "react-qr-code";

const QRCodeGenerator = ({ isOpen, onClose, scoutingData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white bg-opacity-90 p-8 rounded shadow-lg w-full max-w-xl h-2/3">
        <h2 className="text-2xl text-center text-black">
          QR Code: {scoutingData?.match} - {scoutingData?.team}
        </h2>
        {scoutingData && (
          <div className="p-4 bg-white bg-opacity-90 rounded flex justify-center">
            <QRCode value={JSON.stringify(scoutingData)} size={512} />
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="bg-red-500 text-white py-3 px-6 rounded hover:bg-red-700 text-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
