import { create } from "zustand";

interface Usuario {
  nombre: string;
  email: string;
  proveedor: string;
}

interface AuthState {
  estaAutenticado: boolean;
  usuario: Usuario | null;
  iniciarSesion: (datosUsuario: Usuario) => void;
  cerrarSesion: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  estaAutenticado: false,
  usuario: null,

  iniciarSesion: (datosUsuario) =>
    set({
      estaAutenticado: true,
      usuario: datosUsuario,
    }),

  cerrarSesion: () =>
    set({
      estaAutenticado: false,
      usuario: null,
    }),
}));