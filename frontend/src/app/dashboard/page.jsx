"use client"

import dynamic from 'next/dynamic';

// Cargamos el mapa de forma dinámica y desactivamos el SSR para este componente
const MapaMundial = dynamic(
  () => import('@/components/MapaMundial'), 
  { 
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-[#050510] text-white">
        <p>Cargando mapa 3D...</p>
      </div>
    )
  }
);


export default function DashboardPage() {

    
  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Tu mapa 3D ocupará toda la pantalla de fondo */}
      <MapaMundial />

      {/* Aquí puedes superponer la interfaz de usuario del Dashboard (menús, resultados, etc.) */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        pointerEvents: 'none', // Permite que sigas interactuando con el mapa 3D de fondo
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '8px',
        backdropFilter: 'blur(5px)'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Mundial 3D Dashboard</h1>
        <p style={{ opacity: 0.8 }}>Selecciona un país para ver su recorrido</p>
      </div>
    </main>
  );
}