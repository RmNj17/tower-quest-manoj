import React, { useEffect, useState } from "react";
import DialogBox from "../../components/Modal/dialogBox";
import { FaGift } from "react-icons/fa6";

const Game = () => {
  const colors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-orange-400",
    "bg-pink-400",
    "bg-indigo-400",
  ];
  const height = [
    "h-[200px]",
    "h-[220px]",
    "h-[250px]",
    "h-[290px]",
    "h-[340px]",
    "h-[400px]",
    "h-[470px]",
    "h-[550px]",
  ];

  const [difficultyLevel, setDifficultyLevel] = useState("");
  const storedDifficultyLevel = localStorage.getItem("difficultyLevel");
  useEffect(() => {
    console.log("Stored Difficulty Level:", storedDifficultyLevel);
    if (storedDifficultyLevel) {
      setDifficultyLevel(storedDifficultyLevel);
    }
  }, []);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const checkCollision = (boxes, currentBox) => {
    for (const box of boxes) {
      if (
        currentBox.left < box.right &&
        currentBox.right > box.left &&
        currentBox.top < box.bottom &&
        currentBox.bottom > box.top
      ) {
        return true;
      }
    }
    return false;
  };

  const getGiftBoxCount = () => {
    switch (difficultyLevel) {
      case "normal":
        return 4;
      case "medium":
        return 3;
      case "hard":
        return 3;
      case "impossible":
        return 3;
      default:
        return 4;
    }
  };

  return (
    <>
      <div className="flex justify-center items-end mt-8">
        {colors.map((color, index) => {
          const giftBoxes = [];
          const giftBoxCount = getGiftBoxCount();

          for (let i = 0; i < giftBoxCount; i++) {
            let validPosition = false;
            let attempts = 0;
            let randomX, randomY;

            while (!validPosition && attempts < 100) {
              randomX = getRandomNumber(20, 80);
              randomY = getRandomNumber(20, 80);

              const currentBox = {
                left: randomX,
                right: randomX + 10,
                top: randomY,
                bottom: randomY + 10,
              };

              validPosition = !checkCollision(giftBoxes, currentBox);
              attempts++;
            }

            if (validPosition) {
              giftBoxes.push({
                left: randomX,
                top: randomY,
              });
            }
          }

          return (
            <div key={index} className="mr-4">
              <div
                className={`w-[50px] sm:w-[70px] md:w-[90px] lg:w-[130px] ${height[index]} ${color} border-4 border-white rounded-xl overflow-hidden shadow-lg relative`}
              >
                {giftBoxes.map((box, idx) => (
                  <div
                    key={idx}
                    className="absolute flex justify-center items-center"
                    style={{ left: `${box.left}%`, top: `${box.top}%` }}
                  >
                    <FaGift key={idx} className="cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Game;
