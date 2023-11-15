// 'use client';

// import { Canvas, useFrame } from "@react-three/fiber";
// import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
// import {
//   Sky,
//   SoftShadows,
//   OrbitControls,
//   RoundedBox,
//   Sparkles,
//   Text
// } from "@react-three/drei";
// import { useControls } from "leva";
// import { Perf } from "r3f-perf";
// import * as THREE from "three";
// import "../globals.css";
// import  Model2  from "./model2";
// import  Model3  from "./model3";
// import  Forest  from "./forest";
// import  Desert from "./desert"
// import  Snow from "./snow"
// import { contextdata } from "../contextApi";
// import { io } from "socket.io-client";
// import { Physics, usePlane, useBox, useSphere, Debug} from '@react-three/cannon'
// import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

// // map = snow, desert, forest; mode = friend, bot, random

// const Game = () => {


// 	const Controls = {
// 		left: "left",
// 		right: "right",
// 	}	
	
// 	const map = useMemo(() => [
// 		{ name: Controls.left, keys: ['ArrowLeft'], player: 'player1' },
// 		{ name: Controls.right, keys: ['ArrowRight'], playerd: 'player1' },
// 		{ name: Controls.left, keys: ['ArrowLeft'], player: 'player2' },
// 		{ name: Controls.right, keys: ['ArrowRight'], player: 'player2' },
// 	  ], []);
	

// 	/// SOCKET MANAGER

// 	const {profiles, user} :any= useContext(contextdata);
// 	const name = `${user?.profile.firstName} ${user?.profile.lastName}`;
// 	const socket = io(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/Game`);
	
// 	useEffect(() => {
// 		socket.on("connect", () => {console.log(name + " is Connected to server");});
// 		socket.on("disconnect", () => {console.log(name + " is Disconnected from server");
// 		socket.disconnect();});
		
// 	}, []);
	

// 	// GUI CONTROLS
// // 	const controls = useControls({});
// //   const { sunPosition } = useControls("sky", {
// // 	sunPosition: [-0.07, -0.03, -0.75],
// //   });
// 	// const { planecolor } = useControls("color", { planecolor: "#51b151" });
// 	// const { floorcolor } = useControls("color", { floorcolor: "#1572ff" });
// 	// const { paddlecolor } = useControls("color", { paddlecolor: "#abebff" });
// 	// const { fogcolor } = useControls("color", { fogcolor: "#382f21" });
// 	// const { fogfar } = useControls("color", { fogfar: 180 });
		  
// 	function Plane(props: any) {
// 		const [ref, api] = usePlane(() => ({type: "Static", material: { friction: 0 }, args: [20, 20],  rotation: [-Math.PI / 2, 0, 0],...props}), useRef<THREE.Mesh>(null))

// 		return (
// 			<mesh ref={ref} rotation-x={-Math.PI * 0.5} position-y={0.02} receiveShadow>
// 				<planeGeometry args={[20, 20]} />
// 				<meshStandardMaterial color={'#1572ff'} />
// 			</mesh>
// 		);
// 	}

// 	function Player1Paddle(props: any) {
// 		// console.log("P1START");
// 		const [ref, api] = useBox(() => ({ mass: 0, type: "Static", material: { restitution: 1.06, friction: 0 },args: [3, 1, 0.3], position: [0, 0.5, 9], ...props }), useRef<THREE.Mesh>(null));

// 		useEffect(() => {
// 		  if (!user) return;
// 		  let isMovingLeft = false;
// 		  let isMovingRight = false;
// 		  let paddleposX = 0;
// 		  let targetPosX = paddleposX;
// 		  let animationFrameId: number | null = null;
// 		  let isUpdating = false;

// 		  const handleKeyDown = (event: KeyboardEvent) => {
// 			if (event.code === "ArrowLeft") {
// 			  isMovingLeft = true;
// 			} else if (event.code === "ArrowRight") {
// 			  isMovingRight = true;
// 			}
// 			if (!isUpdating) {
// 				isUpdating = true;
// 				animationFrameId = requestAnimationFrame(updatePosition);
// 			  }
// 		  };

// 		  const handleKeyUp = (event: KeyboardEvent) => {
// 			if (event.code === "ArrowLeft") {
// 			  isMovingLeft = false;
// 			} else if (event.code === "ArrowRight") {
// 			  isMovingRight = false;
// 			}

// 			if (!isMovingLeft && !isMovingRight && animationFrameId !== null) {
// 				cancelAnimationFrame(animationFrameId);
// 				animationFrameId = null;
// 				isUpdating = false;
// 			}
// 		  };
// 		  window.addEventListener("keydown", handleKeyDown);
// 		  window.addEventListener("keyup", handleKeyUp);

		  
// 		  const updatePosition = () => {
// 			if (ref.current) {
// 				if (isMovingLeft) {
// 					targetPosX = Math.max(targetPosX - 0.6, -5);
// 					} else if (isMovingRight) {
// 						targetPosX = Math.min(targetPosX + 0.6, 5);
// 					}
// 					const smoothingFactor = 0.4; 
// 					paddleposX = paddleposX + (targetPosX - paddleposX) * smoothingFactor;
// 					socket.emit('paddle-pos', { x: - paddleposX, y: 0.5, z: -9, playerId: socket.id});
// 					// setTimeout(() => {
// 						api.position.set(paddleposX, 0.5, 9);
// 					// }, 5);
// 			}
// 				animationFrameId = requestAnimationFrame(updatePosition);
// 		  };


	  
// 		  return () => {
// 			window.removeEventListener("keydown", handleKeyDown);
// 			window.removeEventListener("keyup", handleKeyUp);
// 			socket.off('paddle-pos');
// 			if (animationFrameId !== null) {
// 				cancelAnimationFrame(animationFrameId);
// 			  }
// 		  };
// 		}, [user]);
	  
// 		return (
// 		  <RoundedBox
// 			ref={ref}
// 			args={[3, 1, 0.3]}
// 			position={[0, 0.5, 9]}
// 			radius={0.15}
// 			smoothness={4}
// 			bevelSegments={4}
// 			creaseAngle={0.4}
// 			castShadow
// 			receiveShadow
// 		  >
// 			<meshPhongMaterial color={"#abebff"} />
// 		  </RoundedBox>
// 		);
// 	  }
	  
	  

// 	function Player2Paddle(props: any) {
// 		// console.log("P2START");
// 		const [ref, api] = useBox(() => ({ mass: 0, type: "Static",material: { restitution: 1.06, friction: 0 }, args: [3, 1, 0.3], position: [0, 0.5, -9], ...props }), useRef<THREE.Mesh>(null))

// 		useEffect(() => {
// 			let isMovingLeft = false;
// 			let isMovingRight = false;
// 			let paddleposX = 0;
// 			let targetPosX = paddleposX;

// 			const handleKeyDown = (event: KeyboardEvent) => {
// 				if (event.code === "KeyA") {
// 					isMovingLeft = true;
// 				} else if (event.code === "KeyD") {
// 					isMovingRight = true;
// 				}
// 			};
			
// 			const handleKeyUp = (event: KeyboardEvent) => {
// 				if (event.code === "KeyA") {
// 					isMovingLeft = false;
// 				} else if (event.code === "KeyD") {
// 					isMovingRight = false;
// 				}
// 			};
			
// 			window.addEventListener("keydown", handleKeyDown);
// 			window.addEventListener("keyup", handleKeyUp);
			
// 			// const updatePosition = () => {
// 			// 	// if (ref.current) {
// 			// 	// 	// if (isMovingLeft) {
// 			// 	// 	// 	targetPosX = Math.max(targetPosX - 0.5, -5);
// 			// 	// 	// 	} else if (isMovingRight) {
// 			// 	// 	// 		targetPosX = Math.min(targetPosX + 0.5, 5);
// 			// 	// 	// 	}
// 			// 	// 	// 	const smoothingFactor = 0.5; 
// 			// 	// 	// 	paddleposX = paddleposX + (targetPosX - paddleposX) * smoothingFactor;
// 			// 	// 	// 	// api.position.set(paddleposX, 0.5, -9);
// 			// 	// 	}
				
// 			// 	requestAnimationFrame(updatePosition);
// 			// };
			
// 			// requestAnimationFrame(updatePosition);
// 			socket.on('paddle-pos', (data) => {
// 				if (data.playerId === socket.id) return;
// 				api.position.set(data.x, data.y, data.z);
// 			});
	
		
// 			return () => {
// 				window.removeEventListener("keydown", handleKeyDown);
// 				window.removeEventListener("keyup", handleKeyUp);
// 				// socket.off('paddle-move');
// 				socket.off('paddle-pos');
// 			};
// 		}, []);

// 		return (
// 			<RoundedBox
// 				ref={ref}
// 				args={[3, 1, 0.3]}
// 				position={[0, 0.5, -9]}
// 				radius={0.15} 
// 				smoothness={4}
// 				bevelSegments={4} 
// 				creaseAngle={0.4}
// 				castShadow
// 				receiveShadow
// 				>
// 				<meshPhongMaterial color={"#abebff"}/>
// 			</RoundedBox>
// 			);
// 	}

// 	let hasServed = false;
	
// 	const position = useRef(new THREE.Vector3(0, 0, 0));

// 	function GameBall(props: any) {
// 		let direction = 1;

// 		const [ref, api] = useSphere(() => ({ mass: 1, material: { restitution: 1.06, friction: 0 },args: [0.32, 42, 16], position: [0, 0.35, 0], ...props }), useRef<THREE.Mesh>(null))



// 		useEffect(() => {
// 			let isServing = false;
			
// 			const ServeDown = (event: KeyboardEvent) => {
// 				if (event.code === 'Space') {
// 					isServing = true;
// 					socket.emit('ball-serve', {isServing: true, direction: -1})
// 				}
// 			};
			
// 			const ServeUp = (event: KeyboardEvent) => {
// 				if (event.code === 'Space') {
// 					isServing = false;
// 					socket.emit('ball-serve', {isServing: false, direction: 1})
// 				}
// 			};

// 			const test = () => {
// 			api.position.subscribe((v) => {
// 					return (position.current = new THREE.Vector3(v[0], v[1], v[2]));
// 				})
// 				}	
// 			test();
			
// 			window.addEventListener('keydown', ServeDown);
// 			window.addEventListener('keyup', ServeUp);
			
// 			const serveball = () => {
// 				// const value = Math.random() < 0.5 ? -10 : 10;
// 				const value = -5;
// 				if(isServing && !hasServed)
// 				{
// 					api.applyImpulse([value * direction, 0, -10 * direction], [0, 0, 0]);
// 					hasServed = true;
// 				}
// 				if(position.current.z < -10 || position.current.z > 10)
// 				{
// 					api.position.set(0, 0.35, 0);
// 					api.velocity.set(0, 0, 0);
// 					hasServed = false;
// 				}
// 				requestAnimationFrame(serveball);
// 			};
// 			requestAnimationFrame(serveball);

// 			socket.on('ball-serve', (data) => {
// 				isServing = data.isServing;
// 				direction = data.direction;
// 			});
	
// 			return () => {
// 				window.removeEventListener('keydown', ServeDown);
// 				window.removeEventListener('keyup', ServeUp);
// 				// socket.off('ballPosition');
// 				socket.off('ball-serve');
// 			};

// 			}, []);



// 		return (
// 			<mesh position={[0, 0.35, 0]} ref={ref} castShadow receiveShadow>
// 				<sphereGeometry args={[0.35, 42, 16]}/>
// 				<meshStandardMaterial color={"white"}/>
// 			</mesh>
// 		);
// 	}

// 	function SideRock1(props: any) {

// 		const [ref, api] = useBox(() => ({ type: "Static",mass: 1,
// 			args: [10, 3, 20],
// 			position: [-11.35, 0.3, 0],
// 			material: { restitution: 1.06, friction: 0 }, ...props }), useRef<THREE.Mesh>(null))
	
// 		return (
// 				<>
// 					<Model2/> 
// 					<mesh ref={ref}>
// 					</mesh>
// 				</>
// 			);
// 	}

// 	function SideRock2(props: any) {

// 		const [ref, api] = useBox(() => ({ type: "Static",mass: 1,
// 			args: [10, 3, 20],
// 			position: [11.35, 0.3, 0],
// 			material: { restitution: 1.06, friction: 0 }, ...props }), useRef<THREE.Mesh>(null))
	
// 		return (
// 				<>
// 					<Model3/> 
// 					<mesh ref={ref}>
// 					</mesh>
// 				</>
// 			);
// 	}


// 	const Scoreboard = () => {
// 		const [p1_count, setP1Count] = useState<number>(0);
// 		const [p2_count, setP2Count] = useState<number>(0);
	  
// 		let animationFrameId: number | null = null;
		
// 		useEffect(() => {
// 		  const goalCheck = () => {
// 			if (position.current.z > 10) {
// 			  setP1Count((prevCount) => prevCount + 1);
// 			  position.current.z = 0;
			  
// 			}
// 			if (position.current.z < -10) {
// 				setP2Count((prevCount) => prevCount + 1);
// 				position.current.z = 0;
// 			}
// 			setTimeout(() => {
// 				animationFrameId = requestAnimationFrame(goalCheck);
// 			}, 20); 
// 		  };

	  
// 		  goalCheck();
	  
// 		  return () => {
// 			if (animationFrameId !== null) {
// 			  cancelAnimationFrame(animationFrameId);
// 			}
// 		  };
// 		}, []);

// 		useEffect(() => {
// 			if(!user) return;
// 			if(p1_count === 7 || p2_count === 7)
// 			{
// 				if(p2_count === 7 )
// 				{
// 				  console.log(socket.id, p1_count, p2_count);
// 				  const payload = {winner: socket.id, winnerscore: p2_count, loserscore: p1_count};
// 				  socket.emit('player-wins', payload)
// 				}
// 				// else
// 				// {
// 				//   console.log("Opponent Wins!", p1_count, p2_count);
// 				//   const payload = {winner: "Opponent", winnerscore: p1_count, loserscore: p2_count};
// 				//   socket.emit('player-wins', payload)
// 				// }
// 				setP1Count(0);
// 				setP2Count(0);
// 			}

// 		}, [p1_count, p2_count, user]);

// 		useEffect(() => {
// 			socket.on('player-wins', (data) => {
// 				console.log("on ",data.winner, " Wins! with " + data.winnerScore + " - " + data.loserScore);
// 			});
// 		}, []);

// 		return (
// 		  <>
// 			<group>
// 			  <Text
// 				receiveShadow
// 				color="White"
// 				anchorX="center"
// 				anchorY="middle"
// 				position={[-3.3, 0.05, -4.8]}
// 				scale={[6, 6, 6]}
// 				rotation={[Math.PI / 2, Math.PI, Math.PI]}
// 			  >
// 				{p1_count}
// 			  </Text>
// 			  <Text
// 				receiveShadow
// 				color="White"
// 				anchorX="center"
// 				anchorY="middle"
// 				position={[3.4, 0.05, 5.5]}
// 				scale={[6, 6, 6]}
// 				rotation={[Math.PI / 2, Math.PI, Math.PI]}
// 			  >
// 				{p2_count}
// 			  </Text>
// 			</group>
// 		  </>
// 		);
// 	};

// 	// const [currentMap, setCurrentMap] = useState('Desert');

// 	// const switchMap = () => {
// 	//   if (currentMap === 'Desert') {
// 	// 	setCurrentMap('Forest');
// 	//   } else if (currentMap === 'Forest') {
// 	// 	setCurrentMap('Snow');
// 	//   } else {
// 	// 	setCurrentMap('Desert');
// 	//   }
// 	// };


//   return (
// 	<>

// 	  <Canvas
// 		shadows
// 		camera={{ fov: 75, near: 0.1, far: 300, position: [0, 10, 20] }}
// 	  >
// 		{/*<Sparkles
// 			count={2000}
// 			speed={4}
// 			opacity={1} 
// 			color={ 0x00ffff }
// 			size={Float32Array.from(Array.from({ length: 2000 }, () => Math.random() * (80 - 5) + 10))}
// 			scale={250}
// 			noise={1000}
// 		/>*/}

// 		{/* <Perf position="bottom-right" /> */}
// 		<ambientLight color={"#ffffff"} intensity={1} />
// 		<directionalLight
// 			position={[-0.04, 4.5, -4]}
// 			color={"#ffffff"}
// 			intensity={1}
// 			castShadow
// 			shadow-mapSize={[1024, 1024]}
// 			shadow-camera-left={-120}
// 			shadow-camera-right={120}
// 			shadow-camera-top={120}
// 			shadow-camera-bottom={-120}
// 			shadow-camera-near={-50}
// 			shadow-camera-far={60}
// 		/>
// 			<Physics>
// 				{/* <Debug color="black" scale={1.1}> */}
// 					<Plane/>
// 					<Player1Paddle/>
// 					<Player2Paddle/>
// 					<GameBall/>
// 					<SideRock1/>
// 					<SideRock2/>
// 				{/* </Debug> */}
// 			</Physics>
// 			{/* <mesh rotation-x={-Math.PI * 0.5} scale={[10, 10, 10]} position={[0, -0.1, 0]} receiveShadow> */}
// 				{/* <planeGeometry args={[20, 20]} /> */}
// 				{/* <circleGeometry args={[16, 50]} /> */}
// 				{/* <meshStandardMaterial color={planecolor} /> */}
// 			{/* </mesh> */}
// 			<mesh receiveShadow rotation-x={- Math.PI * 0.5} position-y={0.02}>
// 				<planeGeometry args={[20, 0.2]}/>
// 				<meshStandardMaterial color={'#FFFFFF'}/>
// 			</mesh>
// 			<mesh receiveShadow rotation-x={-Math.PI * 0.5} rotation-z={-Math.PI * 0.5} position-y={0.02}>
// 				<planeGeometry args={[20, 0.03]}/>
// 				<meshStandardMaterial color={'#FFFFFF'}/>
// 			</mesh>
// 			<mesh receiveShadow rotation-x={-Math.PI * 0.5} position-y={0.02} position-z={9.95}>
// 				<planeGeometry args={[20, 0.1]}/>
// 				<meshStandardMaterial color={'#FFFFFF'}/>
// 			</mesh>
// 			<mesh receiveShadow rotation-x={-Math.PI * 0.5} position-y={0.02} position-z={-9.95}>
// 				<planeGeometry args={[20, 0.1]}/>
// 				<meshStandardMaterial color={'#FFFFFF'}/>
// 			</mesh>
// 			{
// 				/*
// 					map == "forest" && <Forest/> 
// 					map == "desert" && <Desert/>
// 					map == "snow" && <Snow/>
// 				*/
// 			}

			
// 				{/* {currentMap === 'Desert' && <Desert />}
// 				{currentMap === 'Forest' && <Forest />}
// 				{currentMap === 'Snow' && <Snow />} */}
// 			{/* <Forest/> */}
// 			<Desert/>
// 			{/* <Snow/> */}
// 			<Scoreboard />

// 		<Sky sunPosition={[-0.07, -0.03, -0.75]} />
// 		<OrbitControls  
// 			minAzimuthAngle={-Math.PI / 2}
// 			maxAzimuthAngle={Math.PI / 2}
// 			minPolarAngle={Math.PI / 20}
// 			maxPolarAngle={Math.PI - Math.PI / 2}
// 			maxDistance={50}
// 			minDistance={10}
// 			maxZoom={50}
// 			minZoom={10}
// 			enablePan={false}
// 		/>
// 		<SoftShadows />
// 		{/* <fog attach="fog" color={fogcolor} near={1} far={fogfar} /> */}
// 	  </Canvas>
// 	  {/* <button onClick={switchMap}>Switch Map</button> */}
// 	</>
//   );
// };

// export default Game;
