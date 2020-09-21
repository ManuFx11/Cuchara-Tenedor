//Vista de Busqueda
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Toast from 'react-native-easy-toast';

//Components
import ListTopRestaurants from '../components/Ranking/ListTopRestaurants';

//Importo Configuración de Firebase
import {firebaseApp} from "firebase/app";
//Importo Firebase
import * as firebase from 'firebase';

//Importo FireStore
import "firebase/firestore";
//Creo una conexión a base de datos
const DB = firebase.firestore(firebaseApp);


export default function TopRestaurants(props){

    const {navigation} = props;
    const toastRef = useRef();
    //STATE
    const [restaurants, setRestaurants] = useState([]);


    useEffect(() => {
        DB.collection("restaurants")
        .orderBy('rating','desc')
        .limit(5)
        .get()
        .then((response) => {
            const restaurantsArray = [];
            response.forEach((dataRestaurant) => {
                //Visualizo la información
                const data = dataRestaurant.data();
                data.id = dataRestaurant.id;
                restaurantsArray.push(data);
            });
            //Actualizo estado
            setRestaurants(restaurantsArray);
        })

    }, [])

    return(
        <View>
            <ListTopRestaurants
                restaurants={restaurants}
                navigation={navigation}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </View>
    )
}
