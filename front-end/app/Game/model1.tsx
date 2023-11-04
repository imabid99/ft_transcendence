import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Model1 = () => {
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

export default Model1;
