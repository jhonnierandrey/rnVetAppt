import React from 'react';
import {Text, SafeAreaView, View, Pressable, StyleSheet} from 'react-native';
import {dateFormatter} from '../helpers';

export const PatientDetails = ({
  patient,
  setModalPatientDetails,
  setPatient,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {' '}
        Patient <Text style={styles.titleBold}>Details</Text>
      </Text>
      <View>
        <Pressable
          style={styles.btnCancel}
          onLongPress={() => {
            setPatient({});
            setModalPatientDetails(false);
          }}>
          <Text style={styles.btnCancelText}>X Cerrar</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Name : </Text>
          <Text style={styles.value}>{patient.patientName}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Owner : </Text>
          <Text style={styles.value}>{patient.patientOwnerName}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Owner's email : </Text>
          <Text style={styles.value}>{patient.patientOwnerEmail}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Owner's phone : </Text>
          <Text style={styles.value}>{patient.patientOwnerPhone}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date: </Text>
          <Text style={styles.value}>{dateFormatter(patient.date)}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Patien's symptoms: </Text>
          <Text style={styles.value}>{patient.patientSymptoms}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F59E0B',
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFFFFF',
  },
  titleBold: {
    fontWeight: 'bold',
  },
  btnCancel: {
    marginVertical: 30,
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  btnCancelText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  content: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  field: {
    marginBottom: 10,
  },
  label: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '600',
    fontSize: 12,
  },
  value: {
    fontWeight: '700',
    fontSize: 20,
    color: '#334155',
  },
});
