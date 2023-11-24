import React, { Suspense } from "react";
import { Canvas, MeshProps, useFrame, useLoader } from "@react-three/fiber";
import { useState, useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const Box = (props: any) => {
  const [active, setActive] = useState<boolean>(false);
  const mesh = useRef<MeshProps>();

  useFrame((state, delta) => {
    if (active && mesh.current) {
      mesh.current.rotation.y -= delta;
      mesh.current.rotation.x += delta;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
    >
      <boxGeometry />
      <meshStandardMaterial color={active ? "green" : "grey"} />
    </mesh>
  );
};

const Shoe = (props: any) => {
  console.log("yeet", require("./assets/Airmax/shoe.obj"));
  const obj = useLoader(OBJLoader, require("./assets/Airmax/shoe.obj"));

  return (
    <mesh>
      <primitive object={obj} scale={10} />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[20, 20, 20]} decay={0} intensity={Math.PI} />

      <Suspense fallback={null}>
        <Shoe />
      </Suspense>
    </Canvas>
  );
};

export default App;
