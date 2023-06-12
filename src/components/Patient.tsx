import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {dateFormatter} from '../helpers';

export const Patient = ({
  item,
  setIsModalVisible,
  editPatient,
  removePatient,
  setModalPatientDetails,
  setPatient,
}) => {
  const {patientName, date, id} = item;

  return (
    <Pressable
      onLongPress={() => {
        setPatient(item);
        setModalPatientDetails(true);
      }}>
      <View style={styles.container}>
        <Text style={styles.label}>Patient:</Text>
        <Text style={styles.text}>{patientName}</Text>
        <Text style={styles.date}>{dateFormatter(date)}</Text>

        <View style={styles.containerBtns}>
          <Pressable
            style={[styles.btn, styles.btnEdit]}
            onLongPress={() => {
              editPatient(id);
              setIsModalVisible(true);
            }}>
            <Text style={styles.btnText}>Edit</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.btnRemove]}
            onLongPress={() => removePatient(id)}>
            <Text style={styles.btnText}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#94A3B8',
    borderBottomWidth: 1,
  },
  label: {
    color: '#3744151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    color: '#6D28D9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  date: {
    color: '#3744151',
  },
  containerBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEdit: {
    backgroundColor: '#F59E0B',
  },
  btnRemove: {
    backgroundColor: '#EF4444',
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
  },
});
