import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Loader2, Sparkles, X, ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Nota: Estos componentes deben existir en tu carpeta /components/
import StyleSelector from '../components/StyleSelector';
import ResultsGallery from '../components/ResultsGallery';
import CostBreakdown from '../components/CostBreakdown';
import RecommendationsPanel from '../components/RecommendationsPanel';
import GenerationTimer from '../components/GenerationTimer';
import PdfExport from '../components/PdfExport';

const roomTypes = [
  { value: 'living_room', label: 'Sala de Estar' },
  { value: 'bedroom', label: 'Recámara' },
  { value: 'kitchen', label: 'Cocina' },
  { value: 'bathroom', label: 'Baño' },
  { value: 'office', label: 'Oficina / Estudio' },
  { value: 'dining_room', label: 'Comedor' },
];

const budgetRanges = [
  { value: 'low', label: '$3,000 – $10,000 USD' },
  { value: 'medium', label: '$10,000 – $30,000 USD' },
  { value: 'high', label: '$30,000 – $80,000 USD' },
  { value: 'premium', label: '+$80,000 USD' },
];

const styleNames = {
  modern: 'Modern', minimalist: 'Minimalist', industrial: 'Industrial',
  scandinavian: 'Scandinavian', luxury: 'Luxury', bohemian: 'Bohemian', classic: 'Classic',
};

const STEPS = ['Espacio', 'Estilo', 'Generar'];

export default function DesignStudio() {
  const [step, setStep] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [style, setStyle] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');
  const [sketchPreview, setSketchPreview] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState('');
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const fileRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setSketchPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setGenStep('Iniciando motores de IA...');

    try {
      const roomLabel = roomTypes.find(r => r.value === roomType)?.label || roomType;
      const styleName = styleNames[style] || style;

      // 1. SIMULACIÓN DE PROCESAMIENTO DE IMAGEN (O INTEGRACIÓN CON API)
      setGenStep('Analizando dimensiones y luz...');
      await new Promise(r => setTimeout(r, 2000));

      // 2. GENERACIÓN DE DATOS (Presupuesto y Recomendaciones)
      setGenStep('Calculando costos y materiales...');
      
      // Aquí podrías llamar a tu propia API Route de Next.js que use OpenAI
      // Por ahora, simulamos la respuesta estructurada para que el componente sea funcional
      const mockCosts = {
        furniture: 4500,
        materials: 3200,
        lighting: 1500,
        decoration: 1200,
        labor: 2500,
        total: 12900
      };

      const mockRecs = `### Propuesta para tu ${roomLabel}
      **Estilo:** ${styleName}
      **Paleta de colores:** Tonos neutros con acentos en madera natural.
      **Iluminación:** Se recomienda luz cálida indirecta en techos y lámparas de pie de diseño minimalista.
      **Tip profesional:** Aprovecha la entrada de luz natural para resaltar las texturas de los materiales elegidos.`;

      // 3. GENERACIÓN DE IMÁGENES (Simulando 4 renders)
      setGenStep('Renderizando visualizaciones 8K...');
      const mockImages = [
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1616489953149-80497cc305d2?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1616137422495-1e902b72174c?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?auto=format&fit=crop&q=80&w=1200"
      ];

      setResults({
        images: mockImages,
        costs: mockCosts,
        recommendations: mockRecs
      });

    } catch (err) {
      console.error(err);
      setError("Hubo un problema al conectar con el servidor de IA. Intenta de nuevo.");
    } finally {
      setIsGenerating(false);
      setGenStep('');
    }
  };

  const resetAll = () => {
    setResults(null); setStep(0); setSketchPreview(null);
    setStyle(''); setRoomType(''); setBudget(''); setDimensions(''); setNotes(''); setProjectName('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-accent"></span>
            <p className="text-accent text-xs font-bold tracking-widest uppercase">Studio iB</p>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            Interiorismo <span className="text-accent italic">Gen-AI</span>
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Transforma tus ideas en renders profesionales y presupuestos detallados en segundos.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-10 border-b border-border overflow-x-auto no-scrollbar">
          {STEPS.map((label, i) => (
            <button
              key={i}
              disabled={isGenerating}
              onClick={() => i < step && setStep(i)}
              className={`relative px-6 py-4 text-sm font-semibold transition-all whitespace-nowrap ${
                step === i ? 'text-foreground' : i < step ? 'text-accent cursor-pointer' : 'text-muted-foreground opacity-50'
              }`}
            >
              <span className="text-[10px] mr-2 font-mono">{String(i + 1).padStart(2, '0')}</span>
              {label}
              {step === i && (
                <motion.div layoutId="activeStep" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 0: Configuración */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-tighter">Nombre del Proyecto</Label>
                  <Input placeholder="Residencia Santos" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="rounded-xl border-border/60 bg-secondary/30 h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-tighter">Tipo de Espacio *</Label>
                  <Select value={roomType} onValueChange={setRoomType}>
                    <SelectTrigger className="h-12 rounded-xl bg-secondary/30">
                      <SelectValue placeholder="Seleccionar espacio..." />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-tighter">Dimensiones Aprox.</Label>
                  <Input placeholder="Ej: 4x5m o 20m²" value={dimensions} onChange={(e) => setDimensions(e.target.value)} className="h-12 rounded-xl bg-secondary/30" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-tighter">Rango de Inversión *</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger className="h-12 rounded-xl bg-secondary/30">
                      <SelectValue placeholder="Rango de presupuesto..." />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map(b => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold tracking-tighter">Requerimientos Específicos</Label>
                <Textarea placeholder="Ej: Necesito espacio para 4 personas, estilo muy luminoso, usar madera clara..." value={notes} onChange={(e) => setNotes(e.target.value)} className="rounded-xl bg-secondary/30 min-h-[100px]" />
              </div>

              <div className="p-8 border-2 border-dashed border-border/40 rounded-3xl hover:border-accent/40 transition-colors group">
                {!sketchPreview ? (
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-accent" />
                    </div>
                    <p className="text-sm font-medium">Subir plano o boceto</p>
                    <p className="text-xs text-muted-foreground mt-1">Formatos JPG, PNG (máx 10MB)</p>
                    <input ref={fileRef} type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                  </label>
                ) : (
                  <div className="relative flex justify-center">
                    <img src={sketchPreview} alt="Preview" className="max-h-56 rounded-2xl shadow-2xl border border-border" />
                    <Button size="icon" variant="destructive" className="absolute -top-3 -right-3 rounded-full h-8 w-8" onClick={() => setSketchPreview(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setStep(1)} disabled={!roomType || !budget} className="h-14 px-10 rounded-full bg-foreground text-background hover:bg-accent transition-all text-base font-bold gap-2">
                  Elegir Estilo <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: Estilo */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
              <div className="bg-secondary/20 p-4 rounded-2xl">
                <p className="text-sm font-medium">Define la estética visual que deseas aplicar al espacio.</p>
              </div>
              <StyleSelector selected={style} onSelect={setStyle} />
              <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={() => setStep(0)} className="rounded-full">Atrás</Button>
                <Button onClick={() => setStep(2)} disabled={!style} className="h-14 px-10 rounded-full bg-foreground text-background hover:bg-accent transition-all font-bold gap-2">
                  Configurar Generación <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Generar y Resultados */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              
              {/* Resumen previo */}
              {!results && !isGenerating && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 bg-secondary/40 rounded-2xl text-center">
                    <p className="text-[9px] uppercase font-bold text-muted-foreground">Espacio</p>
                    <p className="text-sm font-semibold truncate">{roomTypes.find(r => r.value === roomType)?.label}</p>
                  </div>
                  <div className="p-4 bg-secondary/40 rounded-2xl text-center">
                    <p className="text-[9px] uppercase font-bold text-muted-foreground">Estilo</p>
                    <p className="text-sm font-semibold">{styleNames[style]}</p>
                  </div>
                  {/* ... más etiquetas ... */}
                </div>
              )}

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center gap-3 text-destructive">
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {!isGenerating && !results && (
                <div className="flex flex-col items-center py-20 bg-accent/5 rounded-[40px] border border-accent/10">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute opacity-10 pointer-events-none">
                    <Sparkles className="w-64 h-64 text-accent" />
                  </motion.div>
                  <Button onClick={handleGenerate} className="h-20 px-12 rounded-full bg-foreground text-background hover:bg-accent hover:scale-105 transition-all text-xl font-black gap-4 shadow-2xl shadow-accent/20">
                    <Sparkles className="w-6 h-6" />
                    GENERAR RENDER
                  </Button>
                  <p className="mt-6 text-muted-foreground text-sm font-medium italic">El proceso toma aprox. 30 segundos</p>
                </div>
              )}

              {isGenerating && (
                <div className="flex flex-col items-center py-20 space-y-8">
                  <GenerationTimer isRunning={isGenerating} />
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 animate-pulse">{genStep}</h3>
                    <p className="text-muted-foreground">Nuestra IA está diseñando cada detalle...</p>
                  </div>
                  <div className="flex gap-2">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }} className="w-3 h-3 rounded-full bg-accent" />
                    ))}
                  </div>
                </div>
              )}

              {results && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-6">
                    <div>
                      <h2 className="text-3xl font-bold">Proyecto Finalizado</h2>
                      <p className="text-muted-foreground">Revisa las visualizaciones y el desglose de costos.</p>
                    </div>
                    <PdfExport 
                      images={results.images} 
                      costs={results.costs} 
                      recommendations={results.recommendations}
                      projectName={projectName || "Nuevo Diseño iB"}
                    />
                  </div>

                  <ResultsGallery images={results.images} />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <CostBreakdown costs={results.costs} />
                    <RecommendationsPanel text={results.recommendations} />
                  </div>

                  {/* Footer de contacto - Tu Instagram */}
                  <div className="p-8 rounded-[32px] bg-gradient-to-br from-zinc-900 to-black text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <h4 className="text-xl font-bold mb-1">¿Quieres llevar esto a la realidad?</h4>
                      <p className="text-zinc-400 text-sm">Ofrecemos servicios de arquitectura y dirección de obra.</p>
                    </div>
                    <a href="https://www.instagram.com/ib.arquitectura_" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:bg-accent hover:text-white transition-colors">
                      Contactar @ib.arquitectura_
                    </a>
                  </div>

                  <Button variant="outline" onClick={resetAll} className="w-full h-14 rounded-2xl border-dashed">
                    Crear otro diseño
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
