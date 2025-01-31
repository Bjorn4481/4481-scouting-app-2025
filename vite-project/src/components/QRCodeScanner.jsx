import React, { useState, useEffect } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const QRCodeScanner = () => {
    const [mode, setMode] = useState("camera"); // "camera" or "physical"
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

    // Handle QR code from physical scanner (listens for keyboard input)
    useEffect(() => {
        if (mode === "physical") {
            const handleKeyPress = (event) => {
                if (event.key === "Enter" && scannedData) {
                    console.log("Scanned (Physical):", scannedData);
                    setIsScanned(true);
                    setTimeout(() => setIsScanned(false), 2000); // Reset visual cue after 2 seconds
                }
            };
            window.addEventListener("keydown", handleKeyPress);
            return () => {
                window.removeEventListener("keydown", handleKeyPress);
            };
        }
    }, [mode, scannedData]);

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-2xl mb-4">QR Code Scanner</h2>

            {/* Toggle Button */}
            <button
                onClick={() => setMode(mode === "camera" ? "physical" : "camera")}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Switch to {mode === "camera" ? "Physical Scanner" : "Camera Scanner"}
            </button>

            {/* Show camera scanner if mode is 'camera' */}
            {mode === "camera" && (
                <Scanner onScan={handleCameraScan} onError={handleCameraError} allowMultiple={true} scanDelay={4481} />
            )}

            {/* Show input field for physical scanner if mode is 'physical' */}
            {mode === "physical" && (
                <input
                    type="text"
                    className="border rounded p-2 w-full max-w-md"
                    placeholder="Scan QR Code here..."
                    value={scannedData}
                    onChange={(e) => setScannedData(e.target.value)}
                    autoFocus
                />
            )}

            {/* Display scanned QR code with visual cue */}
            {scannedData && (
                <p className={`mt-4 p-2 ${isScanned ? 'bg-green-200' : ''}`}>
                    Scanned Data: {scannedData}
                </p>
            )}
        </div>
    );
};

export default QRCodeScanner;