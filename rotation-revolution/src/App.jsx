import React, { useRef , Suspense} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {TextureLoader} from "three";
import {useLoader} from "@react-three/fiber";

function SolarSystem() {
    const sunRef = useRef(null);
    const earthOrbitRef = useRef(null);
    const earthRef = useRef(null);
    const moonOrbitRef = useRef(null);
    const moonRef = useRef(null);
    const sunTexture = useLoader(TextureLoader, "/textures/sun.png")

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (sunRef.current) {
            sunRef.current.rotation.y += 0.003;
        }

        if (earthOrbitRef.current && earthRef.current) {
            const x = Math.cos(t * 0.5) * 5;
            const z = Math.sin(t * 0.5) * 4;
            earthOrbitRef.current.position.set(x, 0, z);
            earthRef.current.rotation.y += 0.02;
        }

        if (moonOrbitRef.current && moonRef.current) {
            const mx = Math.cos(t * 2) * 1.5;
            const mz = Math.sin(t * 2) * 1.5;
            moonOrbitRef.current.position.set(mx, 0, mz);
            moonRef.current.rotation.y += 0.01;
        }
    });

    return (
        <>
            <mesh ref={sunRef}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial map={sunTexture}/>
            </mesh>

            <group ref={earthOrbitRef}>
                <group rotation={[0, 0, 0.41]}>
                    <mesh ref={earthRef}>
                        <sphereGeometry args={[0.7, 32, 32]} />
                        <meshStandardMaterial color="#2a5c2a" />
                    </mesh>
                </group>

                <group rotation={[0.8, 0, 0]}>
                    <group ref={moonOrbitRef}>
                        <mesh ref={moonRef}>
                            <sphereGeometry args={[0.3, 32, 32]} />
                            <meshStandardMaterial color="#aaaaaa"  />
                        </mesh>
                    </group>
                </group>

            </group>
        </>
    );
}

 function App() {
    return (
        <div className="bg">
        <Canvas camera={{ position: [0, 6, 10] }}>
            <ambientLight intensity={1.2} />
            <pointLight position={[0, 0, 0]} intensity={3} />
            <Suspense fallback={null}>
                <SolarSystem/>
                <OrbitControls />
            </Suspense>
        </Canvas>
        </div>
    );
}
export default App;
