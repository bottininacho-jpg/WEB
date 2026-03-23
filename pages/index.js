import React, { useState } from 'react';

export default function StudioIB() {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ 
      backgroundColor: 'black', 
      color: 'white', 
      minHeight: 'screen', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      padding: '40px',
      textAlign: 'center'
    }}>
      <header style={{ marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '-2px', margin: '0' }}>
          STUDIO <span style={{ color: '#f97316', fontStyle: 'italic' }}>iB</span>
        </h1>
        <p style={{ fontSize: '10px', letterSpacing: '4px', color: '#71717a', textTransform: 'uppercase', marginTop: '10px' }}>
          Arquitectura + Inteligencia Artificial
        </p>
      </header>

      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ 
          padding: '40px', 
          border: '2px dashed #27272a', 
          borderRadius: '32px', 
          marginBottom: '24px',
          backgroundColor: '#18181b'
        }}>
          <p style={{ fontSize: '14px', color: '#a1a1aa' }}>Subí el ambiente a transformar</p>
        </div>

        <button 
          onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
          style={{ 
            width: '100%', 
            height: '64px', 
            backgroundColor: 'white', 
            color: 'black', 
            borderRadius: '50px', 
            fontWeight: '900',
            fontSize: '18px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {loading ? "PROCESANDO..." : "GENERAR DISEÑO IA"}
        </button>
      </div>

      <footer style={{ marginTop: '80px', opacity: '0.2', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase' }}>
        Design by Ignacio Santos Bottini
      </footer>
    </div>
  );
}
