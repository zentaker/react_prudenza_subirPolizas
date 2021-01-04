import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, LogBox } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import firebase from '../utils/Firebase';
import 'firebase/firestore';

LogBox.ignoreLogs(['Setting a timer']);

// debug para android
//firebase.firestore().settings({ experimentalForceLongPolling: true });

//inicializar la bace de datos 
const db = firebase.firestore(firebase);


export default function AddPoliza(props) {
    const { user,  setShowList, setReloadData } = props;
    const [formData, setFormData] = useState({})
    const [isDatePicketVisible, setIsDatePicketVisible] = useState(false);
    const [formError, setFormError] = useState({});


    const hideDatePicker = () => {
        setIsDatePicketVisible(false);

    };
    const showDatePicker = () => {
        setIsDatePicketVisible(true);
    }
    const handlerConfirm = (date) => {
        const datePago = date;
        datePago.setHours(0);
        datePago.setMinutes(0);
        datePago.setSeconds(0);
        setFormData({ ...formData, datePago });
        hideDatePicker();
    }
    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const onSubmit = () => {
        let errors = {};
        if (!formData.compania || !formData.ramo || !formData.numero
            || !formData.bien || !formData.datePago) {
            if (!formData.compania) errors.compania = true;
            if (!formData.ramo) errors.ramo = true;
            if (!formData.numero) errors.numero = true;
            if (!formData.bien) errors.bien = true;
            if (!formData.datePago) errors.datePago = true;
        } else {
            const data = formData;
            data.datePago.setYear(0);
            // crear una collecion 
            db.collection(user.uid)// cada usuario tiene su propia coleccion
                .add(data)
                .then(() => {
                    setReloadData(true);
                    setShowList(true);
                })
                .catch(() => {
                    setFormError({ compania: true, ramo: true, numero: true, bien: true, datePago: true });
            })

        
        }
        setFormError(errors);
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.h1}>Agraga Una Poliza</Text>
                <TextInput style={[styles.input, formError.compania && {borderColor: '#940c0c', borderWidth: 0.9,}]}
                    placeholder="Compania"
                    onChange={(e) => onChange(e, "compania")}
                />
                <TextInput style={[styles.input, formError.ramo && {borderColor: '#940c0c', borderWidth: 0.9,}]}
                    placeholder="Ramo"
                    onChange={(e) => onChange(e, 'ramo')}
                />
                <TextInput style={[styles.input, formError.numero && {borderColor: '#940c0c', borderWidth: 0.9,}]}
                    placeholder="Numero de Poliza"
                    onChange={(e) => onChange(e, 'numero')}
                />
                <TextInput style={[styles.input, formError.bien && {borderColor: '#940c0c', borderWidth: 0.9,}]}
                    placeholder="Bien asegurado"
                    onChange={(e) => onChange(e, 'bien')}
                />
                
                <View style={[styles.input, styles.datepiker, formError.datePago && {borderColor: '#940c0c', borderWidth: 0.9,} ]}>
                    <Text style={{ color: formData.datePago ?'#000000' : '#C3C3C3', fontSize: 18, }}
                        onPress={showDatePicker}>
                        {formData.datePago ? moment(formData.datePago).format('LL')
                        : 'Fecha de pago'}
                        
                        </Text>
                </View>

                <TouchableOpacity style={styles.btn} onPress={onSubmit}>
                    <Text style={styles.btnText}> Agregar poliza</Text>
                </TouchableOpacity>
                

            </View>
            <DateTimePickerModal
                isVisible={isDatePicketVisible}
                mode="date"
                onConfirm={handlerConfirm}
                onCancel={hideDatePicker}
                
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

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
    h1: {
        fontSize: 20,
        marginBottom: 30,
    },
    datepiker: {
        justifyContent: 'center',
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
    btnText: {
        color: '#fff',
        fontSize: 20,
      },
    
    
})
