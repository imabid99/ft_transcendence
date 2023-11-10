import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Desert = () => {
  const desertmodel = useGLTF('/Game_Assets/models/desertscene/desertscene.glb');

  useEffect(() => {
    const object = desertmodel.scene as THREE.Object3D;
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [desertmodel]);

  return (
    <>
        <mesh rotation-x={-Math.PI * 0.5} scale={[10, 10, 10]} position={[0, -0.1, 0]} receiveShadow>
            {/* <planeGeometry args={[20, 20]} /> */}
            <circleGeometry args={[16, 50]} />
            <meshStandardMaterial color={'#f2bf73'} />
		</mesh>
        <fog attach="fog" color={"#382f21"} near={1} far={280} />
        <primitive
          object={desertmodel.scene}
          castShadow
          receiveShadow
          position={[0, -0.8, 0]}
          scale={[4, 4, 4]}
        />
    </>
  );
}



export default Desert;
