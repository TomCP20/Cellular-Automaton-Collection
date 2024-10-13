import { Edges } from "@react-three/drei";
import { BoxGeometry } from "three";

export default function WireBox() {
  const box = new BoxGeometry();
  return <Edges lineWidth={2} scale={1} threshold={15} color="white" geometry={box} />;
}
