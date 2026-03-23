import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const generate = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "modern luxury living room" })
      });

      const data = await res.json();
      setImages([data.url]);

    } catch (e) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <div className="relative h-screen flex items-center px-10">

        <div>
          <p className="text-accent uppercase text-xs tracking-widest mb-4">
            Visualización con IA
          </p>

          <h1 className="text-6xl font-bold leading-tight">
            Tu espacio.
            <br />
            <span className="text-accent italic">Redefinido.</span>
          </h1>

          <p className="mt-6 text-muted max-w-md">
            Subí tu plano y generá visualizaciones hiperrealistas en segundos.
          </p>

          <button
            onClick={generate}
            className="mt-6 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "Generando..." : "Diseñar ahora"}
          </button>
        </div>

      </div>

      {/* RESULTADOS */}
      <div className="p-10 grid grid-cols-2 gap-4">
        {images.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl"
          />
        ))}
      </div>

    </div>
  );
}
