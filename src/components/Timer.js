import { useEffect } from "react";

export default function Timer({ dispatch, timeRemaining }) {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id); //clearing the interval to prevent memory leak
  }, [dispatch]);

  return <div className="timer">{timeRemaining}</div>;
}
