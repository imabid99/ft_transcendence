'use client';

import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
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
  Effects,
  KeyboardControls,
  useKeyboardControls,
  Box,
  Text
} from "@react-three/drei";
// import { useGLTF, Environment } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
// import { RigidBody, vec3, useRapier ,RapierRigidBody , Physics, CuboidCollider } from "@react-three/rapier";
import { Vector3 } from "three";
// import * as jwt from "jsonwebtoken";
// import jwt_decode from "jwt-decode";
import "../globals.css";
import  Model1  from "./model1";
import  Model2  from "./model2";
import  Model3  from "./model3";
import socketmanager from "./socketmanager";
import { contextdata } from "../contextApi";
import { io } from "socket.io-client";
import { Physics, usePlane, useBox, useSphere, Debug} from '@react-three/cannon'
import { Mina } from "next/font/google";

// import { contextdata } from '@/app/contextApi';


// const {profiles, user}:any = useContext(contextdata);
// const myProfile = profiles?.find((profile:any) => profile.userId === user.id);
// const name = `${myProfile?.firstName} ${myProfile?.lastName}`;
// console.log(name);

const Game = () => {


	const Controls = {
		left: "left",
		right: "right",
	}	
	
	const map = useMemo(() => [
		{ name: Controls.left, keys: ['ArrowLeft'], player: 'player1' },
		{ name: Controls.right, keys: ['ArrowRight'], playerd: 'player1' },
		{ name: Controls.left, keys: ['ArrowLeft'], player: 'player2' },
		{ name: Controls.right, keys: ['ArrowRight'], player: 'player2' },
	  ], []);
	

	/// SOCKET MANAGER

	// socketmanager();
	const {profiles, user} :any= useContext(contextdata);
	const name = `${user?.profile.firstName} ${user?.profile.lastName}`;
	const socket = io("http://localhost:3000/Game");
	
	useEffect(() => {
		socket.on("connect", () => {console.log(name + " is Connected to server");});
		socket.on("disconnect", () => {console.log(name + " is Disconnected from server");});
  
	  }, []);
  
	  useEffect(() => {
		  socket.on("updatePosition", (position) => {
		  // Broadcast the updated position to all connected clients
		  socket.emit("playerPosition", position);
		});
	}, [profiles]);

	const controls = useControls({});
  const { sunPosition } = useControls("sky", {
	sunPosition: [-0.07, -0.03, -0.75],
  });
  const { planecolor } = useControls("color", { planecolor: "#51b151" });
  const { floorcolor } = useControls("color", { floorcolor: "#1572ff" });
  const { paddlecolor } = useControls("color", { paddlecolor: "#abebff" });
  const { fogcolor } = useControls("color", { fogcolor: "#382f21" });
		  
  function Plane(props: any) {

	const [ref, api] = usePlane(() => ({type: "Static", args: [20, 20],  rotation: [-Math.PI / 2, 0, 0],...props}), useRef<THREE.Mesh>(null))

	return (
			<mesh ref={ref} rotation-x={-Math.PI * 0.5} position-y={0.02} receiveShadow>
				<planeGeometry args={[20, 20]} />
				<meshStandardMaterial color={floorcolor} />
			</mesh>
		);
	}

	function Player1Paddle(props: any) {
		const [ref, api] = useBox(() => ({ mass: 1, args: [3, 1, 0.3], position: [0, 0.5, 9], ...props }), useRef<THREE.Mesh>(null));
	  
		useEffect(() => {
		  if (!user) return;
		  let isMovingLeft = false;
		  let isMovingRight = false;
		  let targetPositionX = 0;
		  let currentPositionX = 0;
		  const movementSpeed = 0.1; // Adjust this value to control the smoothness
	  
		  const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code === "ArrowLeft") {
			  isMovingLeft = true;
			  socket.emit('paddle-move', { direction: 'left', moving: true, playerId: user?.id });
			} else if (event.code === "ArrowRight") {
			  isMovingRight = true;
			  socket.emit('paddle-move', { direction: 'right', moving: true, playerId: user?.id });
			}
		  };
	  
		  const handleKeyUp = (event: KeyboardEvent) => {
			if (event.code === "ArrowLeft") {
			  isMovingLeft = false;
			  socket.emit('paddle-move', { direction: 'left', moving: false, playerId: user?.id });
			} else if (event.code === "ArrowRight") {
			  isMovingRight = false;
			  socket.emit('paddle-move', { direction: 'right', moving: false, playerId: user?.id });
			}
		  };
		  window.addEventListener("keydown", handleKeyDown);
		  window.addEventListener("keyup", handleKeyUp);
	  
		  const updatePosition = () => {
			if (ref.current) {
			  currentPositionX = ref.current.position.x;
	  
			  if (isMovingLeft && currentPositionX > -4) {
				targetPositionX = Math.max(currentPositionX - movementSpeed, -4);
			  } else if (isMovingRight && currentPositionX < 4) {
				targetPositionX = Math.min(currentPositionX + movementSpeed, 4);
			  }
	  
			  // Smoothly interpolate towards the target position
			  const newPositionX = currentPositionX + (targetPositionX - currentPositionX) * 0.1;
			  api.position.set(newPositionX, 0.5, 9);
			}

			requestAnimationFrame(updatePosition);
		  };
		  requestAnimationFrame(updatePosition);

	  
		  return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
			// socket.off('paddle-move');
		  };
		}, [user]);
	  
		return (
		  <RoundedBox
			ref={ref}
			args={[3, 1, 0.3]}
			position={[0, 0.5, 9]}
			radius={0.15}
			smoothness={4}
			bevelSegments={4}
			creaseAngle={0.4}
			castShadow
			receiveShadow
		  >
			<meshPhongMaterial color={paddlecolor} />
		  </RoundedBox>
		);
	  }
	  
	  

	function Player2Paddle(props: any) {

		const [ref, api] = useBox(() => ({ mass: 1, args: [3, 1, 0.3], position: [0, 0.5, -9], ...props }), useRef<THREE.Mesh>(null))

		return (
			<RoundedBox
				ref={ref}
				args={[3, 1, 0.3]}
				position={[0, 0.5, -9]}
				radius={0.15} 
				smoothness={4}
				bevelSegments={4} 
				creaseAngle={0.4}
				castShadow
				receiveShadow
				>
				<meshPhongMaterial color={paddlecolor}/>
			</RoundedBox>
			);
	}

	const [p1_count, setCount] = useState(0);
	const [p2_count, setCount2] = useState(0);
	let hasServed = false;

	function GameBall(props: any) {
		const [ref, api] = useSphere(() => ({ mass: 1, args: [0.35, 42, 16], position: [0, 0.35, 0], ...props }), useRef<THREE.Mesh>(null))
		

		useEffect(() => {
			let isServing = false;
			
			const ServeDown = (event: KeyboardEvent) => {
				if (event.code === 'Space') {
					isServing = true;
				}
			};
			
			const ServeUp = (event: KeyboardEvent) => {
				if (event.code === 'Space') {
					isServing = false;
				}
			};
			
			window.addEventListener('keydown', ServeDown);
			window.addEventListener('keyup', ServeUp);
			
			const serveball = () => {
				if(ref.current)
				{	
					if(isServing && !hasServed)
					{
						api.applyImpulse([0, 0, 15], [0, 0, 0]);
						hasServed = true;
					}
					// console.log(ballRef.current.position.z);
					if(ref.current.position.z || ref.current.position.z > 10)
					{
						if (ref.current.position.z > 10) {
							setCount(previousCount => previousCount + 1);
						}
						if (ref.current.position.z < -10) {
							setCount2(previousCount => previousCount + 1);
						}
						

						
						// ballbodyRef.current.setTranslation({ x: 0, y: 0.35, z: 0 }, false);
						api.position.set(0, 0.35, 0);
						// ballbodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, false);
						// ballbodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, false);

						hasServed = false;
					}
					socket.emit('ballPosition', {x: ref.current.position.x, y: ref.current.position.y, z: ref.current.position.z});
				}
				requestAnimationFrame(serveball);
			};
			requestAnimationFrame(serveball);
			
			socket.on('ballPosition', (data) => {
				if (ref.current) {
					ref.current.position.set(data.x, data.y, data.z);
				}
			});
	
					
					return () => {
						window.removeEventListener('keydown', ServeDown);
						window.removeEventListener('keyup', ServeUp);
						socket.off('ballPosition');
					};
					
					
			}, []);
		return (
			<mesh position={[0, 0.35, 0]} ref={ref} castShadow receiveShadow>
				<sphereGeometry args={[0.35, 42, 16]}/>
				<meshStandardMaterial color={"white"}/>
			</mesh>
		);
	}

	function SideRock1(props: any) {

		const [ref, api] = useBox(() => ({ type: "Static",mass: 1,
			args: [10, 3, 20],
			position: [-12, 0.3, 0], ...props }), useRef<THREE.Mesh>(null))
	
		return (
				<>
					<Model2/> 
					<mesh ref={ref}>
					</mesh>
				</>
			);
	}

	function SideRock2(props: any) {

		const [ref, api] = useBox(() => ({ type: "Static",mass: 1,
			args: [10, 3, 20],
			position: [12, 0.3, 0], ...props }), useRef<THREE.Mesh>(null))
	
		return (
				<>
					<Model3/> 
					<mesh ref={ref}>
					</mesh>
				</>
			);
	}

	interface ScoreboardProps {
		p1_count: number;
		p2_count: number;
	}

	const Scoreboard = ({ p1_count, p2_count }: ScoreboardProps) => {
		return (
			<>
				<group>
					<Text receiveShadow color="White" anchorX="center" anchorY="middle" position={[-3.3, 0.05, -4.8]} scale={[6, 6, 6]} rotation={[Math.PI / 2, Math.PI , Math.PI]}>
					{p1_count}
					</Text>
					<Text receiveShadow color="White" anchorX="center" anchorY="middle" position={[3.4, 0.05, 5.5]} scale={[6, 6, 6]} rotation={[Math.PI / 2, Math.PI , Math.PI]}>
					{p2_count}
					</Text>
				</group>
			</>
		);
	  };


  return (
	<>
	  <Canvas
		shadows
		camera={{ fov: 75, near: 0.1, far: 300, position: [0, 10, 20] }}
	  >
		<Sparkles
			count={2000}
			speed={4}
			opacity={1} 
			color={ 0x00ffff }
			size={Float32Array.from(Array.from({ length: 2000 }, () => Math.random() * (80 - 5) + 10))}
			scale={250}
			noise={1000}
		/>

		<Perf position="bottom-right" />
		<ambientLight color={"#ffffff"} intensity={1} />
		<directionalLight
			position={[-0.04, 4.5, -4]}
			color={"#ffffff"}
			intensity={1}
			castShadow
			shadow-mapSize={[1024, 1024]}
			shadow-camera-left={-120}
			shadow-camera-right={120}
			shadow-camera-top={120}
			shadow-camera-bottom={-120}
			shadow-camera-near={-50}
			shadow-camera-far={60}
		/>
			<Physics>
				{/* <Debug color="black" scale={1.1}> */}
					<Plane/>
					<Player1Paddle/>
					<Player2Paddle/>
					<GameBall/>
					<SideRock1/>
					<SideRock2/>
				{/* </Debug> */}
			</Physics>
			<mesh rotation-x={-Math.PI * 0.5} scale={[10, 10, 10]} position={[0, -0.1, 0]} receiveShadow>
				{/* <planeGeometry args={[20, 20]} /> */}
				<circleGeometry args={[16, 50]} />
				<meshStandardMaterial color={planecolor} />
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
			{/* <Model3/> */}
			<Model1/>
			<Scoreboard p1_count={p1_count} p2_count={p2_count} />

		<Sky sunPosition={sunPosition} />
		<OrbitControls />
		{/* </EffectComposer>  */}
		<SoftShadows />
		<fog attach="fog" color={fogcolor} near={1} far={180} />
	  </Canvas>
	</>
  );
};

export default Game;