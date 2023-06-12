import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

export const Form = ({
  isModalVisible,
  closeModal,
  setPatients,
  patients,
  patient,
  setPatient,
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState();
  const [patientOwnerName, setPatientOwnerName] = useState('');
  const [patientOwnerEmail, setPatientOwnerEmail] = useState('');
  const [patientOwnerPhone, setPatientOwnerPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [patientSymptoms, setPatientSymptoms] = useState('');

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      console.log(patient);
      setPatientId(patient.id);
      setPatientName(patient.patientName);
      setPatientOwnerName(patient.patientOwnerName);
      setPatientOwnerEmail(patient.patientOwnerEmail);
      setPatientOwnerPhone(patient.patientOwnerPhone);
      setDate(patient.date);
      setPatientSymptoms(patient.patientSymptoms);
    }
  }, [patient]);

  const handleAppointment = () => {
    if (
      [
        patientName,
        patientOwnerName,
        patientOwnerEmail,
        patientOwnerPhone,
        date,
        patientSymptoms,
      ].includes('')
    ) {
      Alert.alert(
        'Error',
        'All fields are required.',
        // [{text : 'Cancel', style: 'cancel'}, {text : 'Ok'}]
      );

      return;
    }

    // check if ita an existing user

    const newPatient = {
      patientName,
      patientOwnerName,
      patientOwnerEmail,
      patientOwnerPhone,
      date,
      patientSymptoms,
    };

    if (patientId) {
      newPatient.id = patientId;
      const updatedPatients = patients.map(patientState =>
        patientState.id === newPatient.id ? newPatient : patientState,
      );
      setPatients(updatedPatients);
      setPatient({});
    } else {
      newPatient.id = Date.now();
      setPatients([...patients, newPatient]);
    }

    closeModal();

    setPatientId('');
    setPatientName('');
    setPatientOwnerName('');
    setPatientOwnerEmail('');
    setPatientOwnerPhone('');
    setDate(new Date());
    setPatientSymptoms('');
  };

  return (
    <Modal animationType="slide" visible={isModalVisible}>
      <SafeAreaView style={styles.contentid}>
        <ScrollView>
          <Text style={styles.title}>
            {patient.id ? 'Edit' : 'New'} <Text>Appoinment</Text>
          </Text>

          {/* <Button
                    title='Close'
                    onPress={newAppointmentHandler}
                /> */}

          <Pressable
            style={styles.btnCancel}
            onLongPress={() => {
              closeModal();
              setPatient({});
              setPatientId('');
              setPatientName('');
              setPatientOwnerName('');
              setPatientOwnerEmail('');
              setPatientOwnerPhone('');
              setDate(new Date());
              setPatientSymptoms('');
            }}>
            <Text style={styles.btnCancelText}>X Cancel</Text>
          </Pressable>

          <View style={styles.field}>
            <Text style={styles.label}>Patient's name:</Text>
            <TextInput
              style={styles.input}
              placeholder={"Patient's name"}
              placeholderTextColor={'#666666'}
              value={patientName}
              onChangeText={setPatientName}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Patient's owner:</Text>
            <TextInput
              style={styles.input}
              placeholder={"Patient's owner"}
              placeholderTextColor={'#666666'}
              value={patientOwnerName}
              onChangeText={setPatientOwnerName}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Owner's e-mail:</Text>
            <TextInput
              style={styles.input}
              placeholder={"Owner's e-mail"}
              placeholderTextColor={'#666666'}
              keyboardType="email-address"
              value={patientOwnerEmail}
              onChangeText={setPatientOwnerEmail}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Owner's phone:</Text>
            <TextInput
              style={styles.input}
              placeholder={"Owner's phone"}
              placeholderTextColor={'#666666'}
              value={patientOwnerPhone}
              onChangeText={setPatientOwnerPhone}
              maxLength={10}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Date:</Text>
            <View style={styles.dateContainer}>
              <DatePicker
                date={date}
                locale={'es'}
                mode={'date'}
                onDateChange={date => setDate(date)}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Symptoms:</Text>
            <TextInput
              style={[styles.input, styles.symptomsInput]}
              placeholder={'Patients Symptoms'}
              placeholderTextColor={'#666666'}
              keyboardType="number-pad"
              value={patientSymptoms}
              onChangeText={setPatientSymptoms}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <Pressable
            style={styles.btnNewAppoinment}
            onPress={handleAppointment}>
            <Text style={styles.btnNewAppoinmentText}>
              {patient.id ? 'Edit Patient' : 'Add Patient'}
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentid: {
    backgroundColor: '#6D28D9',
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
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  field: {
    marginTop: 10,
    marginHorizontal: 30,
    marginBottom: 10,
  },
  label: {
    color: '#FFFFFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  symptomsInput: {
    height: 100,
  },
  dateContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btnCancel: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
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
  btnNewAppoinment: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNewAppoinmentText: {
    textAlign: 'center',
    color: '#5827A4',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
