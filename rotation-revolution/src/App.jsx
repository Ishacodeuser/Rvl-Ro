import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function OrbitSphere({ diameter=2, orbitSpeed = 0.002, rotationSpeed = 0.002 }) {
  const meshRef = useRef();
  const angleRef = useRef(0);

  useFrame(() => {
    angleRef.current += orbitSpeed;
    const x = diameter * Math.cos(angleRef.current);
    const z = diameter * Math.sin(angleRef.current);
    meshRef.current.position.set(x, 0, z);

    meshRef.current.rotation.y += rotationSpeed;
    meshRef.current.rotation.x += rotationSpeed /2 ;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  );
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [8, 5, 8] }}>
      
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <OrbitSphere diameter={2} orbitSpeed={0.005} rotationSpeed={0.006} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[2,5,2]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;