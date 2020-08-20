//Vista (Componente) de la lista de Restaurantes
import React,{useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Icon} from 'react-native-elements';
//Importo Configuración de Firebase
import {firebaseApp} from "firebase/app";
//Importo Firebase
import * as firebase from 'firebase';
//Importo FireStore
import "firebase/firestore";
//Creo una conexión a base de datos
const DB = firebase.firestore(firebaseApp);
//Importo Hook de navegación useNavigation
import {useNavigation} from '@react-navigation/native';
 //Importo useFocusEffect, permite realizar algo cada vez que se entre a la pantalla
 import {useFocusEffect} from '@react-navigation/native';
//Importo Componente
import ListRestaurants from '../../components/Restaurants/ListRestaurants'; 


export default function Restaurants(){

    //NAVIGATION HOOK
    const navigation = useNavigation();

    //STATE
    const [login, setLogin] = useState(false);
    //Estado para datos de usuario logeado
    const [user, setUser] = useState(null);
    //Estado para guardar los restaurantes que solicitemos
    const [restaurants, setRestaurants] = useState([])
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    //Estado para saber la siguiente carga de restaurante a partir de cual
    const [startRestaurants, setStartRestaurants] = useState(null);
    //Estado para loading
    const [loading, setIsLoading] = useState(null);
      
    const limitRestaurants = 7;


   //EFFECT
   useEffect(() => {
   
     //Compruebo si el usuario esta logeado o no
     firebase.auth().onAuthStateChanged((user) => {
       //Me duelve la información del usuario
       //Devuelve null o un objeto del usuario, hago comprobación y cambio estado
       !user ? setLogin(false) : setLogin(true);
       //Obtengo la información del Usuario y la almaceno
       setUser(user);
   })
   }, [])

   useFocusEffect(
    useCallback(() => {
       //Obtenemos número de restaurantes
       DB.collection("restaurants").get().then(restaurants => {
        setTotalRestaurants(restaurants.size);
     })

     //Array se encargara de guardar los restaurantes
     const resultsRestaurants = [];

     //Obtengo los restaurantes
     DB.collection("restaurants")
     .orderBy("createAt","desc")
     .limit(limitRestaurants)
     .get()
     .then((response) => {
        //En response tengo todos los restaurantes
        //Vamos a guardarnos el ultimo restaurante que nos da para luego seguir haciendo consulta a partir de ese
        setStartRestaurants(response.docs[response.docs.length-1]);
       
        response.forEach((doc) => {
     
           //Obtengo el restaurante
           const restaurant = doc.data();
           //Le añado al restaurant la id
           restaurant.id = doc.id; 
           //Añado ese restaurante al array
           resultsRestaurants.push(restaurant);      
         });
    
         //Guardo el array de restaurantes obtenidos
         setRestaurants(resultsRestaurants);
    
       }).catch((error => {
         console.log("Ha ocurrido un error");
       }))
    },[])
   )


   //Funcion para comprobar más
   const handleLoadMore = () => {
    const resultRestaurants = [];
    restaurants.length < totalRestaurants && setIsLoading(true);

    DB.collection("restaurants")
      .orderBy("createAt", "desc")
      .startAfter(startRestaurants.data().createAt)
      .limit(limitRestaurants)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartRestaurants(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }

        response.forEach((doc) => {
          const restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push(restaurant);
        });

        setRestaurants([...restaurants, ...resultRestaurants]);
      }).catch((error) => {
        console.log("Ha ocurrido un error");
      });
  };
 
  return(
    <View style={styles.viewBody}>
        <ListRestaurants 
        isLoading={loading} 
        setIsLoading={setIsLoading} 
        handleLoadMore={handleLoadMore} 
        restaurants={restaurants} />
       {login && (<Icon
          type="material-community"
          name="plus"
          color="#00a680"  
          reverse
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate('add-restaurant')}
        />) } 
    </View>
  )

}

const styles = StyleSheet.create({

  viewBody :{
    flex:1,
    backgroundColor:"#FFF"
  },
  btnContainer:{
    position:"absolute",
    bottom:10,
    right:10,
    shadowColor:"black",
    shadowOffset:{width:2,height:2},
    shadowOpacity:0.5

  }

})