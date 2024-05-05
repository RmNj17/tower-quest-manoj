import React, { useState, useEffect } from "react";
import { FaGem, FaBomb, FaGift } from "react-icons/fa";
import SuccessSound from "../../assets/success.m4a";
import BombSound from "../../assets/bomb.m4a";

const Floor = ({
  floorIndex,
  currentFloor,
  boxesPerFloor,
  handleBoxClick,
  difficulty,
}) => {
  const [boxIndices, setBoxIndices] = useState([]);
  const [initialRandomization, setInitialRandomization] = useState(false);
  const [bombSelected, setBombSelected] = useState(false);
  const [chosenBoxes, setChosenBoxes] = useState(
    Array(boxesPerFloor).fill(false)
  );

  useEffect(() => {
    const randomizeBoxIndices = () => {
      const randomizedIndices = Array.from(
        { length: boxesPerFloor },
        (_, index) => index
      );
      for (let i = randomizedIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomizedIndices[i], randomizedIndices[j]] = [
          randomizedIndices[j],
          randomizedIndices[i],
        ];
      }
      setBoxIndices(randomizedIndices);
    };

    if (!initialRandomization || currentFloor === 1 || bombSelected) {
      randomizeBoxIndices();
      setInitialRandomization(true);
      setBombSelected(false);
      setChosenBoxes(Array(boxesPerFloor).fill(false));
    }
  }, [boxesPerFloor, currentFloor, initialRandomization, bombSelected]);

  useEffect(() => {
    if (currentFloor > floorIndex + 1) {
      const audio = new Audio(SuccessSound);
      audio.play();
    }
  }, [currentFloor, floorIndex]);

  useEffect(() => {
    if (bombSelected) {
      const audio = new Audio(BombSound);
      audio.play();
    }
  }, [bombSelected]);

  let numGems, numBombs;

  switch (difficulty) {
    case "normal":
      numGems = 3;
      numBombs = 1;
      break;
    case "medium":
      numGems = 2;
      numBombs = 1;
      break;
    case "hard":
      numGems = 1;
      numBombs = 2;
      break;
    case "impossible":
      numGems = 1;
      numBombs = 3;
      break;
    default:
      numGems = 0;
      numBombs = 0;
  }

  const handleClick = (boxIndex, boxValue) => {
    if (boxValue === 0) {
      setBombSelected(true);
    }
    handleBoxClick(floorIndex, boxValue);
    const updatedChosenBoxes = [...chosenBoxes];
    updatedChosenBoxes[boxIndex] = true;
    setChosenBoxes(updatedChosenBoxes);
  };

  return (
    <div className="flex items-center shadow-2xl rounded-lg transition-all duration-300">
      <div className="text-xs mb-2 mx-2 mt-4">Floor {floorIndex + 1}</div>
      {boxIndices.map((boxIndex) => {
        let boxValue = 0;

        if (boxIndex < numGems) {
          boxValue = 1;
        }

        let content = (
          <FaGift size={22} className="text-rose-500 cursor-pointer" />
        );
        if (boxValue === 0) {
          content = <FaBomb size={22} className="text-black" />;
        } else if (boxValue === 1) {
          content = <FaGem size={22} className="text-sky-500" />;
        }

        return (
          <div
            key={boxIndex}
            className={`w-16 h-20 flex items-center justify-center bg-gray-200 ${
              currentFloor === floorIndex + 1
                ? "border-b-4  bg-gray-950 transform shadow-md cursor-pointer"
                : currentFloor > floorIndex + 1
                ? "bg-green-300 transform rotate-0"
                : "opacity-50"
            } transition-all duration-100`}
            onClick={
              currentFloor === floorIndex + 1
                ? () => handleClick(boxIndex, boxValue)
                : null
            }
          >
            {chosenBoxes[boxIndex] || currentFloor > floorIndex + 1 ? (
              content
            ) : (
              <FaGift size={22} className="text-rose-500 cursor-pointer" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Floor;
