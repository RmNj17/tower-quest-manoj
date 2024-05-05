import { useState, useEffect, useRef } from "react";
import DialogBox from "../../components/PopupModal";
import Floor from "../../components/Floor";
import Header from "../../components/Header";
import loseSound from "../../assets/lose.m4a";
import winSound from "../../assets/win.m4a";
import { toast } from "react-hot-toast";
import Footer from "../../components/Footer";
import AutoPlayControls from "../../components/Autoplay";
import Message from "../../components/Message";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [totalFloors, setTotalFloors] = useState(8);
  const [boxesPerFloor, setBoxesPerFloor] = useState(3);
  const [gameStatus, setGameStatus] = useState("playing");
  const [currentFloor, setCurrentFloor] = useState(1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [roundsToPlay, setRoundsToPlay] = useState(5);
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
        newBoxesPerFloor = 3;
        break;
      case "hard":
        newBoxesPerFloor = 3;
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

  const handleBoxClick = (floorIndex, boxValue) => {
    if (gameStatus !== "playing" || floorIndex + 1 !== currentFloor) return;
    toast.dismiss();

    if (boxValue === 1) {
      if (currentFloor === totalFloors) {
        setGameStatus("won");
        setAutoPlay(false);
      } else {
        setCurrentFloor(currentFloor + 1);
        switch (difficultyLevel) {
          case "normal":
            toast("You've found 💎");
            setBoxesPerFloor(4);
            setPoints(points + 10);
            break;
          case "medium":
            toast("You've found 💎");
            setBoxesPerFloor(3);
            setPoints(points + 10);
            break;
          case "hard":
            toast("You've found 💎");
            setBoxesPerFloor(3);
            setPoints(points + 5);
            break;
          case "impossible":
            toast("You've found 💎");
            setBoxesPerFloor(4);
            setPoints(points + 5);
            break;
          default:
            break;
        }
      }
    } else {
      setPoints(points - 15);
      if (points - 15 <= 0) {
        setGameStatus("lost");
        setAutoPlay(false);
      } else {
        toast("Ops! That's a bomb 😭", {
          icon: "💣",
        });
        setGameStatus("playing");
        setCurrentFloor(1);
        setRoundsToPlay(5);
      }
    }
  };

  useEffect(() => {
    if (autoPlay && roundsToPlay > 0 && gameStatus === "playing") {
      const timeout = setTimeout(() => {
        let boxValue;
        switch (difficultyLevel) {
          case "normal":
            boxValue = Math.random() < 0.95 ? 1 : 0;
            break;
          case "medium":
            boxValue = Math.random() < 0.75 ? 1 : 0;
            break;
          case "hard":
            boxValue = Math.random() < 0.55 ? 1 : 0;
            break;
          case "impossible":
            boxValue = Math.random() < 0.15 ? 1 : 0;
            break;
          default:
            boxValue = Math.random() < 0.5 ? 0 : 1;
            break;
        }
        handleBoxClick(currentFloor - 1, boxValue);
        setRoundsToPlay(roundsToPlay - 1);
        if (roundsToPlay === 1 || gameStatus !== "playing") {
          setAutoPlay(false);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [
    autoPlay,
    roundsToPlay,
    gameStatus,
    currentFloor,
    handleBoxClick,
    difficultyLevel,
  ]);

  const handleStartAutoPlay = () => {
    if (roundsToPlay > 0 && gameStatus === "playing") {
      setAutoPlay(true);
    }
  };

  const handleStopAutoPlay = () => {
    setAutoPlay(false);
  };

  const handleChangeDifficulty = () => {
    window.location.reload();
  };

  const handleRestart = () => {
    setGameStatus("playing");
    setCurrentFloor(1);
    setPoints(30);
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
        <div className="shadow-2xl p-6 rounded-lg">
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
                    difficulty={difficultyLevel}
                  />
                )
            )}
          </div>
          {gameStatus === "won" && (
            <div className="text-xl text-green-600">
              Congratulations! You've reached the top!
            </div>
          )}
          <Message gameStatus={gameStatus} difficultyLevel={difficultyLevel} />
          <AutoPlayControls
            handleStartAutoPlay={handleStartAutoPlay}
            handleStopAutoPlay={handleStopAutoPlay}
            roundsToPlay={roundsToPlay}
            setRoundsToPlay={setRoundsToPlay}
            autoPlay={autoPlay}
            gameStatus={gameStatus}
          />
          <Footer
            gameStatus={gameStatus}
            handleRestart={handleRestart}
            handleChangeDifficulty={handleChangeDifficulty}
            points={points}
            difficultyLevel={difficultyLevel}
          />
        </div>
      )}
    </div>
  );
};

export default Game;
