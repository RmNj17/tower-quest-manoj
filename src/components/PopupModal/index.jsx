import { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { IoIosInformationCircle } from "react-icons/io";
import { Tooltip } from "react-tooltip";

const DialogBox = ({ setDifficultyLevel, setGameStarted }) => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onCloseModal = () => {
    setOpen(false);
    setGameStarted(true);
  };

  const handleDifficultyLevelSelect = (difficulty) => {
    setDifficultyLevel(difficulty);
    onCloseModal();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        closeOnOverlayClick={false}
        showCloseIcon={false}
        closeOnEsc={false}
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          overlayAnimationIn: "customEnterOverlayAnimation",
          overlayAnimationOut: "customLeaveOverlayAnimation",
          modalAnimationIn: "customEnterModalAnimation",
          modalAnimationOut: "customLeaveModalAnimation",
        }}
        styles={{
          modal: {
            width: "auto",
            maxWidth: isMobile ? "unset" : "500px",
          },
        }}
      >
        <h2 className="text-lg text-[#00aeef] font-mono flex items-center justify-center gap-2 flex-col md:flex-row lg:flex-row">
          <span className="text-center">Hello there, Lets begin to play</span>{" "}
          <span className="font-bold font-mono">Tower Quest</span>{" "}
          <IoIosInformationCircle
            data-tooltip-id="my-tooltip"
            data-tooltip-variant="info"
            data-tooltip-content="Tower Quest features eight floors, each with a set number of boxes. Players begin at the  floor 1 and select a box. If you uncover a gem, you advance to the next floor; if you reveal a bomb, the game resets to the beginning until your points become zero. The goal is to ascend to the top floor by selecting gems while avoiding bombs."
            size={20}
            className="cursor-pointer"
          />
        </h2>
        <p className="text-center my-3 text-black font-mono italic text-xs font-bold">
          You have 50 points out of which 20 points will be deducted to activate
          the game.
        </p>
        <p className="text-center my-3 text-black font-mono">
          Please choose the difficulty level
        </p>
        <div className="flex flex-wrap justify-center font-mono flex-col md:flex-row lg:flex-row">
          <button
            onClick={() => handleDifficultyLevelSelect("normal")}
            className="bg-blue-300 hover:bg-blue-400 text-white py-2 px-4 rounded m-2"
          >
            Normal
          </button>
          <button
            onClick={() => handleDifficultyLevelSelect("medium")}
            className="bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded m-2"
          >
            Medium
          </button>
          <button
            onClick={() => handleDifficultyLevelSelect("hard")}
            className="bg-red-300 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded m-2"
          >
            Hard
          </button>
          <button
            onClick={() => handleDifficultyLevelSelect("impossible")}
            className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded m-2"
          >
            Impossible
          </button>
        </div>
        <Tooltip id="my-tooltip" />
      </Modal>
    </div>
  );
};

export default DialogBox;
