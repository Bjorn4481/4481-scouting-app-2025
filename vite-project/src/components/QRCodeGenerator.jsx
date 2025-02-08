import React, { useState } from "react";
import QRCode from "react-qr-code";

const QRCodeGenerator = ({ 
  isOpen, 
  onClose, 
  onNext, 
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
  if (!isOpen) return null;
  const [isFinalData, setIsFinalData] = useState(false);

  const handleCommentsChange = (e) => {
    const newComments = e.target.value;
    setScoutingData((prevData) => ({
      ...prevData,
      matches: {
        ...prevData.matches,
        [currentMatchString]: {
          ...prevData.matches[currentMatchString],
          comments: newComments,
        },
      },
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white bg-opacity-90 p-8 rounded shadow-lg w-full max-w-xl h-2/3">
        {isFinalData === true ? (
          <div>
            <h2 className="text-2xl text-center text-black">
              QR Code: {scoutingData?.matchString} - {scoutingData?.teamNumber}
            </h2>
            {scoutingData && (
              <div className="p-3 bg-white bg-opacity-90 rounded flex justify-center">
                <QRCode value={JSON.stringify(scoutingData)} size={512} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl text-center text-black">Comments</h3>
            <textarea
              className="p-3 bg-white bg-opacity-90 rounded text-black border border-gray-300 resize-none"
              placeholder="Enter your comments here..."
              onChange={handleCommentsChange}
            />
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <button
            className="bg-red-500 text-white py-3 px-6 rounded hover:bg-red-700 text-lg w-1/2"
            onClick={() => {
              setIsFinalData(false);
              onClose();
            }}
          >
            Go back
          </button>
          <button
            className={`py-3 px-6 rounded text-lg w-1/2 ${
              isFinalData
                ? "bg-green-500 text-white hover:bg-green-700"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
            onClick={() => {
              if (isFinalData) {
                onNext();
              } else {
                setIsFinalData(true);
              }
            }}
          >
            {isFinalData ? "Next Match!" : "All Done!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
