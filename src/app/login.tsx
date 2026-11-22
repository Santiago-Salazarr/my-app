import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router, Stack } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useAuthStore } from "../../store/useAuthStore";
import { supabase } from "../../lib/supabase";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [esRegistro, setEsRegistro] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = useAuthStore((state) => state.iniciarSesion);

  const manejarLoginCorreo = async () => {
    if (!email.trim() || !password.trim() || (esRegistro && !nombre.trim())) {
      Alert.alert("Campos requeridos", "Por favor completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Contraseña corta",
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    setCargando(true);

    try {
      if (esRegistro) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: nombre.trim(),
            },
          },
        });

        if (error) {
          Alert.alert("Error al registrarse", error.message);
          return;
        }

        if (data.user) {
          iniciarSesion({
            nombre: nombre.trim(),
            email: data.user.email || email.trim(),
            proveedor: "Correo",
          });
          router.replace("/");
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) {
          Alert.alert("Error de acceso", error.message);
          return;
        }

        if (data.user) {
          const nombreGuardado =
            data.user.user_metadata?.full_name || email.split("@")[0];

          iniciarSesion({
            nombre: nombreGuardado,
            email: data.user.email || email.trim(),
            proveedor: "Correo",
          });
          router.replace("/");
        }
      }
    } catch (err) {
      Alert.alert("Error de conexión", "No se pudo conectar con Supabase.");
    } finally {
      setCargando(false);
    }
  };

  const manejarLoginSocial = async (proveedor: "google" | "linkedin_oidc") => {
    setCargando(true);
    try {
      const redirectUrl = Linking.createURL("auth/callback");

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: proveedor,
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });

      if (error) {
        Alert.alert("Error OAuth", error.message);
        return;
      }

      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUrl
        );

        if (result.type === "success" && result.url) {
          const fragmento = result.url.split("#")[1];
          if (fragmento) {
            const params = new URLSearchParams(fragmento);
            const access_token = params.get("access_token");
            const refresh_token = params.get("refresh_token");

            if (access_token && refresh_token) {
              const { data: sessionData, error: sessionError } =
                await supabase.auth.setSession({
                  access_token,
                  refresh_token,
                });

              if (sessionError) {
                Alert.alert("Error de sesión", sessionError.message);
                return;
              }

              if (sessionData.user) {
                const nombreSocial =
                  sessionData.user.user_metadata?.full_name ||
                  sessionData.user.user_metadata?.name ||
                  sessionData.user.email?.split("@")[0] ||
                  "Usuario";

                iniciarSesion({
                  nombre: nombreSocial,
                  email: sessionData.user.email || "",
                  proveedor: proveedor === "google" ? "Google" : "LinkedIn",
                });
                router.replace("/");
              }
            }
          }
        }
      }
    } catch (err) {
      Alert.alert(
        "Error de autenticación",
        "No se pudo completar el inicio de sesión social."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Ionicons name="briefcase" size={32} color="#2563EB" />
          </View>
          <Text style={styles.brand}>Tuluá Conecta</Text>
          <Text style={styles.subtitle}>
            Tu puente hacia oportunidades laborales y educativas en la región.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {esRegistro ? "Crea tu cuenta" : "Inicia sesión para continuar"}
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.socialButton,
              styles.linkedinButton,
              (pressed || cargando) && styles.pressed,
            ]}
            onPress={() => manejarLoginSocial("linkedin_oidc")}
            disabled={cargando}
          >
            <FontAwesome name="linkedin-square" size={20} color="#FFFFFF" />
            <Text style={styles.linkedinText}>Continuar con LinkedIn</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.socialButton,
              styles.googleButton,
              (pressed || cargando) && styles.pressed,
            ]}
            onPress={() => manejarLoginSocial("google")}
            disabled={cargando}
          >
            <FontAwesome name="google" size={19} color="#DB4437" />
            <Text style={styles.googleText}>Continuar con Google</Text>
          </Pressable>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>o con tu correo</Text>
            <View style={styles.line} />
          </View>

          {esRegistro && (
            <>
              <Text style={styles.label}>Nombre completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Santiago Carabalí"
                placeholderTextColor="#94A3B8"
                value={nombre}
                onChangeText={setNombre}
              />
            </>
          )}

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="usuario@correo.com"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!mostrarPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={() => setMostrarPassword(!mostrarPassword)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={mostrarPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#64748B"
              />
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              (pressed || cargando) && styles.pressed,
            ]}
            onPress={manejarLoginCorreo}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {esRegistro ? "Crear cuenta" : "Iniciar sesión"}
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => setEsRegistro(!esRegistro)}
            style={styles.toggleContainer}
          >
            <Text style={styles.toggleText}>
              {esRegistro ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
              <Text style={styles.toggleLink}>
                {esRegistro ? "Inicia sesión" : "Regístrate"}
              </Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 22,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  brand: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
    textAlign: "center",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    gap: 10,
  },
  linkedinButton: {
    backgroundColor: "#0A66C2",
  },
  linkedinText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  googleText: {
    color: "#1E293B",
    fontWeight: "600",
    fontSize: 15,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "#94A3B8",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: "#0F172A",
    marginBottom: 14,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    marginBottom: 18,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: "#0F172A",
  },
  eyeButton: {
    paddingHorizontal: 14,
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  toggleContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  toggleText: {
    color: "#64748B",
    fontSize: 14,
  },
  toggleLink: {
    color: "#2563EB",
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.85,
  },
});