import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, X, ChevronRight, Camera } from 'lucide-react';

const roomTypes = [
  { value: 'living_room', label: 'Sala de Estar' },
  { value: 'bedroom', label: 'Recámara' },
  { value: 'kitchen', label: 'Cocina' },
  { value: 'bathroom', label: 'Baño' },
  { value: 'office', label: 'Oficina / Estudio' },
  { value: 'dining_room', label: 'Comedor' },
  { value: 'studio', label: 'Departamento / Estudio' },
];

const budgetRanges = [
  { value: 'low', label: '$3,000 – $10,000 USD' },
  { value: 'medium', label: '$10,000 – $30,000 USD' },
  { value: 'high', label: '$30,000 – $80,000 USD' },
  { value: 'premium', label: '+$80,000 USD' },
];

const STEPS = ['Espacio', 'Estilo', 'Generar'];

export default function DesignStudio() {
  const [step, setStep] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [style, setStyle] = useState('');
  const [budget, setBudget] = useState('');
  const [sketchPreview, setSketchPreview] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setSketchPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter">
            STUDIO <span className="text-orange-500 italic">iB</span>
          </h1>
          <p className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold mt-2">
            Arquitectura + Inteligencia Artificial
          </p>
        </motion.div>

        {/* Pasos */}
        <div className="flex gap-8 mb-10 border-b border-zinc-800">
          {STEPS.map((label, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`pb-4 text-sm font-bold transition-all ${
                step === i ? 'text-orange-500 border-b-2 border-orange-500' : 'text-zinc-500'
              }`}
            >
              0{i + 1}. {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Proyecto</label>
                  <input 
                    className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all"
                    placeholder="Ej: Reforma Palermo"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Tipo de Espacio</label>
                  <select 
                    className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl focus:outline-none text-zinc-400"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                  >
                    <option value="">Seleccionar...</option>
                    {roomTypes.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Subida de imagen */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Boceto o Plano</label>
                <div className="border-2 border-dashed border-zinc-800 rounded-3xl p-12 text-center hover:bg-zinc-900/50 transition-all cursor-pointer relative">
                  {!sketchPreview ? (
                    <>
                      <Camera className="mx-auto mb-4 text-zinc-700" size={48} />
                      <p className="text-zinc-500 text-sm">Subí una foto del ambiente o un plano</p>
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                    </>
                  ) : (
                    <div className="relative inline-block">
                      <img src={sketchPreview} className="max-h-40 rounded-xl" />
                      <button onClick={() => setSketchPreview(null)} className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"><X size={12}/></button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => setStep(1)}
                  className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-all"
                >
                  Elegir Estilo <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
               <Sparkles className="mx-auto text-orange-500 mb-4" size={40} />
               <h2 className="text-2xl font-bold italic">Próximamente: Selector de Estilos</h2>
               <p className="text-zinc-500 mt-2">Estamos integrando los modelos de renderizado...</p>
               <button onClick={() => setStep(0)} className="mt-8 text-zinc-500 underline">Volver</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Branding Footer */}
        <div className="mt-20 pt-10 border-t border-zinc-900 flex flex-col items-center gap-4">
           <p className="text-zinc-600 text-[10px] tracking-widest uppercase">Diseño exclusivo para Ignacio Santos Bottini</p>
           <a href="https://instagram.com/ib.arquitectura_" target="_blank" className="text-zinc-400 hover:text-white transition-colors">@ib.arquitectura_</a>
        </div>
      </div>
    </div>
  );
}
