import React from "react";
import HoverButton from "./HoverButton";

export default function Start({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to BrainSync - React Quiz!</h2>
      <h3> {numQuestions} questions to test your React knowledge</h3>

      <HoverButton
        soundSrc="/sounds/hover.mp3"
        clickSoundSrc="/sounds/click.mp3"
        onClick={() => dispatch({ type: "start" })}
        classHandle="btn-ui"
      >
        Let's start!
      </HoverButton>
    </div>
  );
}
