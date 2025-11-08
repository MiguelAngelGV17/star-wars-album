import { Tab } from "bootstrap";
import { useState } from "react";
import { Tabs } from "react-bootstrap";
import { BiCameraMovie } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { RiSpaceShipFill } from "react-icons/ri";
import LaminaComponent from "../components/LaminaComponent";
import ReiniciaAlbumComponent from "../components/ReiniciarAlbumComponent";

const secciones = [
  {
    name: "films",
    label: "Películas",
    icon: <BiCameraMovie className="me-2" />,
    length: 6,
  },
  {
    name: "people",
    label: "Personajes",
    icon: <BsPeopleFill className="me-2" />,
    length: 82,
  },
  {
    name: "starships",
    label: "Naves",
    icon: <RiSpaceShipFill className="me-2" />,
    length: 36,
  },
];

const MiAlbum = () => {
  const [key, setKey] = useState("Películas");

  return (
    <>
      <ReiniciaAlbumComponent />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        fill
        data-bs-theme="dark"
      >
        {secciones.map((sec) => (
          <Tab
            key={sec.name}
            eventKey={sec.label}
            title={
              <div className="d-flex align-items-center justify-content-center">
                {sec.icon}
                {sec.label}
              </div>
            }
          >
            <article
              className="text-light"
              style={{
                height: "calc(100vh - 260px)",
                overflowY: "auto",
              }}
            >
              <LaminaComponent data={sec} limpiarData={key} />
            </article>
          </Tab>
        ))}
      </Tabs>
    </>
  );
};

export default MiAlbum;
