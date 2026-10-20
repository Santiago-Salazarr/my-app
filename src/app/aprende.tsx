import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Categoria =
  | "Todos"
  | "Empleo"
  | "Digital"
  | "Desarrollo personal";

const contenidos = [
  {
    id: "1",
    categoria: "Empleo",
    titulo: "Cómo crear una buena hoja de vida",
    descripcion:
      "Aprende qué información incluir y cómo presentar tu experiencia de forma clara.",
    duracion: "5 min",
    emoji: "📄",
  },
  {
    id: "2",
    categoria: "Empleo",
    titulo: "Prepárate para una entrevista",
    descripcion:
      "Conoce recomendaciones básicas para responder preguntas y presentar tu perfil.",
    duracion: "8 min",
    emoji: "🎤",
  },
  {
    id: "3",
    categoria: "Digital",
    titulo: "Introducción a Excel",
    descripcion:
      "Conoce conceptos básicos para comenzar a trabajar con hojas de cálculo.",
    duracion: "12 min",
    emoji: "📊",
  },
  {
    id: "4",
    categoria: "Digital",
    titulo: "Herramientas digitales para el trabajo",
    descripcion:
      "Descubre herramientas que pueden ayudarte a organizar tareas y colaborar.",
    duracion: "10 min",
    emoji: "💻",
  },
  {
    id: "5",
    categoria: "Desarrollo personal",
    titulo: "Comunicación efectiva",
    descripcion:
      "Conoce principios básicos para comunicar tus ideas de manera clara.",
    duracion: "7 min",
    emoji: "💬",
  },
  {
    id: "6",
    categoria: "Desarrollo personal",
    titulo: "Organiza tus metas profesionales",
    descripcion:
      "Define pequeños objetivos para avanzar en tu formación y búsqueda de empleo.",
    duracion: "6 min",
    emoji: "🎯",
  },
];

const categorias: Categoria[] = [
  "Todos",
  "Empleo",
  "Digital",
  "Desarrollo personal",
];

export default function AprendeScreen() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] =
    useState<Categoria>("Todos");

  const [guardados, setGuardados] = useState<string[]>([]);

  const resultados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    return contenidos.filter((contenido) => {
      const coincideCategoria =
        categoria === "Todos" ||
        contenido.categoria === categoria;

      const coincideBusqueda =
        !texto ||
        contenido.titulo.toLowerCase().includes(texto) ||
        contenido.descripcion.toLowerCase().includes(texto);

      return coincideCategoria && coincideBusqueda;
    });
  }, [busqueda, categoria]);

  const guardarContenido = (id: string) => {
    setGuardados((actuales) => {
      if (actuales.includes(id)) {
        return actuales.filter(
          (contenidoId) => contenidoId !== id
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
        <Text style={styles.title}>Aprende 📚</Text>

        <Text style={styles.subtitle}>
          Recursos rápidos para desarrollar habilidades y
          mejorar tus oportunidades.
        </Text>
      </View>

      <View style={styles.featured}>
        <Text style={styles.featuredEmoji}>🚀</Text>

        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle}>
            Impulsa tu futuro
          </Text>

          <Text style={styles.featuredText}>
            Aprende algo nuevo cada día y fortalece tu perfil.
          </Text>
        </View>
      </View>

      <TextInput
        style={styles.search}
        placeholder="🔎 Buscar contenido..."
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
          Explora contenido
        </Text>

        <Text style={styles.counter}>
          {resultados.length}
        </Text>
      </View>

      {resultados.map((contenido) => {
        const guardado = guardados.includes(contenido.id);

        return (
          <View
            key={contenido.id}
            style={styles.card}
          >
            <View style={styles.cardTop}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>
                  {contenido.emoji}
                </Text>
              </View>

              <View style={styles.cardHeading}>
                <Text style={styles.categoryLabel}>
                  {contenido.categoria}
                </Text>

                <Text style={styles.cardTitle}>
                  {contenido.titulo}
                </Text>
              </View>

              <Pressable
                style={styles.saveButton}
                onPress={() =>
                  guardarContenido(contenido.id)
                }
              >
                <Text style={styles.saveIcon}>
                  {guardado ? "❤️" : "🤍"}
                </Text>
              </Pressable>
            </View>

            <Text style={styles.description}>
              {contenido.descripcion}
            </Text>

            <View style={styles.cardBottom}>
              <Text style={styles.duration}>
                ⏱️ {contenido.duracion}
              </Text>

              <Pressable
                style={styles.learnButton}
                onPress={() => {
                  console.log(
                    "Contenido seleccionado:",
                    contenido.id
                  );
                }}
              >
                <Text style={styles.learnButtonText}>
                  Aprender
                </Text>
              </Pressable>
            </View>
          </View>
        );
      })}

      {resultados.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🔎</Text>

          <Text style={styles.emptyTitle}>
            No encontramos contenido
          </Text>

          <Text style={styles.emptyText}>
            Prueba con otra palabra o categoría.
          </Text>
        </View>
      )}

      <View style={styles.finalCard}>
        <Text style={styles.finalEmoji}>🌱</Text>

        <Text style={styles.finalTitle}>
          Sigue creciendo
        </Text>

        <Text style={styles.finalText}>
          Cada nueva habilidad puede acercarte a una nueva
          oportunidad.
        </Text>
      </View>
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
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#172033",
  },

  subtitle: {
    color: "#64748B",
    fontSize: 15,
    lineHeight: 21,
    marginTop: 6,
  },

  featured: {
    backgroundColor: "#1269E8",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  featuredEmoji: {
    fontSize: 38,
    marginRight: 15,
  },

  featuredContent: {
    flex: 1,
  },

  featuredTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },

  featuredText: {
    color: "#EAF2FF",
    fontSize: 14,
    lineHeight: 19,
    marginTop: 5,
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
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
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
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
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

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 27,
  },

  cardHeading: {
    flex: 1,
    marginLeft: 13,
  },

  categoryLabel: {
    color: "#1269E8",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },

  cardTitle: {
    color: "#172033",
    fontSize: 17,
    fontWeight: "700",
  },

  saveButton: {
    padding: 8,
  },

  saveIcon: {
    fontSize: 23,
  },

  description: {
    color: "#64748B",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 15,
  },

  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 17,
  },

  duration: {
    color: "#64748B",
    fontSize: 14,
  },

  learnButton: {
    backgroundColor: "#1269E8",
    paddingHorizontal: 19,
    paddingVertical: 10,
    borderRadius: 11,
  },

  learnButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  empty: {
    alignItems: "center",
    paddingVertical: 45,
  },

  emptyEmoji: {
    fontSize: 40,
  },

  emptyTitle: {
    color: "#172033",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
  },

  emptyText: {
    color: "#64748B",
    marginTop: 5,
  },

  finalCard: {
    backgroundColor: "#ECFDF5",
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    marginTop: 5,
  },

  finalEmoji: {
    fontSize: 35,
  },

  finalTitle: {
    color: "#166534",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 8,
  },

  finalText: {
    color: "#475569",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 6,
  },
});