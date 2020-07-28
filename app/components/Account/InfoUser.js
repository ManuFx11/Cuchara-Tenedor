//Componente de Info User
import React,{useEffect,useState} from 'react'
import {StyleSheet, Text, View, ImagePickerIOS } from 'react-native'
import { Avatar } from 'react-native-elements';

//Importo Loading
import Loading from '../../components/Loading';

//Importo Permisos, Firebase y Image Picker
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default function InfoUser(props){
    const { userInfo : { uid, photoURL, displayName, email, phoneNumber}, 
    toastRef, 
    setLoading, 
    setLoadingText} = props;
    console.log(displayName);

    return(
        <View style={styles.viewUserInfo}>
            <Avatar 
            rounded 
            size="large" 
            source={
                photoURL ? {uri : photoURL} 
                : require('../../../assets/img/avatar-default.jpg')
            } 
            showEditButton
            containerStyle={styles.userInfoAvatar}
            onPress = {() => changeAvatar(toastRef,uid,setLoading,setLoadingText)}
            />
            <View>
                <Text style={styles.displayName}>{displayName ? displayName : "Anónimo"}</Text>
                <Text>{email ? email : "Logeado con Social Login"}</Text>
                <Text>{phoneNumber ? phoneNumber : "Sin número establecido"}</Text>
            </View>   
        </View>
    )
}

//Funcion para controlar Boton Cambio de Avatar, esto es una función asincrona
const changeAvatar = async (toastRef,uid,setLoading,setLoadingText) => {
    console.log("Cambiando avatar");
    //Pido permiso para la camara
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //console.log(resultPermission);
    const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
    if(resultPermissionCamera==="denied"){
        toastRef.current.show("Es necesario aceptar los permisos de la galeria");
    }else{
        //En caso de que nos den permiso
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect:[4,3]
        })
        //Compruebro si se ha seleccionado la imagen
        if(result.cancelled){
            toastRef.current.show("No se selecciono ninguna imagen");
        }else{
            uploadImageFirebase(result.uri,uid,setLoading,setLoadingText).then(() => {
                toastRef.current.show("Imagen Subida con Exito");
                updatePhotoUrl(uid,setLoading);
            }).catch((error) => {
                console.log(error);
                toastRef.current.show("Error al subir el avatar");
            })
        }
    }
}

//Funcion que se encarga de subir la imagen a firebase
const uploadImageFirebase = async (uri,uid,setLoading,setLoadingText) => {
    setLoadingText("Actualizando avatar");
    setLoading(true);
    
    const response = await fetch(uri);
    //Un objeto blob representa un objeto de tipo fichero de datos planos inmutables
    const blob = await response.blob();
    console.log(JSON.stringify(blob));
    //Creo una referencia
    const ref = firebase.storage().ref().child(`avatar/${uid}`);
    //Esto devuelve una promesa
    return ref.put(blob);  
}

//Funcion con la que actualizo photoURL del usuario
const updatePhotoUrl = (uid,setLoading) => {
  
    firebase.storage().ref(`avatar/${uid}`).getDownloadURL()
    .then(async (response) => {
        const data = {
            photoURL : response
        }
        await firebase.auth().currentUser.updateProfile(data);
        setLoading(false);
    })
    .catch((error) => {
       console.log(error);
    })
     
}

//Funcion para comprobar que nos llega un nombre
const showName = (value) => {
    return value ? value : "Usuario sin nombre"; 
}

const styles = StyleSheet.create({

    viewUserInfo : {
        alignItems : "center",
        justifyContent : "center",
        flexDirection : "row",
        backgroundColor : "#f2f2f2",
        paddingTop:30,
        paddingBottom:30
    },
    userInfoAvatar : {
        marginRight:20
    },
    displayName : {
        fontWeight : "bold",
        marginBottom:5
    }

});

console.disableYellowBox = true;