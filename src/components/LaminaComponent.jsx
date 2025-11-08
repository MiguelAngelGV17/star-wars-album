import axios from "axios";
import { laminasStore } from "../store/laminasStore";
import { useState, useEffect } from "react";
import LaminaInfoComponent from "../components/LaminaInfoComponent";

const LaminaComponent = ({ data, limpiarData }) => {
  const { album } = laminasStore();
  const [infoDeLamina, setInfoDeLamina] = useState(null);

  // Accedemos a la sección actual del álbum (por ejemplo "films", "people" o "starships")
  const laminasDeSeccion = album?.[data.name] || [];

  // Cada vez que cambia la sección, se limpia la info de lámina
  useEffect(() => {
    setInfoDeLamina(null);
  }, [limpiarData]);

  // Consulta la información de una lámina específica
  const handleConsultarLaminaInfo = async (seccion, id) => {
    try {
      const { data } = await axios.get(
        `https://swapi.dev/api/${seccion}/${id}/`
      );
      setInfoDeLamina(data);
    } catch (error) {
      console.error("Error consultando la lámina:", error);
    }
  };

  // Si hay info de lámina, mostramos solo el detalle
  if (infoDeLamina) {
    return (
      <>
        <button
          className="btn btn-secondary mt-1 position-fixed"
          onClick={() => setInfoDeLamina(null)}
        >
          Volver al álbum
        </button>
        <div className="d-flex mt-5 ">
          <LaminaInfoComponent data={infoDeLamina} />
        </div>
      </>
    );
  }

  // Si no hay infoDeLamina, mostramos las tarjetas
  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center">
      {Array.from({ length: data.length }).map((_, indice) => {
        const numero = indice + 1;

        // Buscamos si esta lámina existe en el álbum
        const laminaEnAlbum = laminasDeSeccion.find((l) => l.numero === numero);

        return (
          <div
            key={numero}
            className={`card card-album p-2 d-flex flex-column justify-content-center align-items-center rounded shadow-sm 
              ${
                laminaEnAlbum
                  ? "bg-warning text-dark"
                  : "bg-dark text-light opacity-50"
              } ${laminaEnAlbum?.tipo === "especial" ? "especial" : ""}`}
            style={{
              height: "160px",
              width: "140px",
              cursor: laminaEnAlbum ? "pointer" : "default",
            }}
            onClick={
              laminaEnAlbum
                ? () =>
                    handleConsultarLaminaInfo(
                      laminaEnAlbum.seccion,
                      laminaEnAlbum.idEnApi
                    )
                : undefined
            }
          >
            <h1>{numero}</h1>
            {laminaEnAlbum && (
              <strong className="mt-auto text-center small">
                {laminaEnAlbum.name || laminaEnAlbum.title}
              </strong>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LaminaComponent;
