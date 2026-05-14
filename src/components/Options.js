import React from "react";
import HoverButton from "./HoverButton";

export default function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <HoverButton
          classHandle={`btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""
          }`}
          key={option}
          soundSrc="/sounds/hover.mp3"
          clickSoundSrc="/sounds/select.mp3"
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </HoverButton>
      ))}
    </div>
  );
}
