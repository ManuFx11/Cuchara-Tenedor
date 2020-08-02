//Vista (Componente) de la lista de Restaurantes
import React,{useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Icon} from 'react-native-elements';

import * as firebase from 'firebase';

//Importo Hook de navegación useNavigation
import {useNavigation} from '@react-navigation/native';
 

export default function Restaurants(){

    //NAVIGATION HOOK
    const navigation = useNavigation();

    //STATE
    const [login, setLogin] = useState(false);

   //EFFECT
   useEffect(() => {
   
     //Compruebo si el usuario esta logeado o no
     firebase.auth().onAuthStateChanged((user) => {
       //Me duelve la información del usuario
       //Devuelve null o un objeto del usuario, hago comprobación y cambio estado
       !user ? setLogin(false) : setLogin(true);
   })
 
   }, [])
 
  return(
    <View style={styles.viewBody}>
        <Text>Restaurantes..</Text>
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