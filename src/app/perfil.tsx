import { router } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PerfilScreen() {
  const mostrarProximamente = (seccion: string) => {
    Alert.alert(
      seccion,
      "Esta sección se conectará con la actividad del usuario en el siguiente paso."
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Mi perfil 👤</Text>

        <Text style={styles.subtitle}>
          Gestiona tus oportunidades, aprendizaje y actividad.
        </Text>
      </View>

      {/* Usuario */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>

        <Text style={styles.name}>Usuario Tuluá Conecta</Text>

        <Text style={styles.email}>
          usuario@tuluaconecta.com
        </Text>

        <View style={styles.status}>
          <Text style={styles.statusText}>
            Perfil activo
          </Text>
        </View>
      </View>

      {/* Resumen */}
      <Text style={styles.sectionTitle}>
        Mi actividad
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>❤️</Text>

          <Text style={styles.statNumber}>0</Text>

          <Text style={styles.statLabel}>
            Favoritos
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📄</Text>

          <Text style={styles.statNumber}>0</Text>

          <Text style={styles.statLabel}>
            Postulaciones
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📚</Text>

          <Text style={styles.statNumber}>0</Text>

          <Text style={styles.statLabel}>
            Aprendizaje
          </Text>
        </View>
      </View>

      {/* Opciones */}
      <Text style={styles.sectionTitle}>
        Mis oportunidades
      </Text>

      <Pressable
        style={styles.option}
        onPress={() =>
          mostrarProximamente("Mis favoritos")
        }
      >
        <View style={styles.optionIcon}>
          <Text style={styles.optionEmoji}>❤️</Text>
        </View>

        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>
            Mis favoritos
          </Text>

          <Text style={styles.optionDescription}>
            Consulta empleos, cursos y contenidos guardados.
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable
        style={styles.option}
        onPress={() =>
          mostrarProximamente("Mis postulaciones")
        }
      >
        <View style={styles.optionIcon}>
          <Text style={styles.optionEmoji}>📄</Text>
        </View>

        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>
            Mis postulaciones
          </Text>

          <Text style={styles.optionDescription}>
            Consulta las ofertas laborales a las que te has postulado.
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable
        style={styles.option}
        onPress={() =>
          mostrarProximamente("Mi aprendizaje")
        }
      >
        <View style={styles.optionIcon}>
          <Text style={styles.optionEmoji}>🎓</Text>
        </View>

        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>
            Mi aprendizaje
          </Text>

          <Text style={styles.optionDescription}>
            Revisa cursos y recursos educativos guardados.
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </Pressable>

      {/* Volver al inicio */}
      <Pressable
        style={styles.homeButton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.homeButtonText}>
          🏠 Volver al inicio
        </Text>
      </Pressable>

      <Text style={styles.demoText}>
        Perfil de demostración. Los datos del usuario se
        conectarán posteriormente con la autenticación.
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
    color: "#64748B",
    fontSize: 15,
    lineHeight: 21,
    marginTop: 6,
  },

  profileCard: {
    backgroundColor: "#1269E8",
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
    marginBottom: 28,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },

  avatarText: {
    fontSize: 42,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
  },

  email: {
    color: "#DCEAFE",
    fontSize: 14,
    marginTop: 5,
  },

  status: {
    backgroundColor: "#FFFFFF25",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 13,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#172033",
    marginBottom: 14,
  },

  statsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    paddingVertical: 16,
    alignItems: "center",
    elevation: 2,
  },

  statIcon: {
    fontSize: 22,
  },

  statNumber: {
    color: "#172033",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 6,
  },

  statLabel: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 2,
  },

  option: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    elevation: 2,
  },

  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  optionEmoji: {
    fontSize: 23,
  },

  optionContent: {
    flex: 1,
    marginLeft: 13,
  },

  optionTitle: {
    color: "#172033",
    fontSize: 16,
    fontWeight: "700",
  },

  optionDescription: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },

  arrow: {
    color: "#1269E8",
    fontSize: 29,
    marginLeft: 5,
  },

  homeButton: {
    backgroundColor: "#1269E8",
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 15,
  },

  homeButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },

  demoText: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 18,
  },
});