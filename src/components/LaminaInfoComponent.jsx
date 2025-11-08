import { useEffect, useState } from "react";
import axios from "axios";

const LaminaInfoComponent = ({ data = null }) => {
  const [valoresProcesados, setValoresProcesados] = useState({});

  useEffect(() => {
    if (!data) return;

    const procesarValores = async () => {
      const resultado = {};

      for (const [key, value] of Object.entries(data)) {
        // Detecta si es una URL o arreglo de URLs
        if (typeof value === "string" && value.startsWith("http")) {
          try {
            const { data: res } = await axios.get(value);
            resultado[key] = res.name || res.title || value;
          } catch {
            resultado[key] = value;
          }
        } else if (
          Array.isArray(value) &&
          value.length &&
          typeof value[0] === "string" &&
          value[0].startsWith("http")
        ) {
          try {
            const results = await Promise.all(
              value.map(async (url) => {
                const { data: res } = await axios.get(url);
                return res.name || res.title || url;
              })
            );
            resultado[key] = results.join(", ");
          } catch {
            resultado[key] = value.join(", ");
          }
        } else {
          resultado[key] = value;
        }
      }

      setValoresProcesados(resultado);
    };

    procesarValores();
  }, [data]);

  // Si aún no ha terminado de procesar
  if (!Object.keys(valoresProcesados).length) {
    return <p className="text-center mt-3">Cargando información...</p>;
  }

  return (
    <div className="p-3">
      {Object.entries(valoresProcesados).map(([key, value], idx) => (
        <div
          key={idx}
          className="d-flex flex-wrap mb-2"
          style={{
            overflowWrap: "anywhere",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          <span className="fw-bold me-2 text-capitalize">{key}:</span>
          <span>{String(value)}</span>
        </div>
      ))}
    </div>
  );
};

export default LaminaInfoComponent;
