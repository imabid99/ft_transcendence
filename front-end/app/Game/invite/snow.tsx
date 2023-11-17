import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import {
    Sparkles,
} from "@react-three/drei";

const Snow = () => {
  const snowmodel = useGLTF('/Game_Assets/models/snowscene/snowscene.glb');

  useEffect(() => {
    const object = snowmodel.scene as THREE.Object3D;
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [snowmodel]);



  return (
    <>
        <mesh rotation-x={-Math.PI * 0.5} scale={[10, 10, 10]} position={[0, -0.1, 0]} receiveShadow>
            <circleGeometry args={[16, 50]} />
            <meshStandardMaterial color={'#ffffff'} />
        </mesh>
        <Sparkles
          count={2000}
          speed={4}
          opacity={1} 
          color={ '#ffffff' }
          size={Float32Array.from(Array.from({ length: 2000 }, () => Math.random() * (80 - 5) + 10))}
          scale={250}
          noise={1000}
        />
        <fog attach="fog" color={"#382f21"} near={1} far={280} />
        <primitive
          object={snowmodel.scene}
          castShadow
          receiveShadow
          position={[0, -0.6, 0]}
          scale={[3, 3, 3]}
        />
    </>
  );
}

export default Snow;