'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Globo } from './Globo';
import { Ciudades } from './Ciudades';


export default function MapaMundial() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#050510' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Iluminación básica */}
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        {/* Fondo espacial opcional */}
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Controles para que el usuario rote y haga zoom en el mapa */}
        <OrbitControls enablePan={true} enableZoom={true} minDistance={2.5} maxDistance={10} />
        
        {/* Nuestro mundo 3D */}
        <Globo />
        <Ciudades />
      </Canvas>
    </div>
  );
}