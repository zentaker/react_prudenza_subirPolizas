import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import moment from 'moment';
import AddPoliza from './AddPoliza';
import ActionBar from './ActionBar';
import Poliza from './Poliza';
import firebase from '../utils/Firebase';
import 'firebase/firestore';

const db = firebase.firestore(firebase);

export default function ListPoliza(props) {
  const { user } = props;
  const [showList, setShowList] = useState(true);
  const [poliza, setPoliza] = useState([]);
  const [pasatPoliza, setPasatPoliza] = useState([]);
  //interruptor, cuando esta true activa el use efect
  const [reloadData, setReloadData] = useState(false);

  

  //use efect que se va a encargar de obtener los cumpleaños 
  useEffect(() => {
    //inicializamos el state
    setPoliza([]);
    setPasatPoliza([]);
    db.collection(user.uid)
      .orderBy('datePago', 'asc')
      .get()
      .then((Response) => {
        const itemsArray = [];
        Response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        });
        formatData(itemsArray);
        
      });
    setReloadData(false);

  }, [reloadData])

  //funcion que se se encarga de separar los cumpleaños 
  const formatData = (items) => {
    //obtener la fecha actual
    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      seconds: 0,
      millisecond: 0
    });
    const polizaTempArray = [];
    const pasatPolizaTempArray = [];

    items.forEach((item) => {
      //dia del pago
      const datePago = new Date(item.datePago.seconds * 1000);
      //lo que manda el usuario
      const datePagoPoliza = moment(datePago);
      const currentyear = moment().get('year');
      
      datePagoPoliza.set({ year: currentyear });
      
      //funcion para la diferencia
      const diffDate = datePagoPoliza.diff(currentDate, 'days');
      //console.log(currentDate);
      const itemTemp = item
      itemTemp.datePago = datePagoPoliza
      itemTemp.days = diffDate;

      if (diffDate >= 0) {
        polizaTempArray.push(itemTemp);
      } else {
        pasatPolizaTempArray.push(itemTemp);
      }

    })
    setPoliza(polizaTempArray);
    setPasatPoliza(pasatPolizaTempArray)

  };
  const deletePoliza = (poliza ) => {
    Alert.alert(
      'Eliminar cumpleaños ', 
      `¿estas seguro de eliminar la poliza ${poliza.compania} ${poliza.ramo}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar', onPress: () => {
            db.collection(user.uid)
              .doc(poliza.id)
              .delete().then(() => {
                setReloadData();
              })
            
        } }

      ],
      {cancelable: false}
    )
  }

  return (
    <View style={styles.container}>
      {showList ? (
        <ScrollView style={styles.scrollView}>
          {poliza.map((item, index) => {
            return (
              <Poliza key={index} poliza={item} deletePoliza={deletePoliza }/>
            )
          })}
          {pasatPoliza.map((item, index) => {
            return (
              <Poliza key={index} poliza={ item} deletePoliza={deletePoliza }/>
            )
          })}

        </ScrollView>
      ) : (
          <AddPoliza user={user} setShowList={setShowList} setReloadData={setReloadData}/>
      )}

      <ActionBar setShowList={setShowList} showList={showList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
  scrollView: {
    marginBottom: 50,
    width: '100%'
  }
});
