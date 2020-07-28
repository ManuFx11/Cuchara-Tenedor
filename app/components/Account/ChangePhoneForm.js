//Componente para cambiar el número de telefono
//Este componente se abre como children de un modal 

//PARA REALIZAR UN CAMBIO DE TELEFONO HAY QUE ENVIAR UNA PHONECREDENTIALS A FIREBASE



import React, {useState} from 'react';
import {StyleSheet, View,Text} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {isEmpty} from 'lodash';

import * as firebase from 'firebase';


export default function ChangePhoneForm(props){

    //Props
    //userInfo, setIsVisible, setLoadUserInfo
    const { userInfo : {phoneNumber}, setIsVisible, setLoadUserInfo} = props;
    
    //Declaración de Estados
    const [phoneNumberNew, setPhoneNumberNew] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //Funcion para actualizar telefono
    const updatePhoneFirebase = () => {
        console.log(`Telefono nuevo ${phoneNumberNew}`);
         //Realizo comprobaciones
        if(isEmpty(phoneNumberNew)){
            setError("Debe introducir un Nº de teléfono");
        }else if(phoneNumberNew === phoneNumber){
            setError("El Número introducido coincide con el actual");
        }else{
            console.log(`${phoneNumberNew}`);
             setIsLoading(true);
            const update = {
                phoneNumber : phoneNumberNew
            }
            setIsVisible(false);
            
            //Firebase
            /* firebase.auth()
            .currentUser.updatePhoneNumber(phoneNumberNew)
            .then(result => {
                setIsLoading(false);
                setIsVisible(false);
                setLoadUserInfo(true);
            })
            .catch(error => {
                setError("Ups, algo salio mal");
            })  */
        } 
    }

      /*   const verificacionPhone = () => {
            var applicationVerifier = firebase.auth.RecaptchaVerifier('recaptcha-container');
            var provider = firebase.auth.PhoneAuthProvider();
            provider.verifyPhoneNumber('+34646825550', applicationVerifier)
                .then(function(verificationId) {
                  var verificationCode = window.prompt('Please enter the verification ' +
                      'code that was sent to your mobile device.');
                  return firebase.auth.PhoneAuthProvider.credential(verificationId,
                      verificationCode);
                })
                .then(function(phoneCredential) {
                  return user.updatePhoneNumber(phoneCredential);
                });
        } */


    //VIEW
    return(
        <View>
            <Text>Establecer Teléfono</Text>
            <Text>Actual: {phoneNumber}</Text>
            <Input
                placeholder="Nº de Teléfono"
                containerStyle={styles.inputForm}
                onChange={(e) => setPhoneNumberNew(e.nativeEvent.text)}
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
                title="Actualizar Teléfono"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={updatePhoneFirebase}
                loading={isLoading}
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


});