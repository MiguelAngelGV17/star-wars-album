import { Tab } from "bootstrap";
import { useEffect, useState } from "react";
import { Tabs } from "react-bootstrap";
import { BiCameraMovie } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { RiSpaceShipFill } from "react-icons/ri";
import LaminaComponent from "../components/LaminaComponent";
import axios from "axios";

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
  const [sections, setSections] = useState([]);

  const fetchAllPages = async (url, accumulated = []) => {
    const { data } = await axios.get(url);
    const newResults = [...accumulated, ...data.results];
    if (data.next) {
      return fetchAllPages(data.next, newResults);
    }
    return newResults;
  };

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const promises = secciones.map(async (sec) => {
          const data = await fetchAllPages(
            `https://swapi.dev/api/${sec.name}/`
          );
          return { [sec.name]: data };
        });

        const results = await Promise.all(promises);
        const merged = Object.assign({}, ...results);
        setSections(merged);
      } catch (error) {
        console.error("Error al obtener las secciones:", error);
      }
    };

    fetchSections();
  }, []);

  return (
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
              height: "calc(100vh - 215px)",
              overflow: "auto",
            }}
          >
            <LaminaComponent data={sec} />
          </article>
        </Tab>
      ))}
    </Tabs>
  );
};

export default MiAlbum;
