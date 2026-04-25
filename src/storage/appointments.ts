import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appointment } from "../types/appointment";

const STORAGE_KEY = "rnVetAppt:appointments";

export async function getAppointments(): Promise<Appointment[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading appointments:", error);
    return [];
  }
}

export async function getAppointmentById(
  id: string,
): Promise<Appointment | undefined> {
  const appointments = await getAppointments();
  return appointments.find((appointment) => appointment.id === id);
}

export async function saveAppointments(appointments: Appointment[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  } catch (error) {
    console.error("Error saving appointments:", error);
  }
}

export async function upsertAppointment(appointment: Appointment) {
  const appointments = await getAppointments();

  const exists = appointments.some((item) => item.id === appointment.id);

  const updated = exists
    ? appointments.map((item) =>
        item.id === appointment.id ? appointment : item,
      )
    : [appointment, ...appointments];

  await saveAppointments(updated);
}

export async function deleteAppointment(id: string) {
  const appointments = await getAppointments();
  const updated = appointments.filter((item) => item.id !== id);

  await saveAppointments(updated);
}
