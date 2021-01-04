import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firebase from '../utils/Firebase';

export default function ActionBar(props) {
  const {showList, setShowList} = props;
  return (
    <View style={styles.viewFooter}>
      <View style={styles.viewClose}>
        <Text style={styles.text} onPress={() => firebase.auth().signOut()}>
          Cerrar Sessión
        </Text>
      </View>
      <View style={styles.viewAdd}>
        <Text style={styles.text} onPress={() => setShowList(!showList)}>
          {showList ? 'Agragar Poliza' : 'Cancelar Poliza'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewFooter: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  viewClose: {
    backgroundColor: '#AD3A52',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  viewAdd: {
    backgroundColor: '#FF5A7D',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
