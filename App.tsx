import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  Alert,
} from 'react-native';

import {Form} from './src/components/Form';
import {Patient} from './src/components/Patient';
import {PatientDetails} from './src/components/PatientDetails';

import {PatientType, PatientsType} from './src/types';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [patients, setPatients] = useState<PatientsType>([]);
  const [patient, setPatient] = useState<PatientType | undefined>();
  const [modalPatientDetails, setModalPatientDetails] = useState(false);

  const newAppointmentHandler = () => {
    setIsModalVisible(!isModalVisible);
  };

  const editPatient = (id: number) => {
    const selectedPatient = patients?.filter(
      patientFilter => patientFilter.id === id,
    );

    setPatient(selectedPatient[0]);
  };

  const removePatient = (id: number) => {
    Alert.alert(
      'Do you want to remove this patient?',
      "This action can't be undone",
      [
        {text: 'Cancel'},
        {
          text: 'Remove',
          onPress: () => {
            const updatedUsers = patients.filter(
              patientFilter => patientFilter.id !== id,
            );
            setPatients(updatedUsers);
          },
        },
      ],
    );
    console.log(id);
  };

  const closeModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Vet<Text style={styles.titleBold}>App</Text>
      </Text>
      <Pressable
        onPressOut={newAppointmentHandler}
        style={styles.btnNewAppointment}>
        <Text style={styles.btnTextNewAppoinment}>New appoinment</Text>
      </Pressable>

      {patients.length === 0 ? (
        <Text style={styles.noPatients}>No patients available.</Text>
      ) : (
        <FlatList
          style={styles.listView}
          data={patients}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Patient
                item={item}
                setIsModalVisible={setIsModalVisible}
                editPatient={editPatient}
                removePatient={removePatient}
                setModalPatientDetails={setModalPatientDetails}
                setPatient={setPatient}
              />
            );
          }}
        />
      )}

      {isModalVisible && (
        <Form
          isModalVisible={isModalVisible}
          closeModal={closeModal}
          setPatients={setPatients}
          patients={patients}
          setPatient={setPatient}
          patient={patient}
        />
      )}

      <Modal visible={modalPatientDetails} animationType="fade">
        <PatientDetails
          patient={patient}
          setModalPatientDetails={setModalPatientDetails}
          setPatient={setPatient}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F6F6',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#000000',
    fontWeight: '600',
  },
  titleBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNewAppointment: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextNewAppoinment: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPatients: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listView: {
    marginTop: 50,
  },
});

export default App;
