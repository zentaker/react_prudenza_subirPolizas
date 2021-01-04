import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {validateEmail} from '../utils/Validations';
import firebase from '../utils/Firebase';

export default function LoginForm(props) {
  const {changeForm} = props;

  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});

  const login = () => {
    let errors = {};
    //si cualquiera de los dos tiene eror, valida cual es el que tiene erroor
    if (!formData.email || !formData.password) {
      //ya sea uno o los dos los agrega aa erorr
      if (!formData.email) errors.email = true;
      if (!formData.email) errors.password = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password) //va a requerir contraeña y usuario y nos deveuelve una promesa
        .catch(() => {
          setFormError({
            email: true,
            password: true,
          });
        });
    }
    setFormError(errors);
  };

  const onChange = (e, type) => {
    //type toma a propidad del valor que te llega
    /* console.log('data: ', e.nativeEvent.text);
    console.log('type: ', type); */
    //type entre corchetes para llamar a la propiedad
    setFormData({...formData, [type]: e.nativeEvent.text}); // recuperar la infromacion actual del estado, luego actualizar los nuevos datoios
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="correo electronico"
        onChange={(e) => onChange(e, 'email')}
      />
      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChange={(e) => onChange(e, 'password')}
      />
      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text style={styles.btnTxt}> Log In</Text>
      </TouchableOpacity>
      <View style={styles.register}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.btnText}> Registrar </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function defaultValue() {
  return {
    email: '',
    password: '',
  };
}

const styles = StyleSheet.create({
  btnText: {
    fontSize: 18,
  },
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
