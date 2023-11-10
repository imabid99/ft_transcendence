import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Forest = () => {
  const naturemodel = useGLTF('/Game_Assets/models/naturescene/naturescene.glb');

  useEffect(() => {
    const object = naturemodel.scene as THREE.Object3D;
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [naturemodel]);

  return (
    <>
        <mesh rotation-x={-Math.PI * 0.5} scale={[10, 10, 10]} position={[0, -0.1, 0]} receiveShadow>
          <circleGeometry args={[16, 50]} />
          <meshStandardMaterial color={"#51b151"} />
        </mesh>
        <fog attach="fog" color={"#382f21"} near={1} far={180} />
        <primitive
          object={naturemodel.scene}
          castShadow
          receiveShadow
          position={[0, 3, 0]}
          scale={[50, 50, 50]}
        />
    </>
  );
}

export default Forest;
