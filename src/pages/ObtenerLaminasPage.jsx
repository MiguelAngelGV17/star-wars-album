import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaQuestion } from "react-icons/fa";

function númeroAleatorio(max) {
  return Math.floor(Math.random() * max + 1);
}

const secciones = {
  films: { length: 6 },
  people: { length: 82 },
  starships: { length: 36 },
};

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

  const generarSobre = () => {
    const configElegida =
      númeroAleatorio(2) === 1 ? configuraciónUno : configuraciónDos;

    const nuevoSobre = configElegida.map((item) => {
      const longitudSección = secciones[item.name].length;

      const ids = Array.from({ length: item.length }, () =>
        númeroAleatorio(longitudSección)
      );
      return {
        sección: item.name,
        ids,
      };
    });

    setContenedorDeIds(nuevoSobre);
  };

  console.log(contenedorDeIds);

  return (
    <Row className="gap-3 justify-content-center">
      {Array.from({ length: 4 }).map((_, indice) => (
        <Col
          sm={25}
          key={indice}
          className="card sobre p-2 bg-dark text-light "
          style={{
            height: "160px",
            width: "140px",
            pointerEvents: "",
            opacity: "",
          }}
          onClick={generarSobre}
        >
          <FaQuestion size={90} className="m-auto question text-secondary" />
        </Col>
      ))}
    </Row>
  );
};

export default ObtenerLaminas;
