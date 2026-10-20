import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ofertas = {
  "1": {
    cargo: "Desarrollador Junior",
    empresa: "Empresa Demo Tech",
    ubicacion: "Tuluá, Valle del Cauca",
    salario: "$2.500.000",
    modalidad: "Presencial",
    descripcion:
      "Buscamos una persona interesada en iniciar su carrera en desarrollo de software y participar en proyectos digitales.",
    requisitos: [
      "Conocimientos básicos de JavaScript",
      "Conocimientos de React",
      "Manejo básico de Git",
      "Trabajo en equipo",
    ],
  },

  "2": {
    cargo: "Auxiliar Administrativo",
    empresa: "Empresa Demo Servicios",
    ubicacion: "Tuluá, Valle del Cauca",
    salario: "$1.700.000",
    modalidad: "Presencial",
    descripcion:
      "Oportunidad para apoyar procesos administrativos, gestión documental y atención a usuarios.",
    requisitos: [
      "Manejo básico de herramientas ofimáticas",
      "Organización",
      "Comunicación",
      "Servicio al cliente",
    ],
  },

  "3": {
    cargo: "Asesor Comercial",
    empresa: "Empresa Demo Comercial",
    ubicacion: "Tuluá, Valle del Cauca",
    salario: "$1.800.000 + comisiones",
    modalidad: "Presencial",
    descripcion:
      "Buscamos una persona para acompañar clientes, presentar productos y apoyar el cumplimiento de objetivos comerciales.",
    requisitos: [
      "Comunicación efectiva",
      "Orientación al cliente",
      "Trabajo por objetivos",
      "Actitud de servicio",
    ],
  },

  "4": {
    cargo: "Diseñador de contenido digital",
    empresa: "Empresa Demo Creativa",
    ubicacion: "Remoto",
    salario: "$2.200.000",
    modalidad: "Remoto",
    descripcion:
      "Oportunidad para crear contenido visual y apoyar campañas digitales para diferentes proyectos.",
    requisitos: [
      "Creatividad",
      "Conocimientos de diseño",
      "Manejo de herramientas digitales",
      "Trabajo remoto",
    ],
  },
};

type OfertaId = keyof typeof ofertas;

export default function OfertaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [favorito, setFavorito] = useState(false);
  const [postulado, setPostulado] = useState(false);

  const oferta = ofertas[id as OfertaId];

  if (!oferta) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>
          Oferta no encontrada
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            Volver
          </Text>
        </Pressable>
      </View>
    );
  }

  const postularme = () => {
    if (postulado) {
      Alert.alert(
        "Postulación registrada",
        "Ya te has postulado a esta oferta."
      );

      return;
    }

    setPostulado(true);

    Alert.alert(
      "✅ Postulación realizada",
      "Tu postulación ha sido registrada correctamente en el prototipo."
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Pressable
        style={styles.returnButton}
        onPress={() => router.back()}
      >
        <Text style={styles.returnText}>
          ← Volver
        </Text>
      </Pressable>

      <View style={styles.hero}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>💼</Text>
        </View>

        <Text style={styles.title}>
          {oferta.cargo}
        </Text>

        <Text style={styles.company}>
          {oferta.empresa}
        </Text>
      </View>

      <View style={styles.informationCard}>
        <Text style={styles.information}>
          📍 {oferta.ubicacion}
        </Text>

        <Text style={styles.information}>
          💰 {oferta.salario}
        </Text>

        <Text style={styles.information}>
          🕐 {oferta.modalidad}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Descripción
        </Text>

        <Text style={styles.description}>
          {oferta.descripcion}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Requisitos
        </Text>

        {oferta.requisitos.map((requisito) => (
          <View
            key={requisito}
            style={styles.requirement}
          >
            <Text style={styles.check}>✓</Text>

            <Text style={styles.requirementText}>
              {requisito}
            </Text>
          </View>
        ))}
      </View>

      <Pressable
        style={styles.favoriteButton}
        onPress={() => setFavorito(!favorito)}
      >
        <Text style={styles.favoriteText}>
          {favorito
            ? "❤️ Oferta guardada"
            : "🤍 Guardar oferta"}
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.applyButton,
          postulado && styles.appliedButton,
        ]}
        onPress={postularme}
      >
        <Text style={styles.applyText}>
          {postulado
            ? "✓ Ya te postulaste"
            : "Postularme"}
        </Text>
      </Pressable>

      <Text style={styles.demo}>
        Oferta ficticia utilizada únicamente para demostrar el prototipo.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  content: {
    padding: 20,
    paddingBottom: 45,
  },

  returnButton: {
    marginTop: 8,
    marginBottom: 18,
  },

  returnText: {
    color: "#1269E8",
    fontSize: 16,
    fontWeight: "700",
  },

  hero: {
    alignItems: "center",
    marginBottom: 25,
  },

  iconContainer: {
    width: 75,
    height: 75,
    borderRadius: 22,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  icon: {
    fontSize: 36,
  },

  title: {
    color: "#172033",
    fontSize: 27,
    fontWeight: "800",
    textAlign: "center",
  },

  company: {
    color: "#64748B",
    fontSize: 16,
    marginTop: 5,
  },

  informationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    gap: 12,

    elevation: 2,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 7,
  },

  information: {
    color: "#475569",
    fontSize: 15,
  },

  section: {
    marginTop: 27,
  },

  sectionTitle: {
    color: "#172033",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },

  description: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 23,
  },

  requirement: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
  },

  check: {
    width: 28,
    height: 28,
    lineHeight: 28,
    borderRadius: 14,
    backgroundColor: "#DCFCE7",
    color: "#15803D",
    textAlign: "center",
    fontWeight: "800",
  },

  requirementText: {
    flex: 1,
    color: "#475569",
    fontSize: 15,
    marginLeft: 11,
  },

  favoriteButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E0EB",
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 30,
  },

  favoriteText: {
    color: "#172033",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },

  applyButton: {
    backgroundColor: "#1269E8",
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 12,
  },

  appliedButton: {
    backgroundColor: "#16A34A",
  },

  applyText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "800",
  },

  demo: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 18,
  },

  errorContainer: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  errorTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#172033",
  },

  backButton: {
    backgroundColor: "#1269E8",
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 20,
  },

  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});