import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const ofertas = [
  {
    id: "1",
    cargo: "Desarrollador Junior",
    empresa: "Empresa Demo Tech",
    ubicacion: "Tuluá, Valle del Cauca",
    salario: "$2.500.000",
    modalidad: "Presencial",
  },
  {
    id: "2",
    cargo: "Auxiliar Administrativo",
    empresa: "Empresa Demo Servicios",
    ubicacion: "Tuluá, Valle del Cauca",
    salario: "$1.700.000",
    modalidad: "Presencial",
  },
  {
    id: "3",
    cargo: "Asesor Comercial",
    empresa: "Empresa Demo Comercial",
    ubicacion: "Tuluá, Valle del Cauca",
    salario: "$1.800.000 + comisiones",
    modalidad: "Presencial",
  },
  {
    id: "4",
    cargo: "Diseñador de contenido digital",
    empresa: "Empresa Demo Creativa",
    ubicacion: "Remoto",
    salario: "$2.200.000",
    modalidad: "Remoto",
  },
];

export default function EmpleoScreen() {
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const ofertasFiltradas = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    if (!texto) {
      return ofertas;
    }

    return ofertas.filter((oferta) => {
      return (
        oferta.cargo.toLowerCase().includes(texto) ||
        oferta.empresa.toLowerCase().includes(texto) ||
        oferta.ubicacion.toLowerCase().includes(texto)
      );
    });
  }, [busqueda]);

  const cambiarFavorito = (id: string) => {
    setFavoritos((actuales) => {
      if (actuales.includes(id)) {
        return actuales.filter((favoritoId) => favoritoId !== id);
      }

      return [...actuales, id];
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Empleo 💼</Text>

        <Text style={styles.subtitle}>
          Encuentra oportunidades para impulsar tu futuro.
        </Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="🔎 Buscar empleo..."
        placeholderTextColor="#94A3B8"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Ofertas disponibles
        </Text>

        <Text style={styles.counter}>
          {ofertasFiltradas.length}
        </Text>
      </View>

      {ofertasFiltradas.map((oferta) => {
        const esFavorito = favoritos.includes(oferta.id);

        return (
          <View key={oferta.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.jobIcon}>
                <Text style={styles.jobEmoji}>💼</Text>
              </View>

              <View style={styles.jobHeading}>
                <Text style={styles.jobTitle}>
                  {oferta.cargo}
                </Text>

                <Text style={styles.company}>
                  {oferta.empresa}
                </Text>
              </View>

              <Pressable
                style={styles.favoriteButton}
                onPress={() => cambiarFavorito(oferta.id)}
              >
                <Text style={styles.favorite}>
                  {esFavorito ? "❤️" : "🤍"}
                </Text>
              </Pressable>
            </View>

            <View style={styles.details}>
              <Text style={styles.detail}>
                📍 {oferta.ubicacion}
              </Text>

              <Text style={styles.detail}>
                💰 {oferta.salario}
              </Text>

              <Text style={styles.detail}>
                🕐 {oferta.modalidad}
              </Text>
            </View>

            <Pressable
              style={styles.button}
              onPress={() =>
                router.push({
                    pathname: "/oferta/[id]",
                    params: { id: oferta.id },
                })
              }
            >
              <Text style={styles.buttonText}>
                Ver oferta
              </Text>
            </Pressable>
          </View>
        );
      })}

      {ofertasFiltradas.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🔎</Text>

          <Text style={styles.emptyTitle}>
            No encontramos resultados
          </Text>

          <Text style={styles.emptyText}>
            Prueba buscando otro cargo o palabra clave.
          </Text>
        </View>
      )}
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
    paddingBottom: 40,
  },

  header: {
    marginTop: 18,
    marginBottom: 22,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#172033",
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 6,
    lineHeight: 21,
  },

  search: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 17,
    paddingVertical: 15,
    fontSize: 16,
    color: "#172033",

    elevation: 2,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 27,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#172033",
  },

  counter: {
    backgroundColor: "#EAF2FF",
    color: "#1269E8",
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  jobIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#EAF2FF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  jobEmoji: {
    fontSize: 24,
  },

  jobHeading: {
    flex: 1,
    marginLeft: 13,
  },

  jobTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#172033",
  },

  company: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 3,
  },

  favoriteButton: {
    padding: 8,
  },

  favorite: {
    fontSize: 24,
  },

  details: {
    marginTop: 16,
    gap: 7,
  },

  detail: {
    color: "#475569",
    fontSize: 14,
  },

  button: {
    backgroundColor: "#1269E8",
    borderRadius: 13,
    paddingVertical: 13,
    marginTop: 18,
  },

  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  empty: {
    alignItems: "center",
    paddingVertical: 45,
  },

  emptyIcon: {
    fontSize: 40,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
    color: "#172033",
  },

  emptyText: {
    color: "#64748B",
    marginTop: 5,
    textAlign: "center",
  },
});