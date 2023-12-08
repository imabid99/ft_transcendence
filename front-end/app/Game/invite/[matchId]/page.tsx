'use client';

import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useState, useEffect, useMemo, useContext, use } from "react";
import {
  Sky,
  SoftShadows,
  OrbitControls,
  RoundedBox,
  Text
} from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import "../../../globals.css";
import  Model2  from "./model2";
import  Model3  from "./model3";
import  Forest  from "./forest";
import  Desert from "./desert"
import  Snow from "./snow"
import { contextdata } from "../../../contextApi";
import { io } from "socket.io-client";
import { Physics, usePlane, useBox, useSphere, Debug} from '@react-three/cannon'
import { checkLoged, getLocalStorageItem } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";


const InviteAFriend = () => {

	const currentRoute = typeof window !== 'undefined' ? window.location.pathname : '';
	const matchId = currentRoute.substring(13);
	
	const [socket, setSocket] = useState<any>(null);
	const { user }: any = useContext(contextdata);
	const router = useRouter();

	const [shosenMap, setShosenMap] = useState<string | null>(null);


	useEffect(() => {
		const headers = {
		Authorization: `Bearer ${getLocalStorageItem("Token")}`,
		};
		const matchType = 'Invite';
		const newSocket = io(
			`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/Game`,
			{
				extraHeaders: {
					...headers,
				},
				auth: {
					matchType,
				},
			}
		);
		if (newSocket) {
			setSocket(newSocket);
		}
		return () => {
			newSocket.disconnect();
		};
	}, []);
  
	useEffect(() => {
	  if (!socket) return;
  
	  return () => {
		socket.off("connect");
		socket.disconnect();
	  };
	}, [socket]);

	useEffect(() => {
		if(getLocalStorageItem("Maps"))
		  setShosenMap(getLocalStorageItem("Maps"));
	  }, []);

	useEffect(() => {
		if (!socket) return;
		socket.on('player-disconnected', (data: any) => {
			router.push('/Game');
		});
	}, [socket]);


	function Plane(props: any) {
		const [ref, api] = usePlane(() => ({type: "Static", material: { friction: 0 }, args: [20, 20],  rotation: [-Math.PI / 2, 0, 0],...props}), useRef<THREE.Mesh>(null))

		return (
			<mesh ref={ref} rotation-x={-Math.PI * 0.5} position-y={0.02} receiveShadow>
				<planeGeometry args={[20, 20]} />
				<meshStandardMaterial color={'#1572ff'} />
			</mesh>
		);
	}

	function Player1Paddle(props: any) {
		const [ref, api] = useBox(() => ({ mass: 0, type: "Static", material: { restitution: 1.06, friction: 0 },args: [3, 1, 0.3], position: [0, 0.5, 9], ...props }), useRef<THREE.Mesh>(null));

		useEffect(() => {
		  if (!user) return;
		  let isMovingLeft = false;
		  let isMovingRight = false;
      let touchleft = false;
      let touchright = false;
		  let paddleposX = 0;
		  let targetPosX = paddleposX;
		  let animationFrameId: number | null = null;
		  let isUpdating = false;

		  const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code === "ArrowLeft") {
			  isMovingLeft = true;
			} else if (event.code === "ArrowRight") {
			  isMovingRight = true;
			}
			if (!isUpdating) {
				isUpdating = true;
				animationFrameId = requestAnimationFrame(updatePosition);
			  }
		  };

		  const handleKeyUp = (event: KeyboardEvent) => {
			if (event.code === "ArrowLeft") {
			  isMovingLeft = false;
			} else if (event.code === "ArrowRight") {
			  isMovingRight = false;
			}

			if (!isMovingLeft && !isMovingRight && animationFrameId !== null) {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = null;
				isUpdating = false;
			}
		  };
		  window.addEventListener("keydown", handleKeyDown);
		  window.addEventListener("keyup", handleKeyUp);

      // Touch

      const handleTouchStart = (event: TouchEvent) => {
        event.preventDefault();
        if (event.touches[0].clientX < window.innerWidth / 2) {
          touchleft = true;
        } else {
          touchright = true;
        }
        if (!isUpdating) {
          isUpdating = true;
          animationFrameId = requestAnimationFrame(updatePosition);
        }
      };

      const handleTouchEnd = (event: TouchEvent) => {
        event.preventDefault();
        if (event.changedTouches[0].clientX < window.innerWidth / 2) {
          touchleft = false;
        } else {
          touchright = false;
        }

        if (!isMovingLeft && !isMovingRight && animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
          isUpdating = false;
        }
      };

      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchend', handleTouchEnd);



		  const updatePosition = () => {
			if (ref.current) {
				if (isMovingLeft || touchleft) {
					targetPosX = Math.max(targetPosX - 0.4, -5);
					} else if (isMovingRight || touchright) {
						targetPosX = Math.min(targetPosX + 0.4, 5);
					}
					const smoothingFactor = 0.4;
					paddleposX = paddleposX + (targetPosX - paddleposX) * smoothingFactor;
					socket.emit('paddle-pos', { x: - paddleposX, y: 0.5, z: -9, playerId: user?.profile.userId});
					// setTimeout(() => {
						api.position.set(paddleposX, 0.5, 9);
					// }, 5);
			}
				animationFrameId = requestAnimationFrame(updatePosition);
		  };

		  return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchend', handleTouchEnd);
			socket.off('paddle-pos');
			if (animationFrameId !== null) {
				cancelAnimationFrame(animationFrameId);
			  }
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
			<meshPhongMaterial color={"#abebff"} />
		  </RoundedBox>
		);
	  }

	function Player2Paddle(props: any) {
		const [ref, api] = useBox(() => ({ mass: 0, type: "Static",material: { restitution: 1.06, friction: 0 }, args: [3, 1, 0.3], position: [0, 0.5, -9], ...props }), useRef<THREE.Mesh>(null))

		useEffect(() => {
			let isMovingLeft = false;
			let isMovingRight = false;
			let paddleposX = 0;
			let targetPosX = paddleposX;

			const handleKeyDown = (event: KeyboardEvent) => {
				if (event.code === "KeyA") {
					isMovingLeft = true;
				} else if (event.code === "KeyD") {
					isMovingRight = true;
				}
			};

			const handleKeyUp = (event: KeyboardEvent) => {
				if (event.code === "KeyA") {
					isMovingLeft = false;
				} else if (event.code === "KeyD") {
					isMovingRight = false;
				}
			};

			window.addEventListener("keydown", handleKeyDown);
			window.addEventListener("keyup", handleKeyUp);

			socket.on('paddle-pos', (data: any) => {
				if (data.playerId === user?.profile.userId) return;
				api.position.set(data.x, data.y, data.z);
			});

			return () => {
				window.removeEventListener("keydown", handleKeyDown);
				window.removeEventListener("keyup", handleKeyUp);
				// socket.off('paddle-move');
				socket.off('paddle-pos');
			};
		}, []);

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
				<meshPhongMaterial color={"#abebff"}/>
			</RoundedBox>
			);
	}



	let hasServed = false;

	const position = useRef(new THREE.Vector3(0, 0, 0));

	function GameBall(props: any) {
		let direction = 1;
	
		const [ref, api] = useSphere(
		  () => ({
			mass: 1,
			material: { restitution: 1.06, friction: 0 },
			args: [0.32, 42, 16],
			position: [0, 0.35, 0],
			...props,
		  }),
		  useRef<THREE.Mesh>(null)
		);
	
		const speed = useRef(new THREE.Vector3(0, 0, 0));
	
		useEffect(() => {
		  let isServing = false;
		  let isServingmobile = false;
	
		  const ServeDown = (event: KeyboardEvent) => {
			if (event.code === "Space") {
			  isServing = true;
			}
		  };
	
		  const ServeUp = (event: KeyboardEvent) => {
			if (event.code === "Space") {
			  isServing = false;
			}
		  };
	
		  const handleTouchStart = (event: TouchEvent) => {
			isServingmobile = true;
		  };
	
		  const handleTouchEnd = (event: TouchEvent) => {
			isServingmobile = false;
		  };
	
		  const subpos = () => {
			api.position.subscribe((v) => {
			  position.current = new THREE.Vector3(v[0], v[1], v[2]);
			  socket.emit("ball-position", { x: -v[0], y: v[1], z: -v[2] });
			  return (position.current);
			});
		  };
		  subpos();
		  
		  socket.on("ball-position", (data: any) => {
			api.position.set(data.x, data.y, data.z);
		  });
	
		  const subspeed = () => {
			api.velocity.subscribe((v) => {
			  return (speed.current = new THREE.Vector3(v[0], v[1], v[2]));
			});
		  };
		  subspeed();
	
		  window.addEventListener("keydown", ServeDown);
		  window.addEventListener("keyup", ServeUp);
		  window.addEventListener("touchstart", handleTouchStart);
		  window.addEventListener("touchend", handleTouchEnd);
	
		  const serveball = () => {
			const value = -5;
			
			socket.on("ball-serve", (data: any) => {
			  hasServed = data.hasServed;
			});
			
			if ((isServing || isServingmobile) && !hasServed) {
			  api.applyImpulse([value * direction, 0, -10 * direction], [0, 0, 0]);
			  socket.emit("ball-serve", {
				hasServed: true,
			  });
			  hasServed = true;
			}
			if (position.current.z < -10 || position.current.z > 10) {
			  api.position.set(0, 0.35, 0);
			  api.velocity.set(0, 0, 0);
			  socket.emit("ball-serve", {
				hasServed: false,
			  });
			  hasServed = false;
			}
			if (speed.current.x < -10)
			  api.velocity.set(-10, speed.current.y, speed.current.z);
			if (speed.current.x > 10)
			  api.velocity.set(10, speed.current.y, speed.current.z);
			if (speed.current.z > 25)
			  api.velocity.set(speed.current.x, speed.current.y, 24);
			if (speed.current.z < -25)
			  api.velocity.set(speed.current.x, speed.current.y, -24);
	
			requestAnimationFrame(serveball);
		  };
		  requestAnimationFrame(serveball);
	
	
	
		  return () => {
			window.removeEventListener("keydown", ServeDown);
			window.removeEventListener("keyup", ServeUp);
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchend", handleTouchEnd);
			socket.off('ball-position');
			socket.off("ball-serve");
		  };
		}, []);
	
		return (
		  <mesh position={[0, 0.35, 0]} ref={ref} castShadow receiveShadow>
			<sphereGeometry args={[0.35, 42, 16]} />
			<meshStandardMaterial color={"white"} />
		  </mesh>
		);
	  }

	function SideRock1(props: any) {

		const [ref, api] = useBox(() => ({ type: "Static",mass: 1,
			args: [10, 3, 20],
			position: [-11.35, 0.3, 0],
			material: { restitution: 1.06, friction: 0 }, ...props }), useRef<THREE.Mesh>(null))

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
			position: [11.35, 0.3, 0],
			material: { restitution: 1.06, friction: 0 }, ...props }), useRef<THREE.Mesh>(null))

		return (
				<>
					<Model3/>
					<mesh ref={ref}>
					</mesh>
				</>
			);
	}

	const Scoreboard = () => {
		const [p1_count, setP1Count] = useState<number>(0);
		const [p2_count, setP2Count] = useState<number>(0);
	
		useEffect(() => {
		  let animationFrameId: number | null = null;
		  let lastPositionZ = 0;
		
		  const goalCheck = () => {
			const currentZ = position.current.z;
		
			if (currentZ > 10 && lastPositionZ <= 10) {
			  setP1Count((prevCount) => prevCount + 1);
			  position.current.z = 0;
			}
			if (currentZ < -10 && lastPositionZ >= -10) {
			  setP2Count((prevCount) => prevCount + 1);
			  position.current.z = 0;
			}
	
			lastPositionZ = currentZ;
		
			animationFrameId = requestAnimationFrame(goalCheck);
		  };
		
		  animationFrameId = requestAnimationFrame(goalCheck);
		
		  return () => {
			if (animationFrameId !== null) {
			  cancelAnimationFrame(animationFrameId);
			}
		  };
		}, []);
	
	   
	
		useEffect(() => {
		  if (!user) return;
		  if (p1_count === 5 || p2_count === 5) {
			if (p2_count === 5) {
			  const payload = {
				winner: user?.profile.userId,
				winnerscore: p2_count,
				loserscore: p1_count,
			  };
			  socket.emit("player-wins", payload);
			}
	
			setP1Count(0);
			setP2Count(0);
		  }
		}, [p1_count, p2_count, user]);
	
		useEffect(() => {
		  socket.on("player-wins", (data: any) => {
			router.push('/Game');
		  });
		}, []);
	
		return (
		  <>
			<group>
			  <Text
				receiveShadow
				color="White"
				anchorX="center"
				anchorY="middle"
				position={[-3.3, 0.05, -4.8]}
				scale={[6, 6, 6]}
				rotation={[Math.PI / 2, Math.PI, Math.PI]}
			  >
				{p1_count}
			  </Text>
			  <Text
				receiveShadow
				color="White"
				anchorX="center"
				anchorY="middle"
				position={[3.4, 0.05, 5.5]}
				scale={[6, 6, 6]}
				rotation={[Math.PI / 2, Math.PI, Math.PI]}
			  >
				{p2_count}
			  </Text>
			</group>
		  </>
		);
	  };
	  

	// if (isLoading) {
	// 	return <Loading />;
	// }	
  return (
  <div className="w-full  h-full relative">

	  <Canvas
		shadows
		camera={{ fov: 75, near: 0.1, far: 300, position: [0, 10, 20] }}
	  >

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

			{
				shosenMap === 'desert' ? <Desert /> :
				shosenMap === 'snow' ? <Snow /> :
				<Forest />
      		}
			<Scoreboard />

		<Sky sunPosition={[-0.07, -0.03, -0.75]} />
		<OrbitControls
			minAzimuthAngle={-Math.PI / 2}
			maxAzimuthAngle={Math.PI / 2}
			minPolarAngle={Math.PI / 20}
			maxPolarAngle={Math.PI - Math.PI / 2}
			maxDistance={50}
			minDistance={10}
			maxZoom={50}
			minZoom={10}
			enablePan={false}
		/>
		<SoftShadows />
	  </Canvas>
  </div>
  );
};

export default InviteAFriend;

