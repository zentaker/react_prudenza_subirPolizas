/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import { validateEmail } from '../utils/Validations';
import firebase from '../utils/Firebase';

export default function RegisterForm(props) {
  const {changeForm} = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormEror] = useState({});


  const register = () => {
    let errors = {};
    //! negacion si forma data esta vacio y pasword y repet pasword
    if (!formData.email || !formData.pasword || !formData.repeatpaswword) {
      if (!formData.email) {errors.email = true;} // llamamos a errors y le damos una propiedad email = true
      if (!formData.pasword) errors.pasword = true;
      if (!formData.repeatpaswword) errors.repeatpaswword = true;


    } else if (!validateEmail(formData.email)) {
      errors.email = true;

    } else if (formData.pasword !== formData.repeatpaswword) {
      errors.pasword = true;
      errors.repeatpaswword = true;

    } else if (formData.pasword.length < 6) {
      errors.pasword = true;
      errors.repeatpaswword = true;

    } else {
      firebase.auth().createUserWithEmailAndPassword(formData.email, formData.pasword)
        .catch(() => {
        setFormEror({
          email: true,
          pasword: true,
          repeatpaswword: true,
        });
      });
    }
    setFormEror(errors);

  };
  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error ]} //&& si esto tiene contenido && usamos para comporobar solo una cosa y la otra no
        placeholder="Correo electronico"
        onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}
      />

      <TextInput
        style = {
          [styles.input, formError.pasword && styles.error]
        }
        placeholder="Contraseña"
        secureTextEntry={true}
        onChange={(e)=> setFormData({...formData, pasword: e.nativeEvent.text})} />
      <TextInput
        style = {
          [styles.input, formError.repeatpaswword && styles.error]
        }
        placeholder="Repetir Contraseña"
        secureTextEntry={true}
        onChange={(e) => setFormData({...formData, repeatpaswword: e.nativeEvent.text})} />

      <TouchableOpacity style={styles.btn} onPress={register}>
        <Text style={styles.btnTxt}> Registrarse </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={changeForm}>
        <Text style={styles.btnText}> Log In </Text>
      </TouchableOpacity>
    </>
  );
}
function defaultValue() {
  return {
    email: '',
    pasword: '',
    repeatpaswword: '',
  };
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '80%',
    marginBottom: 25,
    paddingHorizontal: 20,
    borderRadius: 13,
    fontSize: 18,
    shadowColor: '#666161',
    backgroundColor: '#FFFFFF',
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    elevation: 3,
  },
  btnText: {
    fontSize: 15,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 20,
  },
  btn: {
    height: 60,
    alignItems: 'center',
    padding: 15,
    borderRadius: 60,
    width: '70%',
    marginBottom: 5,
    paddingHorizontal: 20,
    backgroundColor: '#FF5A7D',
  },
  error: {
    borderColor: '#940c0c',
    borderWidth: 0.9,
  },
});
