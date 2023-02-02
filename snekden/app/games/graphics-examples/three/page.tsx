"use client";
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { BufferGeometry, Line, LineBasicMaterial, Mesh, Scene, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => {
    // ref.current.rotation.y += delta/2;
    ref.current.rotation.x += delta;
  })
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 3.5 : 1}
      onClick={(event) => { click(!clicked) }}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


function Lines() {
  const material = new LineBasicMaterial({ color: 0x000f })
  const points = [
    new Vector3(-10, 0, 0),
    new Vector3(0, 10, 0),
    new Vector3(10, 0, 0),
  ];
  const geo = new BufferGeometry().setFromPoints(points);
  const loader = new GLTFLoader();
  const sc = new Scene();
  loader.load('../eared_seal_statuette', gltf => {

    sc.add(gltf.scene);
  }, undefined, error => console.error(error))

  return <mesh>
    {/* <Line args={geo, material} /> */}

  </mesh>
}


export default function ThreeExample() {
  return <Canvas>
    <ambientLight intensity={0.1} color={"red"} position={[0, 0, 5]} />
    <pointLight position={[10, 10, 10]} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas>
}

