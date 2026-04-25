import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { darkTheme, lightTheme } from "../src/constants/theme";

import {
  getAppointmentById,
  upsertAppointment,
} from "../src/storage/appointments";
import { Appointment } from "../src/types/appointment";

export default function AppointmentFormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [notes, setNotes] = useState("");

  const isEditing = Boolean(id);

  useEffect(() => {
    async function loadAppointment() {
      if (!id) return;

      const appointment = await getAppointmentById(id);

      if (!appointment) return;

      setPetName(appointment.petName);
      setOwnerName(appointment.ownerName);
      setOwnerEmail(appointment.ownerEmail);
      setOwnerPhone(appointment.ownerPhone);
      setAppointmentDate(appointment.appointmentDate.slice(0, 10));
      setNotes(appointment.notes ?? "");
    }

    loadAppointment();
  }, [id]);

  const handleSave = async () => {
    if (
      !petName ||
      !ownerName ||
      !ownerEmail ||
      !ownerPhone ||
      !appointmentDate
    ) {
      Alert.alert(
        "Missing information",
        "Please complete all required fields.",
      );
      return;
    }

    const date = new Date(appointmentDate);

    if (Number.isNaN(date.getTime())) {
      Alert.alert("Invalid date", "Please use the format YYYY-MM-DD.");
      return;
    }

    const appointment: Appointment = {
      id: id ?? Date.now().toString(),
      petName,
      ownerName,
      ownerEmail,
      ownerPhone,
      appointmentDate: date.toISOString(),
      notes,
      createdAt: new Date().toISOString(),
    };

    await upsertAppointment(appointment);

    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>
            {isEditing ? "Edit appointment" : "New appointment"}
          </Text>

          <Text style={styles.subtitle}>
            Add the pet, owner and visit details.
          </Text>

          <Text style={styles.label}>Pet name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Luna"
            value={petName}
            onChangeText={setPetName}
          />

          <Text style={styles.label}>Owner name *</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={ownerName}
            onChangeText={setOwnerName}
          />

          <Text style={styles.label}>Owner email *</Text>
          <TextInput
            style={styles.input}
            placeholder="owner@email.com"
            value={ownerEmail}
            onChangeText={setOwnerEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Owner phone *</Text>
          <TextInput
            style={styles.input}
            placeholder="+351 900 000 000"
            value={ownerPhone}
            onChangeText={setOwnerPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Appointment date *</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={appointmentDate}
            onChangeText={setAppointmentDate}
          />

          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Optional appointment notes..."
            value={notes}
            onChangeText={setNotes}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {isEditing ? "Save changes" : "Create appointment"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (theme: typeof lightTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    keyboardView: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    content: {
      padding: 20,
      paddingBottom: 40,
    },
    title: {
      fontSize: 30,
      fontWeight: "800",
      color: theme.text,
    },
    subtitle: {
      marginTop: 8,
      marginBottom: 24,
      fontSize: 15,
      color: theme.mutedText,
    },
    label: {
      marginBottom: 8,
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
    },
    input: {
      backgroundColor: theme.card,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 16,
      fontSize: 16,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
    },
    textArea: {
      minHeight: 110,
    },
    saveButton: {
      marginTop: 8,
      backgroundColor: "#0F766E",
      paddingVertical: 16,
      borderRadius: 18,
      alignItems: "center",
    },
    saveButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "800",
    },
    cancelButton: {
      marginTop: 12,
      paddingVertical: 16,
      borderRadius: 18,
      alignItems: "center",
    },
    cancelButtonText: {
      color: "#6B7280",
      fontSize: 16,
      fontWeight: "700",
    },
  });
