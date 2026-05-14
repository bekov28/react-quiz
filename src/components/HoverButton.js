import React, { useEffect, useMemo } from "react";

export default function HoverButton({
  onClick,
  children,
  soundSrc,
  clickSoundSrc,
  classHandle,
  disabled,
}) {
  const hoverSound = useMemo(() => new Audio(soundSrc), [soundSrc]);

  const clickSound = useMemo(() => {
    const audio = new Audio(clickSoundSrc);

    if (clickSoundSrc.includes("select.mp3")) {
      audio.volume = 0.3;
    } else {
      audio.volume = 1.0;
    }

    return audio;
  }, [clickSoundSrc]);

  //Cleanup
  useEffect(() => {
    return () => {
      hoverSound.pause();
      //   hoverSound.src = "";
    };
  }, [hoverSound]);

  const handleHover = () => {
    if (disabled) return;

    hoverSound.currentTime = 0;
    hoverSound.play().catch((err) => {
      console.log("Playback failed:", err.message);
    });
  };

  const handleClick = (e) => {
    if (disabled) return;

    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    if (onClick) onClick(e);
  };

  return (
    <button
      onMouseEnter={handleHover}
      onClick={handleClick}
      className={`btn ${classHandle}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
