import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { IoIosInformationCircle } from "react-icons/io";
import { Tooltip } from "react-tooltip";
const dialogBox = () => {
  const [open, setOpen] = useState(true);
  const onCloseModal = () => setOpen(false);

  const setDifficultyLevel = (difficulty) => {
    localStorage.setItem("difficultyLevel", difficulty);
    onCloseModal();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        showCloseIcon={false}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          overlayAnimationIn: "customEnterOverlayAnimation",
          overlayAnimationOut: "customLeaveOverlayAnimation",
          modalAnimationIn: "customEnterModalAnimation",
          modalAnimationOut: "customLeaveModalAnimation",
        }}
      >
        <h2 className="text-lg text-[#00aeef] font-mono flex items-center justify-center gap-2">
          Hello there, Lets begin the{" "}
          <span className="font-bold font-mono">Tower Quest</span>{" "}
          <IoIosInformationCircle
            data-tooltip-id="my-tooltip"
            data-tooltip-variant="info"
            data-tooltip-content="Tower Quest features eight floors, each with a set number of boxes. Players begin at the bottom floor and select a box. If you uncover a gem, you advance to the next floor; if you reveal a bomb, the game ends. The goal is to ascend to the top floor by selecting gems
            while avoiding bombs.
            "
            size={20}
            className="cursor-pointer"
          />
        </h2>
        <p className="text-center my-3 text-black font-mono">
          Please choose the difficulty level
        </p>
        <div className="flex gap-4 justify-center font-mono">
          <button
            onClick={() => setDifficultyLevel("normal")}
            className="bg-blue-300 hover:bg-blue-400 text-white py-2 px-4 rounded"
          >
            Normal
          </button>
          <button
            onClick={() => setDifficultyLevel("medium")}
            className="bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
          >
            Medium
          </button>
          <button
            onClick={() => setDifficultyLevel("hard")}
            className="bg-red-300 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded"
          >
            Hard
          </button>
          <button
            onClick={() => setDifficultyLevel("impossible")}
            className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded"
          >
            Impossible
          </button>
        </div>
        <Tooltip id="my-tooltip" />
      </Modal>
    </div>
  );
};

export default dialogBox;
