import { FaGift } from "react-icons/fa";

const Floor = ({ floorIndex, currentFloor, boxesPerFloor, handleBoxClick }) => (
  <div className="flex items-center shadow-2xl rounded-lg ">
    <div className="text-xs mb-2 mx-2 mt-4">Floor {floorIndex + 1}</div>
    {Array.from({ length: boxesPerFloor }).map((_, boxIndex) => (
      <div
        key={boxIndex}
        className={`w-16 h-20 flex items-center justify-center bg-gray-200 ${
          currentFloor === floorIndex + 1
            ? "border-b-4 border-black bg-[#000000]"
            : currentFloor > floorIndex + 1
            ? "bg-[#6FD08C]"
            : ""
        }`}
      >
        <FaGift
          onClick={() => handleBoxClick(floorIndex)}
          size={22}
          className="cursor-pointer hover:text-green-600 text-rose-500"
        />
      </div>
    ))}
  </div>
);

export default Floor;
