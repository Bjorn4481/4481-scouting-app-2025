import React from "react";

const TopBar = ({ scoutingData, setScoutingData }) => {
  const onUserChange = (e) => {
    setScoutingData({
      ...scoutingData,
      scoutName: e.target.value,
    });
  };

  React.useEffect(() => {
    const selectElement = document.querySelector('.user-dropdown');
    if (selectElement) {
      setScoutingData({
        ...scoutingData,
        scoutName: selectElement.value,
      });
    }
  }, []);

  const handleLogoPress = () => {
    console.log("Logo pressed for more than 3 seconds");
    // Add your desired action here
  };

  React.useEffect(() => {
    let pressTimer;
    const logoElement = document.querySelector('.logo');

    const startPress = () => {
      pressTimer = setTimeout(handleLogoPress, 3000);
    };

    const cancelPress = () => {
      clearTimeout(pressTimer);
    };

    if (logoElement) {
      logoElement.addEventListener('mousedown', startPress);
      logoElement.addEventListener('mouseup', cancelPress);
      logoElement.addEventListener('mouseleave', cancelPress);
      logoElement.addEventListener('touchstart', startPress);
      logoElement.addEventListener('touchend', cancelPress);
    }

    return () => {
      if (logoElement) {
        logoElement.removeEventListener('mousedown', startPress);
        logoElement.removeEventListener('mouseup', cancelPress);
        logoElement.removeEventListener('mouseleave', cancelPress);
        logoElement.removeEventListener('touchstart', startPress);
        logoElement.removeEventListener('touchend', cancelPress);
      }
    };
  }, []);

  return (
    <div className="topbar flex items-center h-16 px-4">
      <div>
        <img src="/src/assets/TR-Logo.png" alt="TR Logo" className="logo h-12" />
      </div>
      <div className="ml-4">
        <select
          value={scoutingData.scoutName}
          onChange={onUserChange}
          className="user-dropdown text-white p-2 rounded"
        >
          <option value="Bjorn">Bjorn</option>
          <option value="Feije">Feije</option>
          <option value="Gijs">Gijs</option>
          {/* Add more users as needed */}
        </select>
      </div>
      <div className="info ml-auto text-white">
        <span>{scoutingData.matchString}</span>
      </div>
      <div className="info ml-4 text-white">
        <span>{scoutingData.teamNumber}</span>
      </div>
    </div>
  );
};

export default TopBar;
