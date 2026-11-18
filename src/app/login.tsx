import { useAuthStore } from "../../store/useAuthStore";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { router, Stack } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const iniciarSesion = useAuthStore((state) => state.iniciarSesion);
  
  const manejarLoginCorreo = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos requeridos", "Ingresa tu correo electrónico y contraseña.");
      return;
    }
    iniciarSesion({
      nombre: email.split("@")[0], // Usa la parte antes del @ como nombre temporal
      email: email,
      proveedor: "Correo",
    });
    router.replace("/");
  };

  const manejarLoginSocial = (proveedor: string) => {
    iniciarSesion({
      nombre: `Usuario ${proveedor}`,
      email: `usuario@${proveedor.toLowerCase()}.com`,
      proveedor: proveedor,
    });
    router.replace("/");
  };

  return (
    <>
      {/* Oculta la barra superior gris que dice "login" */}
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Encabezado de marca */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Ionicons name="briefcase" size={32} color="#2563EB" />
          </View>
          <Text style={styles.brand}>Tuluá Conecta</Text>
          <Text style={styles.subtitle}>
            Tu puente hacia oportunidades laborales y educativas en la región.
          </Text>
        </View>

        {/* Tarjeta principal del formulario */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Inicia sesión para continuar</Text>

          {/* Botón LinkedIn */}
          <Pressable
            style={({ pressed }) => [
              styles.socialButton,
              styles.linkedinButton,
              pressed && styles.pressed,
            ]}
            onPress={() => manejarLoginSocial("LinkedIn")}
          >
            <FontAwesome name="linkedin-square" size={20} color="#FFFFFF" />
            <Text style={styles.linkedinText}>Continuar con LinkedIn</Text>
          </Pressable>

          {/* Botón Google */}
          <Pressable
            style={({ pressed }) => [
              styles.socialButton,
              styles.googleButton,
              pressed && styles.pressed,
            ]}
            onPress={() => manejarLoginSocial("Google")}
          >
            <FontAwesome name="google" size={19} color="#DB4437" />
            <Text style={styles.googleText}>Continuar con Google</Text>
          </Pressable>

          {/* Separador */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>o con tu correo</Text>
            <View style={styles.line} />
          </View>

          {/* Input Correo */}
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

          {/* Input Contraseña con icono de ojo */}
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
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

          {/* Botón Iniciar Sesión */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
            onPress={manejarLoginCorreo}
          >
            <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
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
  pressed: {
    opacity: 0.85,
  },
});