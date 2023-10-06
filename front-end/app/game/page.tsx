"use client";

import { Canvas } from "@react-three/fiber";
import React, { useRef, useState, useEffect } from "react";
import {
  ContactShadows,
  Sky,
  SoftShadows,
  Html,
  Stats,
  TrackballControls,
  useHelper,
  OrbitControls,
  RoundedBox,
  MeshWobbleMaterial,
  Stars,
  Sparkles,
  Outlines,
  Effects
} from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import * as THREE from "three";

const Game = () => {
	const naturemodel = useLoader(
	GLTFLoader,
	"/Game_Assets/models/naturescene/naturescene.glb"
	);
	useEffect(() => {
	const object = naturemodel.scene as THREE.Object3D;
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
		child.castShadow = true;
		child.receiveShadow = true;
		}
	});
	}, [naturemodel]);

	const siderock = useLoader(
	GLTFLoader,
	"/Game_Assets//models/bigrock/bigrock.glb"
	);
	useEffect(() => {
	const object = siderock.scene as THREE.Object3D;
	object.traverse((child) => {
		if (child instanceof THREE.Mesh) {
		child.castShadow = true;
		child.receiveShadow = true;
		}
	});
	}, [siderock]);
  const siderock2 = siderock.scene.clone();
  const controls = useControls({});
  const { sunPosition } = useControls("sky", {
	sunPosition: [-0.07, -0.03, -0.75],
  });
  const { planecolor } = useControls("color", { planecolor: "#51b151" });
  const { floorcolor } = useControls("color", { floorcolor: "#1572ff" });
  const { paddlecolor } = useControls("color", { paddlecolor: "#abebff" });
  const { fogcolor } = useControls("color", { fogcolor: "#382f21" });
  // const { Groundcolor } = useControls('color', {color: "#147114"})

  // Keyboard Controls
  const boxRef = useRef<THREE.Mesh>();

  useEffect(() => {
    const box = boxRef.current;
    let isMovingLeft = false;
    let isMovingRight = false;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "ArrowLeft") {
        isMovingLeft = true;
      } else if (event.code === "ArrowRight") {
        isMovingRight = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "ArrowLeft") {
        isMovingLeft = false;
      } else if (event.code === "ArrowRight") {
        isMovingRight = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const updatePosition = () => {
      if (box) {
        if (isMovingLeft) {
		  box.position.x = Math.max(box.position.x - 0.2, -4.5);
        } else if (isMovingRight) {
	      box.position.x = Math.min(box.position.x + 0.2, 4.5);
        }
      }

      requestAnimationFrame(updatePosition);
    };

    requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);


  return (
	<>
	  <Canvas
		shadows
		camera={{ fov: 75, near: 0.1, far: 300, position: [0, 10, 20] }}
	  >
		<SoftShadows />
		<Perf position="bottom-right" />
		<ambientLight color={"#ffffff"} intensity={1} />
		<directionalLight
		  position={[-0.04, 4.5, -4]}
		  color={"#ffffff"}
		  intensity={1}
		  castShadow
		  shadow-mapSize={[2048, 2048]}
		  shadow-camera-left={-120}
		  shadow-camera-right={120}
		  shadow-camera-top={120}
		  shadow-camera-bottom={-120}
		  shadow-camera-near={-50}
		  shadow-camera-far={60}
		/>
		<fog attach="fog" color={fogcolor} near={1} far={180} />
		<mesh rotation-x={-Math.PI * 0.5} scale={[10, 10, 10]} receiveShadow>
		  {/* <planeGeometry args={[20, 20]} /> */}
		  <circleGeometry args={[16, 50]} />
		  <meshStandardMaterial color={planecolor} />
		</mesh>
		{/* <mesh castShadow position={[0, 10, 0]}>
		  <boxGeometry args={[10, 10, 10]} />
		  <meshStandardMaterial color={"#fff0ff"} />
		</mesh> */}
		<mesh rotation-x={-Math.PI * 0.5} position-y={0.01} receiveShadow>
		  <planeGeometry args={[20, 20]} />
		  <meshStandardMaterial color={floorcolor} />
		</mesh>
		<mesh receiveShadow rotation-x={- Math.PI * 0.5} position-y={0.02}>
			<planeGeometry args={[20, 0.2]}/>
			<meshStandardMaterial color={'#FFFFFF'}/>
		</mesh>
		<mesh receiveShadow rotation-x={-Math.PI * 0.5} rotation-z={-Math.PI * 0.5} position-y={0.02}>
			<planeGeometry args={[20, 0.03]}/>
			<meshStandardMaterial color={'#FFFFFF'}/>
		</mesh>
		<mesh receiveShadow rotation-x={-Math.PI * 0.5} position-y={0.02} position-z={9.95}>
			<planeGeometry args={[20, 0.1]}/>
			<meshStandardMaterial color={'#FFFFFF'}/>
		</mesh>
		<mesh receiveShadow rotation-x={-Math.PI * 0.5} position-y={0.02} position-z={-9.95}>
			<planeGeometry args={[20, 0.1]}/>
			<meshStandardMaterial color={'#FFFFFF'}/>
		</mesh>
		<RoundedBox
			ref={boxRef}
			args={[4, 1, 0.3]}
			position={[0, 0.5, 9]}
			radius={0.15} 
			smoothness={4}
			bevelSegments={4}
			creaseAngle={0.4}
			castShadow
			receiveShadow
			>
			{/* <MeshWobbleMaterial speed={1} factor={0.1} color={paddlecolor} /> */}
			<meshPhongMaterial color={paddlecolor}/>
		</RoundedBox>
		<RoundedBox
			args={[4, 1, 0.3]}
			position={[0, 0.5, -9]}
			radius={0.15} 
			smoothness={4}
			bevelSegments={4} 
			creaseAngle={0.4}
			castShadow
			receiveShadow
			>
			{/* <MeshWobbleMaterial speed={1} factor={0.1} color={paddlecolor} /> */}
			<meshPhongMaterial color={paddlecolor}/>
		</RoundedBox>
		<Stars radius={100} depth={50} count={10000} factor={4} saturation={5} fade speed={2} />
		<Sparkles
			count={2000}
			speed={4}
			opacity={1} 
			color={ 0x00ffff }
			size={Float32Array.from(Array.from({ length: 2000 }, () => Math.random() * (80 - 5) + 10))}
			scale={250}
			noise={1000}
		/>
		<primitive
		  object={naturemodel.scene}
		  castShadow
		  receiveShadow
		  position={[0, 3, 0]}
		  scale={[50, 50, 50]}
		  // roughness={0}
		  // metalness={0}
		/>
		<primitive
		  object={siderock.scene}
		  castShadow
		  receiveShadow
		  position={[-10.1, -1.12, -0.34]}
		  scale={[11, 5 , 16.7]}
		/>
		<primitive
		  object={siderock2}
		  castShadow
		  receiveShadow
		  position={[10.1, -1.12, 0.34]}
		  scale={[11, 5 , 16.7]}
		  rotation-y={Math.PI}
		/>
		{/* <ContactShadows
		  position={[0, -0.99, 0]}
		  rotation={[-Math.PI / 2, 0, 0]}
		  opacity={0.5}
		  width={100}
		  height={100}
		  blur={10}
		  far={5}
		/> */}
		{/* <axesHelper args={[10]} /> */}
		{/* <Environment files="./Game_Assets/textures/SkyEnvmap/Sky_Envmap.hdr" background /> */}
		<Sky sunPosition={sunPosition} />
		<OrbitControls />
	  </Canvas>
	</>
  );
};

export default Game;
