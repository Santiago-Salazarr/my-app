import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.brand}>Tuluá Conecta</Text>

        <Text style={styles.subtitle}>
          Empleo, educación y oportunidades para crecer
        </Text>
      </View>

      <View style={styles.welcome}>
        <Text style={styles.welcomeTitle}>
          ¡Hola! 👋
        </Text>

        <Text style={styles.welcomeText}>
          ¿Qué estás buscando hoy?
        </Text>
      </View>

      <Pressable
        style={styles.card}
        onPress={() => router.push("/empleo")}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>💼</Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            Buscar empleo
          </Text>

          <Text style={styles.cardText}>
            Encuentra oportunidades laborales disponibles.
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => router.push("/educacion")}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🎓</Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            Educación
          </Text>

          <Text style={styles.cardText}>
            Explora cursos, programas y oportunidades educativas.
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => router.push("/aprende")}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📚</Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            Aprende
          </Text>

          <Text style={styles.cardText}>
            Desarrolla habilidades para tu futuro laboral.
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => router.push("/perfil")}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>👤</Text>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            Mi perfil
          </Text>

          <Text style={styles.cardText}>
            Consulta tus favoritos y postulaciones.
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <View style={styles.message}>
        <Text style={styles.messageTitle}>
          Conectamos oportunidades
        </Text>

        <Text style={styles.messageText}>
          Encuentra herramientas para trabajar, aprender y avanzar.
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
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 30,
  },

  brand: {
    color: "#1269E8",
    fontSize: 34,
    fontWeight: "800",
  },

  subtitle: {
    color: "#64748B",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 7,
  },

  welcome: {
    marginBottom: 22,
  },

  welcomeTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#172033",
  },

  welcomeText: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
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
    fontSize: 27,
  },

  cardContent: {
    flex: 1,
    marginLeft: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172033",
  },

  cardText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 19,
    marginTop: 4,
  },

  arrow: {
    color: "#1269E8",
    fontSize: 31,
    marginLeft: 8,
  },

  message: {
    backgroundColor: "#1269E8",
    borderRadius: 20,
    padding: 22,
    marginTop: 12,
  },

  messageTitle: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 19,
  },

  messageText: {
    color: "#EAF2FF",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
  },
});