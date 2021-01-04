import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View,  } from 'react-native'

export default function Poliza(props) {
    const { poliza, deletePoliza } = props;
    const pasat = poliza.days < 0 ? true : false;
    const infoDay = () => {
        if (poliza.days === 0) {
            return <Text style={{ color: "#fff" }}>Dia de pago</Text>
        } else {
            
            return (
                <View style={styles.textCurrent}>
                
                    <Text >Faltan {poliza.days} Dias </Text>
                    
                </View>
            )
        }
        
    }


    return (
        <TouchableOpacity style={[styles.card, (
            pasat ? styles.pasat : poliza.days === 0 ? styles.actual : styles.current)]}
            onPress={() => deletePoliza(poliza)}>
            <View style={styles.contenedortit}>
            <Text style={styles.userName}>
                {poliza.compania} {poliza.ramo}
            </Text>
          
            
                {pasat ? <Text style={{ color: "#fff" }}>Pasado</Text> : infoDay()}
                
            </View>
            <View style={styles.info}>
            <Text style={styles.userName}>
                Numero de poliza: {poliza.numero} 
            </Text>
            <Text style={styles.userName}>
                Bien asegurado: {poliza.bien} 
                </Text>
                </View>
            

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        
        height: 130,
        
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 15,
    },
    contenedortit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    pasat: {
        backgroundColor: '#EF0000'
    },
    current: {
        backgroundColor: '#559204',
    },
    actual: {
        backgroundColor: '#D0A000'
    },
    userName: {
        fontSize: 16,
        color: '#fff',

    },
    textCurrent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 105,
        alignItems: 'center',
        justifyContent: 'center'

    },
    info: {
        marginTop: 50,

        
    }
})
