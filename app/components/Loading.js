//Componente que se encargara de mostrar un sniper de cargando cuando el usuario va a una zona por primera vez
import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native'
//Importamos este componente de React Native Element 
import {Overlay} from 'react-native-elements';

export default function Loading(props){
    //Este componente recibe estas props para hacerlo mas general
    const {isVisible, text} = props;

   //Componente Overlay tienes diferentes propiedades
    return(
        <Overlay 
        isVisible={isVisible} 
        windowBackgroundColor="rgba(0,0,0,0.5)" 
        overlayBackgroundColor="transparent"
        overlayStyle = {styles.overlay}>
            <View style={styles.view}>
                <ActivityIndicator size="large" color="#9199AA"/>
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    )

}

//Doy estilos
const styles = StyleSheet.create({
    overlay : {
        height:100,
        width:200,
        backgroundColor:"#fff",
        borderColor: "#9199AA",
        borderWidth:2,
        borderRadius:10
    },
    view:{
        flex: 1,
        alignItems: "center",
        justifyContent : "center"
    },
    text:{
        color:"#00a680",
        textTransform : "uppercase",
        marginTop:10
    }
});