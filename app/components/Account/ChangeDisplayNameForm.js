//Componente que se encarga de cambiar el nombre del usuario
import React,{useState} from 'react';
import {StyleSheet, View, Text} from "react-native";
import {Input, Button, Icon} from "react-native-elements";

//Importo Lodash
import {isEmpty, size} from 'lodash';

//Importo Firebase
import * as firebase from 'firebase';

export default function ChangeDisplayNameForm(props){

    //Recibo el nombre de usuario por props     
    const {userInfo : {displayName}, setIsVisible, setLoadUserInfo} = props;

   //Creación de Estados
   const [newDisplayName, setNewDisplayName] = useState(null);
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(false);


    //Funcion para Actualizar el nombre en firebase
    const updateNameFirebase = () => {
        console.log(newDisplayName);
        if(isEmpty(newDisplayName)){
           setError("El nombre no puede estar vacio");
       }else if(displayName === newDisplayName){
          setError("El nombre no puede ser igual al actual");
       }else{
        setIsLoading(true);
         const update = {
             displayName : newDisplayName
         }
         //Firebase
         firebase.auth()
         .currentUser.updateProfile(update)
         .then(response => {
            console.log("Ok, actualizado")
            setIsLoading(false);
            setIsVisible(false);
            //Pongo a true esto para que el useEffect de UserLogged se ejecute y obtenga los valores actuales del usuario
            setLoadUserInfo(true);
      
         })
         .catch(error => {
             setError("Error al actualizar el nombre");
         })
       }
    }

    return(
        <View style={styles.view}>
        <Text style={styles.titleForm}>Cambio de Nombre</Text>
        <Text style={styles.nameForm}>Nombre Actual: {!displayName ? "Sin Nombre" : displayName} </Text>
      <Input
        placeholder="Nuevo Nombre y Apellidos"
        containerStyle={styles.inputForm}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="account-circle-outline"
            iconStyle={styles.iconRight}
          />
        }
        errorMessage={error}
      />
     
      <Button
        title="Actualizar Nombre"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={updateNameFirebase}
        loading={isLoading}
      />
      <Button
        title="Volver atras"
        containerStyle={styles.btnContainerBack}
        buttonStyle={styles.btnBack}
        onPress={() => setIsVisible(false)}
      />    
        </View>
    )
}

const styles = StyleSheet.create({

    formContainer : {
        /*   flex:1,
          alignItems:"center",
          justifyContent:"center",
          marginTop:30 */
          marginTop:30,
          alignItems:"center",
          flex:1,
          marginBottom:30
      },
      containerStyle : {
          width:"100%",
          marginTop:20
      },
      inputForm : {
        width:"100%",
        marginTop:10
      },
      btnContainerRegister:{
          marginTop:30,
          width:"100%" 
      },
      btnContainerBack:{
        marginTop:20,
        width:"100%" 
    },
      btnRegister:{
          backgroundColor:"#00A680"
      },
      btnBack:{
        backgroundColor:"#C0C0C0"
    },
      iconRight: {
          color: "#c1c1c1",
        },
      titleForm:{
          fontSize:22,
          fontWeight:"bold",
          textAlign:"center",
          marginBottom:20,
          color:"#00A680"
      },
      nameForm:{
          textAlign:"center",
          fontWeight:"bold",
          marginBottom:30
      }
})