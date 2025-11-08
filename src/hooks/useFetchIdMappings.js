import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://swapi.dev/api";

const secciones = ["films", "people", "starships"];

export function useFetchIdMappings() {
  const [idMappings, setIdMappings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMappings = async () => {
      const stored = localStorage.getItem("idMappings");
      if (stored) {
        setIdMappings(JSON.parse(stored));
        setLoading(false);
        return;
      }

      const mappings = {};

      for (const name of secciones) {
        let results = [];
        let nextUrl = `${API_BASE}/${name}/`;

        // Fetch todas las páginas
        while (nextUrl) {
          const { data } = await axios.get(nextUrl);
          results = results.concat(data.results);
          nextUrl = data.next;
        }

        // Extraer IDs válidos desde la URL (ej: "https://swapi.dev/api/starships/9/")
        mappings[name] = results
          .map((item) => {
            const match = item.url.match(/\/(\d+)\/$/);
            return match ? parseInt(match[1], 10) : null;
          })
          .filter(Boolean);
      }

      localStorage.setItem("idMappings", JSON.stringify(mappings));
      setIdMappings(mappings);
      setLoading(false);
    };

    fetchMappings();
  }, []);

  return { idMappings, loading };
}
