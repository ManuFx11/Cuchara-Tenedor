//Vista de Login de la Aplicación
import React from 'react';
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native';
import {Divider} from 'react-native-elements';

//Importo hook de navegacion
import {useNavigation} from '@react-navigation/native';

export default function Login(){

    return(
        <ScrollView centerContent={true}>
           <Image
            source = {require('../../../assets/img/5-tenedores-letras-icono-logo.png')}
            resizeMode="contain"
            style={styles.logo}
           ></Image>
           <View style={styles.viewContainer}>
               <Text>Login Form</Text>
              <CreateAccount/>
           </View>
           <Divider style={styles.divider}/>
           <View style={styles.viewContainer}>
           <Text>Social Login</Text>
           </View>
          
        </ScrollView>
    )
}

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