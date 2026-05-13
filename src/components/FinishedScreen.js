import React from "react";

export default function FinishedScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage >= 90) emoji = "🏅";
  if (percentage >= 80 && percentage < 90) emoji = "😎";
  if (percentage >= 70 && percentage < 80) emoji = "☺️";
  if (percentage >= 50 && percentage < 70) emoji = "😏";
  if (percentage >= 0 && percentage < 50) emoji = "😔";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of <strong>{maxPoints}</strong>
        ! ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "retake" })}>
        Retake the test!
      </button>
    </>
  );
}
