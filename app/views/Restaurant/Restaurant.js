import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';

//Importo Configuración de Firebase
import {firebaseApp} from "firebase/app";
//Importo Firebase
import * as firebase from 'firebase';
//Importo FireStore
import "firebase/firestore";
//Creo una conexión a base de datos
const DB = firebase.firestore(firebaseApp);

export default function Restaurant(props) {

    const {navigation, route} = props;
    const {id, name} = route.params;
    //Establezco el titulo de la página
    navigation.setOptions({
        title : name
    })

    //STATE
    const [restaurant, setRestaurant] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
   

   //USEEFFECT
   useEffect(() => {
      DB.collection("restaurants")
        .doc(id)
        .get()
        .then((response) => {
            setIsVisible(false);
            //Obtengo la información del restaurante con response.data()
            const data = response.data();
            data.id = response.id;
            //Añado el id y lo añado al estado
            setRestaurant(data);
        } )
   }, [])

    return (
        <View>
            <Text></Text>
            <Loading isVisible={isVisible} text="Cargando Restaurante"/>
        </View>
      
        
    )
}

const styles = StyleSheet.create({})
