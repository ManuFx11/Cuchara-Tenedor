//Componente Login
import React,{useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';

//Import Loadash
import {isEmpty} from 'lodash';
//Import Componente Loading 
import Loading from '../../components/Loading';
//Import firebase
import * as firebase from 'firebase';
//Import useNavigation
import {useNavigation} from '@react-navigation/native';

export default function LoginForm(props){

    const {refToast} = props;
    const navigation = useNavigation();

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [formData, setFormData] = useState({email : "" , password : ""});
    const [isVisible, setIsVisible] = useState(false);


    //Se encarga de manejar el evento onChange y actualizar el state
    const onUpdateValueChange = (event,type) => {
        //Recogemos el valor del input
        let value = event.nativeEvent.text;
        //Actualizo state.
        setFormData({...formData, [type] : value});
    }

    const onSubmit = () => {
        console.log("Datos Recibidos");
        console.log(formData);
        if(isEmpty(formData.email || formData.password)){
            refToast.current.show("Rellene por favor todos los campos");
        }else{
            //Paso a realizar login
            console.log("OK");
            setIsVisible(true);

            firebase.auth()
            .signInWithEmailAndPassword(formData.email,formData.password)
            .then(response => {
                //Respuesta Correcta
                setIsVisible(false);
                refToast.current.show("Accediendo a su perfil...");
                setTimeout(() => {
                    navigation.navigate("account")
                },1500);
            })
            .catch(error => {
                setIsVisible(false);
                refToast.current.show("Credenciales no validas");
            })
        }   
    }

    return(
        <View style={styles.formContainer}>
           <Input
            placeholder="Email"
            containerStyle={styles.inputForm}  
            onChange={(event) => onUpdateValueChange(event,"email")}
            rightIcon={
                <Icon
                 type="material-community"
                 name="at"
                 iconStyle={styles.iconRight}
                />
            }
           />  

           <Input 
            placeholder="Contraseña"
            containerStyle={styles.inputForm}
            onChange={(event) => onUpdateValueChange(event,"password")}
            password={true}
            secureTextEntry={visiblePassword ? false : true}
            rightIcon = {
                <Icon
                    type="material-community"
                    name="eye-off-outline"
                    iconStyle={styles.iconRight}
                    onPress={() => setVisiblePassword(!visiblePassword)}  />
                }
            /> 

        <Button 
             title="Acceder"
             containerStyle={styles.btnContainerRegister}
             buttonStyle={styles.btnRegister}
             onPress={onSubmit}
            />
        <Loading isVisible={isVisible} text="Iniciando Sesión..."></Loading>
        </View>
    )
}

//Especifico formato de los datos a recibir
function formDataType(){
    let typeData = {email: "", password : ""}
    return typeData;
}

const styles = StyleSheet.create({

    formContainer : {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
    },
    inputForm : {
        width:"100%",
        marginTop:20
    },
    btnContainerRegister:{
        marginTop:30,
        width:"95%" 
    },
    btnRegister:{
        backgroundColor:"#00A680"
    },
    iconRight: {
        color: "#c1c1c1",
      },
})