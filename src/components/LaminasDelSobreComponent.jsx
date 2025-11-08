import { Button, Spinner } from "react-bootstrap";
import { laminasStore } from "../store/laminasStore";
import { useEffect, useState } from "react";
import { useFetchIdMappings } from "../hooks/useFetchIdMappings";

const traducirSección = {
  films: { name: "Película" },
  people: { name: "Personaje" },
  starships: { name: "Nave" },
};

const LaminasDelSobre = () => {
  const {
    mostrarOffcanvas,
    toggleOffcanvas,
    laminasDelSobre,
    agregarLamina,
    album,
  } = laminasStore();

  const { idMappings, loading } = useFetchIdMappings();

  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [accionesTomadas, setAccionesTomadas] = useState({});
  const [laminasStorage, setLaminasStorage] = useState([]);

  useEffect(() => {
    const flat = Object.entries(album).flatMap(([seccion, arr]) =>
      (arr || []).map((item) => ({ ...item, seccion }))
    );
    setLaminasStorage(flat);
  }, [album]);

  useEffect(() => {
    const fetchDatos = async () => {
      if (!laminasDelSobre.length || !idMappings) return;
      setCargando(true);

      const especiales = {
        films: new Set(idMappings.films), // todas las películas
        people: new Set(idMappings.people.slice(0, 20)), // primeras 20
        starships: new Set(idMappings.starships.slice(0, 10)), // primeras 10
      };

      const peticiones = laminasDelSobre.flatMap((grupo) =>
        grupo.ids.map((id) =>
          fetch(`https://swapi.dev/api/${grupo.sección}/${id.idEnApi}/`)
            .then((r) => r.json())
            .then((res) => ({
              ...res,
              seccion: grupo.sección,
              seccionEspañol: traducirSección[grupo.sección]?.name,
              numero: id.numero,
              idEnApi: id.idEnApi,
              tipo: especiales[grupo.sección].has(id.idEnApi)
                ? "especial"
                : "regular",
            }))
        )
      );

      const resultados = await Promise.all(peticiones);
      setDatos(resultados);
      setCargando(false);
    };

    fetchDatos();
  }, [laminasDelSobre]);

  // Registra que una carta fue procesada
  const marcarAcción = (sección, idEnApi) => {
    const clave = `${sección}-${idEnApi}`;
    setAccionesTomadas((prev) => ({
      ...prev,
      [clave]: true,
    }));
  };

  const todasResueltas =
    datos.length > 0 && Object.keys(accionesTomadas).length === datos.length;

  const cerrar = () => {
    if (!todasResueltas) return;
    toggleOffcanvas(false);
    setDatos([]);
    setAccionesTomadas({});
  };

  return (
    <div className={`overlay-laminas ${mostrarOffcanvas ? "show" : ""}`}>
      <div className="overlay-content bg-dark text-light p-4 rounded shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Nuevo sobre</h4>
          <Button
            variant={todasResueltas ? "light" : "secondary"}
            size="sm"
            onClick={cerrar}
            disabled={!todasResueltas}
          >
            {todasResueltas
              ? "Cerrar sobre"
              : "Para cerrar, decide qué hacer con todas las láminas"}
          </Button>
        </div>

        {cargando ? (
          <div className="text-center mt-4">
            <Spinner animation="border" variant="light" />
            <p className="mt-2">Cargando láminas...</p>
          </div>
        ) : (
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {datos.map((item, i) => {
              const clave = `${item.seccion}-${item.idEnApi}`;
              const procesada = accionesTomadas[clave];

              const esEspecial = item.tipo === "especial";

              const estaEnElAlbum = laminasStorage.some(
                (l) => l.seccion === item.seccion && l.idEnApi === item.idEnApi
              );
              return (
                <div
                  key={i}
                  className={`card bg-secondary text-light p-3 rounded text-center d-flex justify-content-between ${
                    esEspecial ? "border-info text- bg-dark" : "bg-secondary"
                  } ${procesada ? "opacity-50" : ""}`}
                  style={{ width: "160px", minHeight: "170px" }}
                >
                  <div className="small text-warning mb-2 d-flex flex-column justify-content-around">
                    <strong className="d-flex justify-content-around">
                      <span>{item.seccionEspañol}</span>
                      <span>#{item.numero}</span>
                    </strong>
                    <span>{esEspecial ? "Cat. Especial" : "Cat. Regular"}</span>
                  </div>
                  <strong>{item.name || item.title}</strong>
                  <div className="d-flex flex-column gap-2">
                    {!estaEnElAlbum ? (
                      <Button
                        variant="success"
                        size="sm"
                        disabled={procesada}
                        onClick={() => {
                          agregarLamina(
                            item.seccion,
                            item.numero,
                            item.idEnApi,
                            item.tipo
                          );
                          marcarAcción(item.seccion, item.idEnApi);
                        }}
                      >
                        Agregar al álbum
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        size="sm"
                        disabled={procesada}
                        onClick={() => {
                          marcarAcción(item.seccion, item.idEnApi);
                        }}
                      >
                        Descartar
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LaminasDelSobre;
