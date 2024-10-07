import { useState, useEffect } from "react";

export function PausePlayButton({ play }: Readonly<{ play: React.MutableRefObject<boolean>; }>) {
  const [playState, setPlayState] = useState(play.current);

  useEffect(() => {
    play.current = playState;
  }, [play, playState]);
  return (
    <button onClick={() => setPlayState(!playState)}>{playState ? "pause" : "play"}</button>
  );
}
