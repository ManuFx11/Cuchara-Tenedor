import React, {useState, useEffect, useCallback} from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, AsyncStorage } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/Loading';
import CarouselImages from "../../components/Carousel";

//Importo Configuración de Firebase
import {firebaseApp} from "firebase/app";
//Importo Firebase
import * as firebase from 'firebase';
//Importo FireStore
import "firebase/firestore";
//Creo una conexión a base de datos
const DB = firebase.firestore(firebaseApp);

const WidthScreen = Dimensions.get("window").width;

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
    console.log(restaurant);
   

   //USEEFFECT
   
   useEffect(() => {
       
     getInfoRestaurant().then((response) => {
         console.log(response);
         setRestaurant(response);
         setIsVisible(false);
     })

   }, [])

  
   const getInfoRestaurant = async () => {
        const search = DB.collection("restaurants").doc(id);
        const result = await search.get();
        return result.data();
   }

    return (
        <ScrollView vertical style={styles.viewBody}>
         
           <CarouselImages
                 arrayImages={restaurant.images}
                 height={250}
                 width={WidthScreen}
             />  
            <Loading isVisible={isVisible} text="Cargando Restaurante"/>
        </ScrollView>
      
        
    )
}

const styles = StyleSheet.create({

    viewBody : {
        flex:1,
        backgroundColor:"#FFF"
    }

})
