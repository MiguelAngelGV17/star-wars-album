import { Nav } from "react-bootstrap";
import { GrChapterAdd } from "react-icons/gr";
import { MdCollections } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div data-bs-theme="dark">
        <header className="d-flex">
          <aside className="d-flex flex-column me-auto mb-4">
            <h1 className="mb-0 text-warning">STAR WARS</h1>
            <span>Álbum digital</span>
          </aside>
          <aside className="ms-auto">
            <Nav
              defaultActiveKey="/mi-album"
              className="fw-bold justify-content-end"
            >
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/obtener-laminas"
                  eventKey="link-2"
                  className="text-white d-flex align-items-center gap-2"
                >
                  <GrChapterAdd />
                  Obtener Láminas
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/mi-album"
                  eventKey="link-1"
                  className="text-white d-flex align-items-center gap-2"
                >
                  <MdCollections />
                  Mi Álbum
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </aside>
        </header>
        <div className="w-100">{/* <SectionsComponent /> */}</div>
      </div>
    </div>
  );
};

export default Navbar;
