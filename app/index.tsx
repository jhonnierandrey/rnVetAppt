import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { darkTheme, lightTheme } from "../src/constants/theme";

import { AppointmentCard } from "../src/components/AppointmentCard";
import {
  deleteAppointment,
  getAppointments,
} from "../src/storage/appointments";
import { Appointment } from "../src/types/appointment";

export default function HomeScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const styles = createStyles(theme);

  const loadAppointments = async () => {
    const data = await getAppointments();

    const sorted = data.sort(
      (a, b) =>
        new Date(a.appointmentDate).getTime() -
        new Date(b.appointmentDate).getTime(),
    );

    setAppointments(sorted);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, []),
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete appointment",
      "Are you sure you want to delete this appointment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteAppointment(id);
            await loadAppointments();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.title}>Pet appointments</Text>
          <Text style={styles.subtitle}>
            Manage upcoming visits for your furry patients.
          </Text>

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push("/appointment-form")}
          >
            <Text style={styles.createButtonText}>+ New appointment</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <Text style={styles.helperText}>Loading appointments...</Text>
        ) : appointments.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🐾</Text>
            <Text style={styles.emptyTitle}>Nothing scheduled yet</Text>
            <Text style={styles.emptyText}>
              Create your first pet appointment to get started.
            </Text>
          </View>
        ) : (
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <AppointmentCard
                appointment={item}
                theme={theme}
                onEdit={() =>
                  router.push({
                    pathname: "/appointment-form",
                    params: { id: item.id },
                  })
                }
                onDelete={() => handleDelete(item.id)}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: typeof lightTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      padding: 20,
    },
    hero: {
      backgroundColor: theme.card,
      borderRadius: 24,
      padding: 22,
      marginBottom: 22,
    },
    title: {
      fontSize: 30,
      fontWeight: "800",
      color: theme.text,
    },
    subtitle: {
      marginTop: 8,
      fontSize: 15,
      lineHeight: 22,
      color: theme.mutedText,
    },
    createButton: {
      marginTop: 18,
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: 16,
      alignItems: "center",
    },
    createButtonText: {
      color: theme.primaryText,
      fontSize: 16,
      fontWeight: "700",
    },
    helperText: {
      textAlign: "center",
      color: theme.mutedText,
    },
    list: {
      paddingBottom: 32,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 80,
    },
    emptyIcon: {
      fontSize: 48,
    },
    emptyTitle: {
      marginTop: 16,
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
    },
    emptyText: {
      marginTop: 8,
      textAlign: "center",
      fontSize: 15,
      color: theme.mutedText,
    },
  });
