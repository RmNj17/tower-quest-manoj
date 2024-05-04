import { useState, useEffect, useRef } from "react";
import DialogBox from "../../components/PopupModal";
import Floor from "../../components/Floor";
import Header from "../../components/Header";
import loseSound from "../../assets/lose.m4a";
import winSound from "../../assets/win.m4a";
import { toast } from "react-hot-toast";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [totalFloors, setTotalFloors] = useState(8);
  const [boxesPerFloor, setBoxesPerFloor] = useState(3);
  const [gameStatus, setGameStatus] = useState("playing");
  const [currentFloor, setCurrentFloor] = useState(1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [roundsToPlay, setRoundsToPlay] = useState(5);
  const [maxRounds, setMaxRounds] = useState(5);
  const [points, setPoints] = useState(50);
  const loseSoundRef = useRef(new Audio(loseSound));
  const winSoundRef = useRef(new Audio(winSound));

  useEffect(() => {
    let newTotalFloors = 8;
    let newBoxesPerFloor = 3;
    switch (difficultyLevel) {
      case "normal":
        newBoxesPerFloor = 4;
        break;
      case "medium":
        break;
      case "hard":
        break;
      case "impossible":
        newBoxesPerFloor = 4;
        break;
      default:
        break;
    }
    setTotalFloors(newTotalFloors);
    setBoxesPerFloor(newBoxesPerFloor);
  }, [difficultyLevel]);

  useEffect(() => {
    setMaxRounds(totalFloors - currentFloor + 1);
    if (roundsToPlay > totalFloors - currentFloor + 1) {
      setRoundsToPlay(totalFloors - currentFloor + 1);
    }
  }, [currentFloor, totalFloors]);

  useEffect(() => {
    if (gameStatus === "lost") {
      loseSoundRef.current.play();
      winSoundRef.current.pause();
      winSoundRef.current.currentTime = 0;
    } else if (gameStatus === "won") {
      winSoundRef.current.play();
      loseSoundRef.current.pause();
      loseSoundRef.current.currentTime = 0;
    } else {
      loseSoundRef.current.pause();
      loseSoundRef.current.currentTime = 0;
      winSoundRef.current.pause();
      winSoundRef.current.currentTime = 0;
    }
  }, [gameStatus]);

  useEffect(() => {
    if (autoPlay && roundsToPlay > 0 && gameStatus === "playing") {
      const timeout = setTimeout(() => {
        handleBoxClick(currentFloor - 1);
        setRoundsToPlay(roundsToPlay - 1);
        if (roundsToPlay === 1) {
          setAutoPlay(false);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [autoPlay, roundsToPlay, gameStatus, currentFloor]);

  const handleBoxClick = (floorIndex) => {
    if (gameStatus !== "playing" || floorIndex + 1 !== currentFloor) return;
    toast.dismiss();
    const gemProbability = {
      normal: 0.8,
      medium: 0.65,
      hard: 0.35,
      impossible: 0.1,
    }[difficultyLevel];

    const isGem = Math.random() < gemProbability;

    if (isGem) {
      if (currentFloor === totalFloors) {
        setGameStatus("won");
        setAutoPlay(false);
      } else {
        setCurrentFloor(currentFloor + 1);
        switch (difficultyLevel) {
          case "normal":
            toast("Good job!", {
              icon: "💎",
            });
            setBoxesPerFloor(4);
            setPoints(points + 5);
            break;
          case "medium":
            toast("Good job!", {
              icon: "💎",
            });
            setPoints(points + 10);
            break;
          case "hard":
            toast("Good job!", {
              icon: "💎",
            });
            setPoints(points + 30);
            break;
          case "impossible":
            toast("Good job!", {
              icon: "💎",
            });
            setBoxesPerFloor(4);
            setPoints(points + 50);
            break;
          default:
            break;
        }
      }
    } else {
      setPoints(points - 5);
      if (points - 5 <= 0) {
        setGameStatus("lost");
        setAutoPlay(false);
      } else {
        toast("Ops! That's a bomb", {
          icon: "💣",
        });
        setGameStatus("playing");
        setCurrentFloor(1);
        setAutoPlay(false);
        setRoundsToPlay(5);
      }
    }
  };

  const handleStartAutoPlay = () => {
    if (roundsToPlay > 0 && gameStatus === "playing") {
      setAutoPlay(true);
    }
  };

  const handleStopAutoPlay = () => {
    setAutoPlay(false);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleGameActivation = () => {
    const activationCost = 20;
    if (points >= activationCost) {
      setPoints(points - activationCost);
      setGameStarted(true);
    } else {
      alert("Not enough points to activate the game.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!gameStarted && (
        <DialogBox
          setDifficultyLevel={setDifficultyLevel}
          setGameStarted={handleGameActivation}
        />
      )}
      {gameStarted && (
        <>
          <Header difficultyLevel={difficultyLevel} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {Array.from({ length: totalFloors }).map(
              (_, floorIndex) =>
                gameStatus === "playing" && (
                  <Floor
                    key={floorIndex}
                    floorIndex={floorIndex}
                    currentFloor={currentFloor}
                    boxesPerFloor={boxesPerFloor}
                    handleBoxClick={handleBoxClick}
                  />
                )
            )}
          </div>
          {gameStatus === "won" && (
            <div className="text-xl text-green-600">
              Congratulations! You reached the top!
            </div>
          )}
          {gameStatus === "lost" && (
            <div className="text-xl text-red-600">
              Game Over! You lost all your points.
            </div>
          )}
          {gameStatus === "playing" && (
            <div className="flex flex-col gap-2 sm:flex-row justify-center items-center mt-4">
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
                max={maxRounds}
                value={roundsToPlay}
                onChange={(e) => setRoundsToPlay(parseInt(e.target.value))}
                className="ml-4 border-gray-300 rounded-md p-2 text-center w-20"
              />
              <span className="ml-2">rounds</span>
            </div>
          )}
          <div className="flex gap-4 mt-4">
            {!["playing"].includes(gameStatus) && (
              <button
                onClick={handleReload}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Restart again
              </button>
            )}
          </div>
          <div className="text-lg mt-3">Remaining Points: {points}</div>
        </>
      )}
    </div>
  );
};

export default Game;
