//Componente de Formulario de Registro
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';

export default function RegisterForm(){
    return(
        <View style={styles.formContainer}>
           <Input
             placeholder="Email"
             containerStyle={styles.inputForm}
           />
            <Input
             placeholder="Contraseña"
             containerStyle={styles.inputForm}
             password={true}
             secureTextEntry={true}
           />
            <Input
             placeholder="Repetir Contraseña"
             containerStyle={styles.inputForm}
             password={true}
             secureTextEntry={true}
           />
           <Button 
             title="Unirse"
             containerStyle={styles.btnContainerRegister}
             buttonStyle={styles.btnRegister}
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
        width:"95%" 
    },
    btnRegister:{
        backgroundColor:"#00A680"
    }
})