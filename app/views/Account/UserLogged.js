//Screen para la vista de Usuario logeado

import React,{useRef,useState, useEffect} from 'react';
import {StyleSheet, View,Text} from 'react-native';
import {Button} from 'react-native-elements';
//Llamada a la funcion de cerrar sesión
import {removeSession} from '../../utils/functions';

//Import Toast
import Toast from "react-native-easy-toast";

//Import Loading
import Loading from "../../components/Loading";

//Import Components
import InfoUser from "../../components/Account/InfoUser";

import * as firebase from 'firebase';

export default function UserLogged(){

    const toastRef = useRef(); 
    const [userInfo, setUserInfo] = useState(null)
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);
    const [textLoading, setTextLoading] = useState("");

    useEffect(() => {
        //Funcion asincrona para consultar los valores del usuario
        (async () => {
            const user = await firebase.auth().currentUser;
            //Actualizo el state del usuario
            setUserInfo(user);
         })();

    },[])

    return(
        <View style={styles.viewUserInfo}>
            {userInfo && <InfoUser userInfo={userInfo}/>}
            <Text>Opciones de Cuenta</Text>
            <Button onPress={removeSession} 
                    title="Cerrar Sessión" 
                    buttonStyle={styles.btnCloseSession}
                    titleStyle={styles.btnCloseSessionText}
                    >
        </Button>
        <Toast ref={toastRef} position="center" opacity={0.9}/>
        <Loading text={textLoading} isVisible={isVisibleLoading} />
        </View>
    )
}




const styles = StyleSheet.create({

    viewUserInfo : {
        minHeight:"100%",
        backgroundColor:"#F2F2F2"
    },
    btnCloseSession : {
        marginTop:30,
        borderRadius:0,
        backgroundColor:"#FFF",
        borderTopWidth:1,
        borderTopColor:"#e3e3e3",
        borderBottomWidth:1,
        borderBottomColor:"#e3e3e3",
        paddingTop:10,
        paddingBottom:10
    },
    btnCloseSessionText : {
        color:"#00a680"
    }
})