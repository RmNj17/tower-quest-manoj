const Message = ({ gameStatus, difficultyLevel }) => {
  if (gameStatus === "won") {
    switch (difficultyLevel) {
      case "impossible":
        return (
          <div className="text-sm font-extrabold text-green-600">
            Wow! Only 1% players have completed this level
          </div>
        );
      case "hard":
        return (
          <div className="text-sm font-extrabold text-green-600">
            Wow! Only 5% players have completed this level
          </div>
        );
      case "medium":
        return (
          <div className="text-sm font-extrabold text-green-600">
            You have been listed in the top 50% players who have completed this
            level
          </div>
        );
      case "normal":
        return (
          <div className="text-sm text-center font-extrabold text-green-600">
            Too easy? Try by changing the difficulty level 😎
          </div>
        );
      default:
        break;
    }
  } else if (gameStatus === "lost") {
    return (
      <div className="text-xl text-red-600">
        Game Over! You lost all your points.
      </div>
    );
  }
  return null;
};

export default Message;
