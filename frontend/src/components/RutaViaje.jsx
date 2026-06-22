"use client"

import * as THREE from 'three';
import { Line } from '@react-three/drei';
import coordToVector3 from './Ciudades';



 export default function RutaViaje({ origen, destino }) {
  const pA = new THREE.Vector3(...coordToVector3(origen.lat, origen.lng, 2));
  const pB = new THREE.Vector3(...coordToVector3(destino.lat, destino.lng, 2));

  // Calculamos el punto medio y lo empujamos hacia afuera para crear el arco (el salto)
  const puntoMedio = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5);
  const distancia = pA.distanceTo(pB);
  
  // Escalamos la altura del arco según la distancia del viaje
  puntoMedio.normalize().multiplyScalar(2 + distancia * 0.25); 

  // Creamos la curva que pasa por el Origen, el Punto Medio elevado, y el Destino
  const curva = new THREE.CatmullRomCurve3([pA, puntoMedio, pB]);
  const puntos = curva.getPoints(50); // Genera 50 puntos para que la línea sea fluida

  return (
    <Line
      points={puntos}       // Array de vectores 3D
      color="#00ffcc"       // Color llamativo/neón para la ruta
      lineWidth={2}         // Grosor de la línea
      dashed={false}
    />
  );
}