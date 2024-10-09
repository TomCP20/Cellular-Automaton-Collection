import { useState, useEffect } from "react";
import { Button } from "./Button";
import { SizeDropdown } from "./SizeDropdown";
import World from "../World";

export function GameOfLifeUI({ play, world, step }: Readonly<{ play: React.MutableRefObject<boolean>; world: React.MutableRefObject<World>; step: React.MutableRefObject<boolean>; }>) {
  const [playState, setPlayState] = useState(false);
  useEffect(() => {
    play.current = playState;
  }, [play, playState]);

  const [size, setSize] = useState(world.current.size);
  useEffect(() => {
    world.current = new World(size);
  }, [size, world]);
  return (
    <>
      <Button onClick={() => setPlayState(!playState)}>{playState ? "pause" : "play"}</Button><br />
      <Button onClick={() => step.current = true} disabled={playState}>step</Button><br />
      <Button onClick={() => world.current.Noise()}>noise</Button><br />
      <Button onClick={() => world.current.Clear()}>clear</Button><br />
      <SizeDropdown size={size} setSize={setSize} />
    </>
  );
}
