import React, { useEffect } from "react";
import HoverButton from "./HoverButton";

export default function FinishedScreen({ points, maxPoints, highscore, dispatch }) {
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  useEffect(() => {
    if (points > 0 && points >= highscore) {
      console.log("Updating highscore on server...");
      fetch(`${BASE_URL}/highscore/1`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: points,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to update highscore");
          console.log("Highscore saved successfully!");
        })
        .catch((err) => console.error(err.message));
    }
  }, [points, highscore, BASE_URL]);

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
      <HoverButton
        classHandle="btn-ui"
        soundSrc="/sounds/hover.mp3"
        clickSoundSrc="/sounds/click.mp3"
        onClick={() => dispatch({ type: "retake" })}
      >
        Retake the test!
      </HoverButton>
      <div className="container">
        <h3>Emoji per achivement!</h3>
        <p> 🏅 - If you collect between 90% ~ 100%</p>
        <p> 😎 - If you collect between 80% ~ 90%</p>
        <p> ☺️ - If you collect between 70% ~ 80%</p>
        <p> 😏 - If you collect between 50% ~ 70%</p>
        <p> 😔 - If you collect less than 50%</p>
      </div>
    </>
  );
}
