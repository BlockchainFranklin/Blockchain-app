import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Sphere from "../components/Sphere";

export default function Blob() {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
        <Sphere />
      </Canvas>
    </div>
  );
}