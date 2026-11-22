import { create } from "zustand";

export interface ItemGuardado {
  id: string;
  titulo: string;
  subtitulo: string; // Empresa, institución o categoría
  tipo: "empleo" | "curso" | "recurso";
}

interface ActivityState {
  favoritos: ItemGuardado[];
  postulaciones: ItemGuardado[];
  aprendizaje: ItemGuardado[];
  toggleFavorito: (item: ItemGuardado) => void;
  toggleAprendizaje: (item: ItemGuardado) => void;
  agregarPostulacion: (item: ItemGuardado) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  favoritos: [],
  postulaciones: [],
  aprendizaje: [],

  toggleFavorito: (item) =>
    set((state) => {
      const existe = state.favoritos.some((fav) => fav.id === item.id);
      return {
        favoritos: existe
          ? state.favoritos.filter((fav) => fav.id !== item.id)
          : [...state.favoritos, item],
      };
    }),

  toggleAprendizaje: (item) =>
    set((state) => {
      const existe = state.aprendizaje.some((apr) => apr.id === item.id);
      return {
        aprendizaje: existe
          ? state.aprendizaje.filter((apr) => apr.id !== item.id)
          : [...state.aprendizaje, item],
      };
    }),

  agregarPostulacion: (item) =>
    set((state) => {
      const existe = state.postulaciones.some((post) => post.id === item.id);
      if (existe) return state;
      return {
        postulaciones: [...state.postulaciones, item],
      };
    }),
}));