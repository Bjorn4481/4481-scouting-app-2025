import React, { useState } from "react";

const MatchScouting = () => {
  const [teamNumber, setTeamNumber] = useState("");
  const [matchNumber, setMatchNumber] = useState("");
  const [scoutingData, setScoutingData] = useState({
    score: 0,
    fouls: 0,
    comments: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in scoutingData) {
      setScoutingData({ ...scoutingData, [name]: value });
    } else {
      if (name === "teamNumber") setTeamNumber(value);
      if (name === "matchNumber") setMatchNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle data submission logic here
    console.log({ teamNumber, matchNumber, scoutingData });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Match Scouting</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Team Number:</label>
          <input
            type="text"
            name="teamNumber"
            value={teamNumber}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Match Number:</label>
          <input
            type="text"
            name="matchNumber"
            value={matchNumber}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Score:</label>
          <input
            type="number"
            name="score"
            value={scoutingData.score}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Fouls:</label>
          <input
            type="number"
            name="fouls"
            value={scoutingData.fouls}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Comments:</label>
          <textarea
            name="comments"
            value={scoutingData.comments}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MatchScouting;