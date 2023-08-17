/** @format */

import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars } from "drei";
import { Physics, useBox, usePlane } from "use-cannon";

function Box() {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 3, 0],
  }));

  return (
    <mesh ref={ref}>
      <boxBufferGeometry />
      <meshLambertMaterial />
    </mesh>
  );
}

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh ref={ref}>
      <planeBufferGeometry />
      <meshLambertMaterial />
    </mesh>
  );
}

const ArProductReview = () => {
  return (
    <Canvas>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Physics>
        <Box />
        <Plane />
      </Physics>
    </Canvas>
  );
};

export default ArProductReview;
