import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const QRCodeScanner = () => {
    const [scannedData, setScannedData] = useState("");
    const [isScanned, setIsScanned] = useState(false);

    // Handle QR code from camera
    const handleCameraScan = (result) => {
        if (Array.isArray(result) && result.length > 0 && result[0]?.rawValue) {
            const extractedData = result[0].rawValue; // Extract the rawValue from the first result
            console.log("Scanned (Camera):", extractedData);
            setScannedData(extractedData);
            setIsScanned(true);
            setTimeout(() => setIsScanned(false), 2000); // Reset visual cue after 2 seconds
        }
    };

    // Handle errors from camera scanner
    const handleCameraError = (error) => {
        console.error("Camera Scanner Error:", error);
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-2xl mb-4">QR Code Scanner</h2>

            {/* Show camera scanner */}
            <Scanner onScan={handleCameraScan} onError={handleCameraError} allowMultiple={true} scanDelay={4481} />

            {/* Display scanned QR code with visual cue */}
            {scannedData && (
                <p className={`mt-4 p-2 ${isScanned ? 'bg-green-200' : ''} text-black`}>
                    Scanned Data: {scannedData}
                </p>
            )}
        </div>
    );
};

export default QRCodeScanner;
