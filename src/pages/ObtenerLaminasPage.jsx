import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaQuestion } from "react-icons/fa";
import { useFetchIdMappings } from "../hooks/useFetchIdMappings";
import { temporizadorParaSobre } from "../store/temporizadorStore";
import { laminasStore } from "../store/laminasStore";
import LaminasDelSobre from "../components/LaminasDelSobreComponent";

function númeroAleatorio(max) {
  return Math.floor(Math.random() * max + 1);
}

const configuraciónUno = [
  {
    name: "films",
    length: 1,
  },
  {
    name: "people",
    length: 3,
  },
  {
    name: "starships",
    length: 1,
  },
];
const configuraciónDos = [
  {
    name: "films",
    length: 0,
  },
  {
    name: "people",
    length: 3,
  },
  {
    name: "starships",
    length: 2,
  },
];

const ObtenerLaminas = () => {
  const [contenedorDeIds, setContenedorDeIds] = useState([]);
  const { idMappings, loading } = useFetchIdMappings();

  const { inhabilitarSobre, tiempoRestante, iniciarTemporizador } =
    temporizadorParaSobre();

  const { setLaminasDelSobre, toggleOffcanvas } = laminasStore();

  const generarSobre = () => {
    if (inhabilitarSobre || loading) return;

    const configElegida =
      númeroAleatorio(2) === 1 ? configuraciónUno : configuraciónDos;

    const nuevoSobre = configElegida.map((item) => {
      const idsDisponibles = idMappings[item.name];
      if (!idsDisponibles) return { sección: item.name, ids: [] };

      const ids = Array.from({ length: item.length }, () => {
        const randomIndex = númeroAleatorio(idsDisponibles.length) - 1;
        return {
          numero: randomIndex + 1,
          idEnApi: idsDisponibles[randomIndex],
        };
      });

      return { sección: item.name, ids };
    });

    setContenedorDeIds(nuevoSobre);
    setLaminasDelSobre(nuevoSobre);
    toggleOffcanvas(true);
    iniciarTemporizador(1);
  };

  useEffect(() => {
    if (inhabilitarSobre && tiempoRestante > 0) {
      iniciarTemporizador(tiempoRestante);
    }
  }, []);

  return (
    <>
      <Row className="gap-3 justify-content-center position-relative">
        {inhabilitarSobre && (
          <p className="mt-3 text-warning fw-bold text-center">
            Por favor, espera {tiempoRestante} segundo
            {tiempoRestante !== 1 && "s"} para intentar de nuevo.
          </p>
        )}
        {!inhabilitarSobre && (
          <p className="mt-3 text-secondary fw-bold text-center">
            Nota: Luego de abrir un sobre, deberás esperar un poco para abrir
            uno nuevo.
          </p>
        )}
        {Array.from({ length: 4 }).map((_, indice) => (
          <Col
            sm={25}
            key={indice}
            className={`card sobre p-2 bg-dark text-light ${
              inhabilitarSobre ? "opacity-50" : ""
            }`}
            style={{
              height: "160px",
              width: "140px",
              pointerEvents: inhabilitarSobre ? "none" : "auto",
              transition: "opacity 0.3s ease",
            }}
            onClick={generarSobre}
          >
            <FaQuestion size={90} className="m-auto question text-secondary" />
          </Col>
        ))}
      </Row>
      <LaminasDelSobre />
    </>
  );
};

export default ObtenerLaminas;
