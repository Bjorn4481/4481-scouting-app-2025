import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const QRCodeScanner = ({configData, setConfigData, scoutingData, setScoutingData, setIsScannerDialogOpen}) => {
    const [scannedData, setScannedData] = useState("");

    // Handle QR code from camera
    const handleCameraScan = (result) => {
        if (Array.isArray(result) && result.length > 0 && result[0]?.rawValue) {
            const extractedData = result[0].rawValue; // Extract the rawValue from the first result
            saveData(extractedData);
            setScannedData(extractedData);
            setIsScannerDialogOpen(false);
            setScoutingData({
                "matches": {
                }
              });
        }
    };

    // Temporary bypass for testing without scanning QR code
    const handleTestButtonClick = () => {
        const testData = JSON.stringify({
            selectedRobot: "blue1",
            scouts: [
                { name: "Bjorn" },
                { name: "Feije" },
                { name: "Gijs" },
                { name: "Jesse" },
                { name: "Joris" },
                { name: "Koen" },
                { name: "Lars" },
            ],
            matches: [
                { matchString: "Q1", blue1: "330", blue2: "125", blue3: "67", red1: "71", red2: "25", red3: "7333" },
                { matchString: "Q2", blue1: "108", blue2: "971", blue3: "321", red1: "610", red2: "2056", red3: "1114" },
            ],
        });
        saveData(testData);
        setScannedData(testData);
        setIsScannerDialogOpen(false);
        setScoutingData({
            "matches": {
            }
          });
    };

    // Save the scanned data to the configData
    const saveData = (extractedData) => {
        const data = JSON.parse(extractedData);
        setConfigData(data);
    };

    // Handle errors from camera scanner
    const handleCameraError = (error) => {
        console.error("Camera Scanner Error:", error);
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className={`text-2xl mb-4 text-black`}>Scan Config QR Code</h2>

            {/* Show camera scanner */}
            <Scanner onScan={handleCameraScan} onError={handleCameraError} allowMultiple={true} scanDelay={4481} />
            <button onClick={handleTestButtonClick} className="bg-green-500 text-white py-3 px-6 rounded hover:bg-green-700 text-lg w-1/2">
                <span className="text-sm">Test</span>
            </button>
        </div>
    );
};

export default QRCodeScanner;
