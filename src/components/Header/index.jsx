import logo from "../../assets/icon.png";
import { IoIosInformationCircle } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { Tooltip } from "react-tooltip";

const Header = ({ difficultyLevel }) => (
  <>
    <Tooltip id="my-tooltip" />
    <div className="text-4xl mb-4 text-green-600 flex items-center justify-center mt-10">
      <img loading="lazy" src={logo} width={70} alt="Logo" />
      <h1 className="mt-8">Tower Quest</h1>
      <IoIosInformationCircle
        data-tooltip-id="my-tooltip"
        data-tooltip-variant="info"
        data-tooltip-content="Tower Quest features eight floors, each with a set number of boxes. Players begin at the  floor 1 and select a box. If you uncover a gem, you advance to the next floor; if you reveal a bomb, the game resets to the beginning until your points become zero. The goal is to ascend to the top floor by selecting gems while avoiding bombs."
        size={20}
        className="cursor-pointer"
      />
    </div>
    {difficultyLevel && (
      <div className="text-sm mb-4 flex items-center justify-center gap-2">
        Difficulty Level:{" "}
        {difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)}
        <CiCircleQuestion
          data-tooltip-id="my-tooltip"
          data-tooltip-variant="info"
          data-tooltip-content={
            difficultyLevel === "normal"
              ? " 4 boxes (1 bomb, 3 gems) "
              : difficultyLevel === "medium"
              ? "3 boxes (1 bomb, 2 gems)"
              : difficultyLevel === "hard"
              ? "3 boxes (1 gem, 2 bombs)"
              : difficultyLevel === "impossible"
              ? "4 boxes (1 gem, 3 bombs)"
              : ""
          }
          size={16}
          className="cursor-pointer"
        />
      </div>
    )}
  </>
);

export default Header;
