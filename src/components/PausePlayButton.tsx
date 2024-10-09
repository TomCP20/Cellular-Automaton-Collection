import { useState, useEffect } from "react";
import { Button } from "./Button";

export function PausePlayButton({ play }: Readonly<{ play: React.MutableRefObject<boolean>; }>) {
  const [playState, setPlayState] = useState(play.current);

  useEffect(() => {
    play.current = playState;
  }, [play, playState]);
  return (
    <Button onClick={() => setPlayState(!playState)}>{playState ? "pause" : "play"}</Button>
  );
}
