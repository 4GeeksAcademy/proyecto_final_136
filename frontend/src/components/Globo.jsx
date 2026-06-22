"use client"

import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import Ciudades from './Ciudades';
import RutaViaje from './RutaViaje';
import { useFrame } from '@react-three/fiber';

export function Globo() {
  const texturaTierra = useTexture('/textures/earth.jpg');

  // Ejemplo de viaje: CDMX a New York
  /*const viajeEjemplo = {
    origen: { lat: 19.4326, lng: -99.1332 },
    destino: { lat: 40.7128, lng: -74.0060 }
  };*/

  const globoRef = useRef();

  // useFrame ejecuta este código en cada frame de la animación (60fps)
  useFrame((state) => {
    // state.clock funciona internamente de forma compatible
    // Aquí hacemos que el globo rote lentamente sobre su propio eje Y
    if (globoRef.current) {
      globoRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      {/* La Tierra */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={texturaTierra} roughness={0.8} />
      </mesh>

      {/* Los marcadores de las ciudades */}
      <Ciudades />

      {/* La ruta del salto */}
      
    </group>
  );

}