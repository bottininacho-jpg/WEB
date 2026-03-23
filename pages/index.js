import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, ChevronRight } from 'lucide-react';

export default function StudioIB() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6 flex flex-col items-center justify-center text-center">
      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black tracking-tighter"
        >
          STUDIO <span className="text-orange-500 italic">iB</span>
        </motion.h1>
        <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold mt-2">
          Arquitectura + Inteligencia Artificial
        </p>
      </header>

      <div className="w-full max-w-md space-y-6">
        <div className="p-10 border-2 border-dashed border-zinc-800 rounded-[32px] bg-zinc-900/50">
          <Camera className="mx-auto mb-4 text-zinc-600" size={40} />
          <p className="text-sm text-zinc-400 font-medium">Subí el ambiente a transformar</p>
        </div>

        <button 
          onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
          className="w-full h-16 bg-white text-black rounded-full font-black text-lg hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          {loading ? "PROCESANDO..." : <><Sparkles size={20}/> GENERAR DISEÑO IA</>}
        </button>
      </div>

      <footer className="mt-20 opacity-20 text-[8px] font-bold tracking-[0.3em] uppercase italic">
        Design by Ignacio Santos Bottini
      </footer>
    </div>
  );
}
