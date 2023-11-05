import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody } from "@react-three/rapier";

const Model2 = () => {

    const siderock = useGLTF("/Game_Assets/models/bigrock/bigrock.glb");
    useEffect(() => {
        const object = siderock.scene as THREE.Object3D;
        object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
        });
    }, [siderock]);

    return (
        <RigidBody restitution={1.05} friction={0} type="fixed" colliders="hull">
            <primitive
                object={siderock.scene}
                castShadow
                receiveShadow
                position={[-10.1, -1.12, -0.34]}
                scale={[11, 5 , 16.7]}
            />
        </RigidBody>
      );
    }
    
export default Model2;