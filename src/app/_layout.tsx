import { useEffect } from "react";
import { Stack } from "expo-router";
import { supabase } from "../../lib/supabase";
import { useAuthStore } from "../../store/useAuthStore";

export default function RootLayout() {
  const iniciarSesion = useAuthStore((state) => state.iniciarSesion);
  const cerrarSesion = useAuthStore((state) => state.cerrarSesion);

  useEffect(() => {
    // 1. Verificar si ya existe una sesión guardada al abrir la app
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const nombre =
          session.user.user_metadata?.full_name ||
          session.user.email?.split("@")[0] ||
          "Usuario";

        iniciarSesion({
          nombre,
          email: session.user.email || "",
          proveedor: session.user.app_metadata?.provider || "Correo",
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const nombre =
          session.user.user_metadata?.full_name ||
          session.user.email?.split("@")[0] ||
          "Usuario";

        iniciarSesion({
          nombre,
          email: session.user.email || "",
          proveedor: session.user.app_metadata?.provider || "Correo",
        });
      } else {
        cerrarSesion();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}