import { create } from "zustand";
import { persist } from "zustand/middleware";

export const laminasStore = create(
  persist(
    (set, get) => ({
      mostrarOffcanvas: false,

      laminasDelSobre: [],

      album: {
        films: [],
        people: [],
        starships: [],
      },

      toggleOffcanvas: (estado) => set({ mostrarOffcanvas: estado }),

      setLaminasDelSobre: (laminas) => set({ laminasDelSobre: laminas }),

      agregarLamina: (seccion, numero, idEnApi, tipo, name) => {
        const { album } = get();

        const yaExiste = album[seccion].some((l) => l.idEnApi === idEnApi);
        if (yaExiste) return;

        const nuevaLamina = { seccion, numero, idEnApi, tipo, name };
        const nuevoAlbum = {
          ...album,
          [seccion]: [...album[seccion], nuevaLamina],
        };

        set({ album: nuevoAlbum });
      },

      reiniciarAlbum: () => {
        set((state) => ({
          album: {
            ...state.album,
            films: [],
            people: [],
            starships: [],
          },
        }));
      },

      limpiarSobre: () => set({ laminasDelSobre: [] }),
    }),
    {
      name: "laminas-storage",
      partialize: (state) => ({
        album: state.album,
      }),
    }
  )
);
