import { useGLTF, } from "@react-three/drei";

export function importmodel (url: string) {
    const gltf = useGLTF(url);
    return  gltf;
}