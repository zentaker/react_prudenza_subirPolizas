import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  //funcion para que el usuario cambie de login a registro
  const changeForm = () => {
    // cambiar a lo contrario el estado de arriba
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.view}>
      <Image style={styles.logo1} source={require('../assets/pru.png')} />
      <Image style={styles.logo} source={require('../assets/saludo.png')} />
      {isLogin ? (
        <LoginForm changeForm={changeForm} />
      ) : (
        <RegisterForm changeForm={changeForm} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: 240,

    marginBottom: 40,
  },
  logo1: {
    marginTop: 50,
    height: 40,
    width: 200,
  },
});
