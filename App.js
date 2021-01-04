import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text, View, Button} from 'react-native';
import firebase from './src/utils/Firebase';
import Auth from './src/components/Auth';
import 'firebase/auth';
import ListPoliza from './src/components/ListPoliza';

export default function App() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null; // no se carga hasta que se ejecute el use effect

  return (
    <SafeAreaView styles={styles.background}>
      {user ? <ListPoliza user={user} /> : <Auth />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
  },
});
