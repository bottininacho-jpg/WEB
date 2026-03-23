import { useState } from "react";

export default function Home() {
  const [roomType, setRoomType] = useState("");
  const [style, setStyle] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const generate = async () => {
    if (!roomType || !style || !budget) {
      alert("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      setImages([]);

      const prompts = [
        `Modern ${roomType} ${style} wide angle`,
        `Luxury ${roomType} ${style} interior`,
        `Detailed ${roomType} ${style} materials`,
        `Night lighting ${roomType} ${style}`
      ];

      let results = [];

      for (let prompt of prompts) {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt })
        });

        const data = await res.json();

        if (data?.url) {
          results.push(data.url);
        }
      }

      setImages(results);

    } catch (err) {
      console.error(err);
      alert("Error generando imágenes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Generador IA Arquitectura</h1>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Tipo de espacio (ej: living room)"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        />
      </div>

      <div>
        <input
          placeholder="Estilo (ej: modern)"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
      </div>

      <div>
        <input
          placeholder="Presupuesto"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>

      <button onClick={generate} disabled={loading}>
        {loading ? "Generando..." : "Generar"}
      </button>

      <div style={{ marginTop: 30 }}>
        {images.map((img, i) => (
          <img key={i} src={img} width={300} style={{ margin: 10 }} />
        ))}
      </div>
    </div>
  );
}
