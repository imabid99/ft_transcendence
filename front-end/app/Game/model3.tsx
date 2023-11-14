import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Model3 = () => {


    const siderock2 = useGLTF("/Game_Assets/models/bigrock2/bigrock.glb");
    useEffect(() => {
        const object = siderock2.scene as THREE.Object3D;
        object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
        });
    }, [siderock2]);


    return (
        // <RigidBody restitution={1.05} friction={0} type="fixed" colliders="hull">
            <primitive
                object={siderock2.scene}
                castShadow
                receiveShadow
                position={[10.1, -1.12, 0.34]}
                scale={[11, 5 , 16.7]}
                rotation-y={Math.PI}
                />
        // </RigidBody>
      );
}
    
export default Model3;