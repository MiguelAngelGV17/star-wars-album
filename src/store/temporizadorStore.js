import { create } from "zustand";
import { persist } from "zustand/middleware";

export const temporizadorParaSobre = create(
  persist(
    (set, get) => ({
      inhabilitarSobre: false,
      tiempoRestante: 0,
      intervalo: null,

      iniciarTemporizador: (duración = 5) => {
        if (get().intervalo) return;

        set({ inhabilitarSobre: true, tiempoRestante: duración });

        const idIntervalo = setInterval(() => {
          set((state) => {
            const nuevoTiempo = state.tiempoRestante - 1;
            if (nuevoTiempo <= 0) {
              clearInterval(idIntervalo);
              return {
                tiempoRestante: 0,
                inhabilitarSobre: false,
                intervalo: null,
              };
            }
            return { tiempoRestante: nuevoTiempo };
          });
        }, 1000);

        set({ intervalo: idIntervalo });
      },

      // reiniciarTemporizador: () => {
      //   const { intervalo } = get();
      //   if (intervalo) clearInterval(intervalo);
      //   set({ tiempoRestante: 0, inhabilitarSobre: false, intervalo: null });
      // },
    }),
    {
      name: "timer-storage",
      partialize: (state) => ({
        inhabilitarSobre: state.inhabilitarSobre,
        tiempoRestante: state.tiempoRestante,
      }),
    }
  )
);
