import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppTheme } from "../constants/theme";
import { Appointment } from "../types/appointment";

type Props = {
  appointment: Appointment;
  theme: AppTheme;
  onEdit: () => void;
  onDelete: () => void;
};

export function AppointmentCard({
  appointment,
  theme,
  onEdit,
  onDelete,
}: Props) {
  const styles = createStyles(theme);

  const formattedDate = new Date(
    appointment.appointmentDate,
  ).toLocaleDateString();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.petName}>{appointment.petName}</Text>
          <Text style={styles.ownerName}>Owner: {appointment.ownerName}</Text>
        </View>

        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.info}>Email: {appointment.ownerEmail}</Text>
        <Text style={styles.info}>Phone: {appointment.ownerPhone}</Text>

        {appointment.notes ? (
          <Text style={styles.notes}>{appointment.notes}</Text>
        ) : null}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={onEdit}
          activeOpacity={0.85}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
          activeOpacity={0.85}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 12,
    },
    headerContent: {
      flex: 1,
    },
    petName: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
    },
    ownerName: {
      marginTop: 4,
      fontSize: 14,
      color: theme.mutedText,
    },
    date: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.primary,
    },
    infoBox: {
      marginTop: 14,
    },
    info: {
      fontSize: 14,
      color: theme.text,
      marginBottom: 4,
    },
    notes: {
      marginTop: 8,
      fontSize: 14,
      color: theme.mutedText,
      fontStyle: "italic",
    },
    actions: {
      flexDirection: "row",
      gap: 10,
      marginTop: 16,
    },
    editButton: {
      flex: 1,
      backgroundColor: theme.primary,
      paddingVertical: 12,
      borderRadius: 14,
      alignItems: "center",
    },
    editButtonText: {
      color: theme.primaryText,
      fontWeight: "700",
    },
    deleteButton: {
      flex: 1,
      backgroundColor: theme.dangerBg,
      paddingVertical: 12,
      borderRadius: 14,
      alignItems: "center",
    },
    deleteButtonText: {
      color: theme.dangerText,
      fontWeight: "700",
    },
  });
