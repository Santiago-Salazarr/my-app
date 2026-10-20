import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Categoria = "Todos" | "Cursos" | "Becas" | "Programas";

const oportunidades = [
  {
    id: "1",
    tipo: "Cursos",
    titulo: "Excel para el trabajo",
    institucion: "Centro de Formación Demo",
    modalidad: "Virtual",
    duracion: "40 horas",
    nivel: "Básico",
    emoji: "📊",
  },
  {
    id: "2",
    tipo: "Cursos",
    titulo: "Introducción a la programación",
    institucion: "Academia Digital Demo",
    modalidad: "Virtual",
    duracion: "60 horas",
    nivel: "Básico",
    emoji: "💻",
  },
  {
    id: "3",
    tipo: "Becas",
    titulo: "Beca de formación tecnológica",
    institucion: "Fundación Demo",
    modalidad: "Presencial",
    duracion: "6 meses",
    nivel: "Bachilleres",
    emoji: "🎓",
  },
  {
    id: "4",
    tipo: "Programas",
    titulo: "Habilidades para el empleo",
    institucion: "Programa Demo Tuluá",
    modalidad: "Mixta",
    duracion: "30 horas",
    nivel: "Todos los niveles",
    emoji: "🚀",
  },
  {
    id: "5",
    tipo: "Cursos",
    titulo: "Marketing digital",
    institucion: "Academia Digital Demo",
    modalidad: "Virtual",
    duracion: "45 horas",
    nivel: "Básico",
    emoji: "📱",
  },
];

const categorias: Categoria[] = [
  "Todos",
  "Cursos",
  "Becas",
  "Programas",
];

export default function EducacionScreen() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] =
    useState<Categoria>("Todos");
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const resultados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    return oportunidades.filter((oportunidad) => {
      const coincideCategoria =
        categoria === "Todos" ||
        oportunidad.tipo === categoria;

      const coincideBusqueda =
        !texto ||
        oportunidad.titulo.toLowerCase().includes(texto) ||
        oportunidad.institucion.toLowerCase().includes(texto) ||
        oportunidad.modalidad.toLowerCase().includes(texto);

      return coincideCategoria && coincideBusqueda;
    });
  }, [busqueda, categoria]);

  const cambiarFavorito = (id: string) => {
    setFavoritos((actuales) => {
      if (actuales.includes(id)) {
        return actuales.filter(
          (favoritoId) => favoritoId !== id
        );
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
        <Text style={styles.title}>Educación 🎓</Text>

        <Text style={styles.subtitle}>
          Descubre cursos, becas y programas para continuar
          aprendiendo.
        </Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="🔎 Buscar cursos o programas..."
        placeholderTextColor="#94A3B8"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {categorias.map((item) => {
          const seleccionado = categoria === item;

          return (
            <Pressable
              key={item}
              style={[
                styles.category,
                seleccionado && styles.categorySelected,
              ]}
              onPress={() => setCategoria(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  seleccionado &&
                    styles.categoryTextSelected,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Oportunidades
        </Text>

        <Text style={styles.counter}>
          {resultados.length}
        </Text>
      </View>

      {resultados.map((oportunidad) => {
        const favorito = favoritos.includes(
          oportunidad.id
        );

        return (
          <View
            key={oportunidad.id}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>
                  {oportunidad.emoji}
                </Text>
              </View>

              <View style={styles.cardHeading}>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeText}>
                    {oportunidad.tipo}
                  </Text>
                </View>

                <Text style={styles.cardTitle}>
                  {oportunidad.titulo}
                </Text>

                <Text style={styles.institution}>
                  {oportunidad.institucion}
                </Text>
              </View>

              <Pressable
                style={styles.favoriteButton}
                onPress={() =>
                  cambiarFavorito(oportunidad.id)
                }
              >
                <Text style={styles.favorite}>
                  {favorito ? "❤️" : "🤍"}
                </Text>
              </Pressable>
            </View>

            <View style={styles.details}>
              <Text style={styles.detail}>
                🌐 {oportunidad.modalidad}
              </Text>

              <Text style={styles.detail}>
                ⏱️ {oportunidad.duracion}
              </Text>

              <Text style={styles.detail}>
                📖 {oportunidad.nivel}
              </Text>
            </View>

            <Pressable
              style={styles.button}
              onPress={() => {
                console.log(
                  "Oportunidad seleccionada:",
                  oportunidad.id
                );
              }}
            >
              <Text style={styles.buttonText}>
                Ver oportunidad
              </Text>
            </Pressable>
          </View>
        );
      })}

      {resultados.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🔎</Text>

          <Text style={styles.emptyTitle}>
            No encontramos resultados
          </Text>

          <Text style={styles.emptyText}>
            Prueba con otra palabra o selecciona otra
            categoría.
          </Text>
        </View>
      )}

      <View style={styles.information}>
        <Text style={styles.informationTitle}>
          💡 Sigue aprendiendo
        </Text>

        <Text style={styles.informationText}>
          Desarrollar nuevas habilidades puede ampliar tus
          oportunidades educativas y laborales.
        </Text>
      </View>

      <Text style={styles.demo}>
        Contenido ficticio utilizado únicamente para demostrar
        el funcionamiento del prototipo.
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
    lineHeight: 21,
    color: "#64748B",
    marginTop: 6,
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

  categories: {
    gap: 9,
    paddingVertical: 20,
  },

  category: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  categorySelected: {
    backgroundColor: "#1269E8",
    borderColor: "#1269E8",
  },

  categoryText: {
    color: "#475569",
    fontWeight: "600",
  },

  categoryTextSelected: {
    color: "#FFFFFF",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 26,
  },

  cardHeading: {
    flex: 1,
    marginLeft: 13,
  },

  typeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EAF2FF",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 5,
  },

  typeText: {
    color: "#1269E8",
    fontSize: 11,
    fontWeight: "700",
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#172033",
  },

  institution: {
    fontSize: 13,
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
    marginTop: 17,
    gap: 8,
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
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
  },

  empty: {
    alignItems: "center",
    paddingVertical: 45,
  },

  emptyEmoji: {
    fontSize: 40,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172033",
    marginTop: 12,
  },

  emptyText: {
    color: "#64748B",
    textAlign: "center",
    marginTop: 5,
  },

  information: {
    backgroundColor: "#EAF2FF",
    padding: 20,
    borderRadius: 18,
    marginTop: 8,
  },

  informationTitle: {
    color: "#1269E8",
    fontSize: 17,
    fontWeight: "800",
  },

  informationText: {
    color: "#475569",
    lineHeight: 20,
    marginTop: 7,
  },

  demo: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 17,
    marginTop: 18,
  },
});