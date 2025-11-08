import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { laminasStore } from "../store/laminasStore";

function Example() {
  const [show, setShow] = useState(false);
  const { reiniciarAlbum } = laminasStore();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleReinicio = () => {
    reiniciarAlbum();
    setShow(false);
  };

  return (
    <>
      <Button variant="outline-warning" onClick={handleShow} className="mb-3">
        Reiniciar Álbum
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        data-bs-theme={"dark"}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            Precaución: Reinicio de Álbum
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta acción es irreversible, ¿Confirmas que deseas continuar?.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            NO
          </Button>
          <Button variant="danger" onClick={handleReinicio}>
            Sí, reiniciar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
