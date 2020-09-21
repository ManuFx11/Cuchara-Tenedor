//Vista de Favoritos
//IMPORTACIONES
import React, {useState, useRef, useCallback} from 'react';
import {StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert} from 'react-native';
import {Image, Icon, Button} from "react-native-elements";
import {useFocusEffect} from "@react-navigation/native";
import Loading from "../components/Loading";
import {size} from "lodash";

//Importo Configuración de Firebase
import {firebaseApp} from "firebase/app";
//Importo Firebase
import * as firebase from 'firebase';
//Importo FireStore
import "firebase/firestore";
//Creo una conexión a base de datos
const DB = firebase.firestore(firebaseApp);

//Importo Componente 
import ListRestaurants from '../components/Restaurants/ListRestaurants'; 


export default function Favorites(props){

    const {navigation} = props;

    //STATE
    const [restaurants, setRestaurants] = useState(null);
    const [userLogged, setUserLogged] = useState(false);
    const [loading, setIsLoading] = useState(false);



    //Compruebo si el usuario esta logeado
    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    })

    //Obtengo los restaurantes, se ejecutara cada vez que cambiar el estado userLogged
     useFocusEffect(
        useCallback(() => {
            if(userLogged){
                const idRestaurantsArray = [];
                //Obtengo el id del usuario
                const idUser = firebase.auth().currentUser.uid;
                //Ataco a firebase
                DB.collection("favorites")
                .where("idUser","==",idUser)
                .get()
                .then((data) => {
                    //Data contiene todos los restaurantes
                    data.forEach((doc) => {
                        console.log("Restaurante Favorito")
                        console.log(doc.data)
                        idRestaurantsArray.push(doc.data().idRestaurant)
                    })
                    //Una vez obtenidos los id de los restaurantes tengo que hacer otra peticion.
                    //Devuelve una promesa
                    getDataRestaurants(idRestaurantsArray).then((response) => {
                        const restaurantsTotal = [];
                        response.forEach((doc) => {
                            const restaurantSimple = doc.data();
                            restaurantSimple.id = doc.id;
                            restaurantsTotal.push(restaurantSimple);
                        })

                        setRestaurants(restaurantsTotal);
                    })
                })
            
            }
            

        },[userLogged])
    ) 

    //Funcion para pedir los restaurantes 
    const getDataRestaurants = (idRestaurantsArray) => {

            const arrayRestaurants = [];
            //Recorro los id y hago la peticion
            idRestaurantsArray.forEach((idRestaurant) => {
                const result = DB.collection("restaurants").doc(idRestaurant).get();
                arrayRestaurants.push(result);
            })

      return Promise.all(arrayRestaurants);
    }

    if(!userLogged){
        return <UserNotLogged navigation={navigation}/>
    }

    if(!restaurants){
        return(
            <Loading isVisible={loading} text="Cargando Restaurantes"/>
        )
    }else if(size(restaurants) === 0){
          return <NotFountRestaurans/>
    }

    return(
       <View>
       <ListRestaurants 
        isLoading={loading} 
        setIsLoading={setIsLoading} 
        restaurants={restaurants} />
        </View>
    )
}


function NotFountRestaurans(){
    return(
        <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
            <Icon type="material-community" name="alert-outline" size={50}/>
            <Text style={{fontSize:20, fontWeight:"bold"}}>No tienes restaurantes en tu lista</Text>
        </View>
    )
}

function UserNotLogged(props){
    const {navigation} = props;
    return(
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <Icon type="material-community" name="alert-outline" size={50}/>
            <Text style={{fontSize:20, fontWeight:"bold", textAlign:"center"}}>Necesitas estar logeado para ver esta sección</Text> 
            <Button
             title="Ir a Login"
             containerStyle={{marginTop:20, width:"80%"}}
             buttonStyle={{backgroundColor:"#00a680"}}
             onPress ={() => navigation.navigate("account", {screen : "login"})}
            />
        </View>
    )
}
