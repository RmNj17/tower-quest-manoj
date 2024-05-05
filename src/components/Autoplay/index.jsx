const AutoPlayControls = ({
  handleStartAutoPlay,
  handleStopAutoPlay,
  roundsToPlay,
  setRoundsToPlay,
  autoPlay,
  gameStatus,
}) => {
  return (
    gameStatus === "playing" && (
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mt-5 -mb-4">
        <button
          onClick={handleStartAutoPlay}
          className={`bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded ${
            roundsToPlay > 0 && gameStatus === "playing"
              ? ""
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={roundsToPlay === 0 || gameStatus !== "playing"}
        >
          Start Auto-Play ({roundsToPlay ? roundsToPlay : ""} rounds left)
        </button>
        {autoPlay && (
          <button
            onClick={handleStopAutoPlay}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Stop Auto-Play
          </button>
        )}
        <input
          type="number"
          min="1"
          value={roundsToPlay}
          onChange={(e) => setRoundsToPlay(parseInt(e.target.value))}
          className="ml-4 border-gray-300 rounded-md p-2 text-center w-20"
        />
        <span className="ml-2">rounds</span>
      </div>
    )
  );
};

export default AutoPlayControls;
