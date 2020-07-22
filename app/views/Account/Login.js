//Vista de Login de la Aplicación
import React, {useRef} from 'react';
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native';
import {Divider, Button} from 'react-native-elements';

//Import hook de navegacion
import {useNavigation} from '@react-navigation/native';

//Import LoginForm
import LoginForm from '../../components/Account/LoginForm';

//Import Toast
import Toast from 'react-native-easy-toast'; 


export default function Login(){

   const refToast = useRef();

    return(
        <ScrollView centerContent={true}>
           <Image
            source = {require('../../../assets/img/5-tenedores-letras-icono-logo.png')}
            resizeMode="contain"
            style={styles.logo}
           ></Image>
           <View style={styles.viewContainer}>
               <LoginForm refToast={refToast}/>
              <CreateAccount/>
           </View>
           <Divider style={styles.divider}/>
           <View style={styles.viewContainer}>
           <Text>Social Login</Text>
           </View>
           <Toast ref={refToast} position="center" opacity={0.9}/>
        </ScrollView>
    )
}

/* function loginGoogle() {
    //Creo un proveedor para usar el auth de Google + info en https://firebase.google.com/docs/auth/web/google-signin?hl=es
    const provider = new firebase.auth.GoogleAuthProvider();
    //Establezco el idioma del auth en español
    firebase.auth().languageCode='es';
    //Muestra el pop del login de google
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      //Obtenemos la info del usuario con result.user
      console.log(result.user);
      setInfo(result.user);
    })
    .catch(error => {
      console.log(error.message);
    })
  } */

//Para no cargar el login crear un component CreateAccount que solo usare de manera interna en este componente Login

function CreateAccount(props){
   
   const navigation = useNavigation();
   return(
     <Text style={styles.textRegister}>¿Aún no tienes una cuenta?
       <Text onPress={() => navigation.navigate('register')} style={styles.btnRegister}> Registrate</Text>
     </Text>
   )
}

//Creo estilos

const styles = StyleSheet.create({

    logo:{
        width:"100%",
        height:150,
        marginTop:20
    },
    viewContainer:{
        marginRight:40,
        marginLeft:40
    },
    textRegister : {
        marginTop:15,
        marginLeft:10,
        marginRight:10
    },
    btnRegister : {
        color:"#00a680",
        fontWeight:"bold"
    },
    divider : {
        backgroundColor:"#00a680",
        margin:40,
        height:2
    }

});