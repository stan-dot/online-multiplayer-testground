"use client";

import { Canvas } from "@react-three/fiber";
import { MeshLambertMaterial, SphereGeometry } from "three";

export default function TicTacToe() {

  const red = new MeshLambertMaterial({ color: "red" })
  const sphere = new SphereGeometry(1, 28, 28)

  return <div id="canvas-container">
    <Canvas frameloop="demand">
      <mesh visible userData={{ hello: 'world' }} position={[10, 20, 30]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="hotpink" transparent />
      </mesh>
      <mesh geometry={sphere} material={red} />
      <mesh position={[1, 2, 3]} geometry={sphere} material={red} />
    </Canvas>

  </div>
}
