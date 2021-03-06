//Pantalla de Registro
import React,{useRef} from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


//Importo el componente Formulario de Registro
import RegisterForm from '../../components/Account/RegisterForm';

//Importo Toast
import Toast from 'react-native-easy-toast';

export default function Register(){

   //Creo una referencia hacia el elemento Toast de la vista
    const toastRef = useRef();

    return(
        <KeyboardAwareScrollView>
            <Image
              source={require('../../../assets/img/5-tenedores-letras-icono-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            ></Image>
            <View style={styles.viewForm}>
               <RegisterForm toastRef={toastRef}></RegisterForm>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({

    logo:{
        width:"100%",
        height:150,
        marginTop:20
    },
    viewForm:{
        marginRight:40,
        marginLeft:40
    }
})