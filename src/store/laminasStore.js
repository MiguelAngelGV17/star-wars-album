// import { create } from "zustand";

// export const laminasStore = create((set) => ({
//   laminasDelSobre: [], // las 5 láminas del sobre actual
//   laminasSeleccionadas: {}, // { films: [1, 2], people: [45, 67], ... }
//   mostrarOffcanvas: false,

//   setLaminasDelSobre: (laminas) => set({ laminasDelSobre: laminas }),
//   toggleOffcanvas: (estado) => set({ mostrarOffcanvas: estado }),

//   agregarLamina: (sección, id) =>
//     set((state) => {
//       const prev = state.laminasSeleccionadas[sección] || [];
//       if (prev.includes(id)) return state; // evitar duplicados
//       return {
//         laminasSeleccionadas: {
//           ...state.laminasSeleccionadas,
//           [sección]: [...prev, id],
//         },
//       };
//     }),

//   descartarLamina: (sección, id) =>
//     set((state) => ({
//       laminasSeleccionadas: {
//         ...state.laminasSeleccionadas,
//         [sección]: (state.laminasSeleccionadas[sección] || []).filter(
//           (item) => item !== id
//         ),
//       },
//     })),
// }));

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

      agregarLamina: (seccion, numero, idEnApi, tipo) => {
        const { album } = get();

        const yaExiste = album[seccion].some((l) => l.idEnApi === idEnApi);
        if (yaExiste) return;

        const nuevaLamina = { numero, idEnApi, tipo };
        const nuevoAlbum = {
          ...album,
          [seccion]: [...album[seccion], nuevaLamina],
        };

        set({ album: nuevoAlbum });
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
