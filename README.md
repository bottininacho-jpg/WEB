// =========================
    body { font-family: Arial; background:#111; color:white; text-align:center; }
    .box { background:#222; padding:20px; border-radius:10px; margin-top:50px; }
    button { padding:10px 20px; cursor:pointer; }
    img { max-width:300px; margin:10px; border-radius:10px; }
  </style>
</head>
<body>

<h1>Generador de Casas con IA</h1>

<div class="box">
  <input type="file" id="fileInput" />
  <br><br>
  <button onclick="generate()">Generar Diseño</button>

  <div id="result"></div>
</div>

<script>
async function generate() {
  const file = document.getElementById("fileInput").files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    document.getElementById("result").innerText = "Generando...";

    const res = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: reader.result })
    });

    const data = await res.json();

    const text = data.output[0].content[0].text;

    document.getElementById("result").innerText = text;
  };
}
</script>

</body>
</html>

// =========================
// IDEAS AVANZADAS YA INCLUIDAS
// =========================

// - Prompt de arquitecto experto
// - Estimación de costos
// - Generación de múltiples renders
// - Base para agregar marketplace
// - Escalable a app profesional

// =========================
// PARA QUE SEA MILLONARIA
// =========================

// Próximas mejoras:
// 1. Generar imágenes reales (DALL·E / SD)
// 2. Integrar catálogo de muebles
// 3. Exportar a PDF / Revit
// 4. Suscripción premium
// 5. IA que detecte ambientes automáticamente

// =========================
// FIN
// =========================
