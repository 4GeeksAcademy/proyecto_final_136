"use client";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { coordToVector3, GLOBE_RADIUS } from "./Ciudades";

const ARC_HEIGHT = GLOBE_RADIUS * 1.23;

export default function RutaViaje({ origen, destino }) {
  const pA = coordToVector3(origen.lat, origen.lng, ARC_HEIGHT);
  const pB = coordToVector3(destino.lat, destino.lng, ARC_HEIGHT);

  const puntoMedio = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5);
  const distancia = pA.distanceTo(pB);

  puntoMedio.normalize().multiplyScalar(ARC_HEIGHT + distancia * 0.25);

  const curva = new THREE.CatmullRomCurve3([pA, puntoMedio, pB]);
  const puntos = curva.getPoints(40);

  return (
    <Line
      points={puntos}
      color="#00ffcc"
      lineWidth={2}
      dashed={false}
    />
  );
}
