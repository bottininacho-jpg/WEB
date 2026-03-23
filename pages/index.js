import React, { useState } from 'react';
import Head from 'next/head';

export default function StudioIB() {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 0, padding: '20px' }}>
      <Head>
        <title>STUDIO iB | Arquitectura + IA</title>
      </Head>

      {/* HEADER ESTILO BASE44 */}
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '64px', fontWeight: '900', letterSpacing: '-4px', margin: 0, lineHeight: '1' }}>
          STUDIO <span style={{ color: '#f97316', fontStyle: 'italic' }}>iB</span>
        </h1>
        <p style={{ fontSize: '10px', letterSpacing: '5px', color: '#52525b', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '15px' }}>
          Arquitectura + Inteligencia Artificial
        </p>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <div style={{ width: '100%', maxWidth: '450px', backgroundColor: '#09090b', border: '1px solid #18181b', borderRadius: '40px', padding: '40px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', textAlign: 'center' }}>
        
        {/* ZONA DE CARGA */}
        <div style={{ padding: '60px 20px', border: '2px dashed #27272a', borderRadius: '30px', marginBottom: '32px', cursor: 'pointer', transition: '0.3s' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>📸</div>
          <p style={{ fontSize: '14px', color: '#a1a1aa', fontWeight: '500' }}>Subí el ambiente a transformar</p>
          <input type="file" style={{ display: 'none' }} />
        </div>

        {/* BOTÓN DE ACCIÓN */}
        <button 
          onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
          style={{ width: '100%', height: '70px', backgroundColor: '#fff', color: '#000', borderRadius: '100px', fontWeight: '900', fontSize: '18px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: '0.2s' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#f97316'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
        >
          {loading ? "PROCESANDO..." : "✨ GENERAR DISEÑO IA"}
        </button>
      </div>

      {/* FOOTER */}
      <footer style={{ marginTop: '80px', opacity: 0.3, textAlign: 'center' }}>
        <p style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>
          Design by Ignacio Santos Bottini
        </p>
        <a href="https://instagram.com/ib.arquitectura_" style={{ color: '#f97316', textDecoration: 'none', fontSize: '10px', fontWeight: 'bold' }}>@ib.arquitectura_</a>
      </footer>

      <style jsx global>{`
        body { margin: 0; background: black; }
        button:active { transform: scale(0.98); }
      `}</style>
    </div>
  );
}
