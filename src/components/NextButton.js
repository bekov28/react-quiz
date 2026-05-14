import React from "react";
import HoverButton from "./HoverButton";

export default function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;
  if (index < numQuestions - 1) {
    return (
      <HoverButton
        soundSrc="/sounds/hover.mp3"
        clickSoundSrc="/sounds/click.mp3"
        onClick={() => dispatch({ type: "nextQuestion" })}
        classHandle="btn-ui"
      >
        Next
      </HoverButton>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <HoverButton
        soundSrc="/sounds/hover.mp3"
        clickSoundSrc="/sounds/click.mp3"
        onClick={() => dispatch({ type: "finish" })}
        classHandle="btn-ui"
      >
        Finish
      </HoverButton>
    );
  }
}
