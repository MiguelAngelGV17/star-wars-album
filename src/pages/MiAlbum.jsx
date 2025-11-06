import { Tab } from "bootstrap";
import React, { useState } from "react";
import { Tabs } from "react-bootstrap";
import { BiCameraMovie } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { RiSpaceShipFill } from "react-icons/ri";

const MiAlbum = () => {
  const [key, setKey] = useState("películas");
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
      fill
      data-bs-theme="dark"
    >
      <Tab
        eventKey="películas"
        title={
          <div className="d-flex align-items-center justify-content-center">
            <BiCameraMovie className="me-2" />
            Películas
          </div>
        }
      >
        Tab content for Películas
      </Tab>
      <Tab
        eventKey="personajes"
        title={
          <div className="d-flex align-items-center justify-content-center">
            <BsPeopleFill className="me-2" />
            Personajes
          </div>
        }
      >
        Tab content for Personajes
      </Tab>
      <Tab
        eventKey="naves"
        title={
          <div className="d-flex align-items-center justify-content-center">
            <RiSpaceShipFill className="me-2" />
            Naves
          </div>
        }
      >
        Tab content for Naves
      </Tab>
    </Tabs>
  );
};

export default MiAlbum;
