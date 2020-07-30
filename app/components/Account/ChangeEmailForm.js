//Componente para modificar el email
import React,{useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import { onChange } from 'react-native-reanimated';
import * as firebase from 'firebase';

//Importo la función para validar email
import { validarEmail } from "../../utils/validations";
//Importo funcion de reathenticate 
import { reauthenticate } from "../../utils/api";

export default function ChangeEmailForm(props){

    //PROPS
    const {email, setIsVisible, setLoadUserInfo, toastRef} = props;

    //STATE
    const [showPassword, setShowPassword] = useState(true);
    const [data, setData] = useState(dataForm());
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    //FUNCTIONS
    const onChange = (e,type) => {
        let value = e.nativeEvent.text;
        setData({...data, [type] : value});
        console.log(data);
    }

    const updateEmailFirebase = () => {
        console.log("Actualizando");
        console.log(data.email);
        console.log(validarEmail(data.email));
        //Pongo los errores a cero
        setErrors({});
        //Realizo las comprobaciones
        if(!data.email || email === data.email){
            setErrors({
                email : "El email debe ser distinto"
            })
        }else if(!validarEmail(data.email)){
            setErrors({
                email : "Email no valido, introduzca otro"
            })
        }else if(!data.password){
            setErrors({
                password: "La contraseña debe ser introducida"  
            })
        }else{
            setLoading(true);
            //Firebase
            //Para poder actualizar el email en firebase es necesario hacer una identificación del usuario
            reauthenticate(data.password)
            .then(response => {
                
                firebase.auth()
                .currentUser
                .updateEmail(data.email)
                .then(response => {
                    setLoading(false);
                    setLoadUserInfo(true);
                    setIsVisible(false);
                    toastRef.current.show("Email actualizado correctamente");
                })
                .catch(error => {
                    setErrors({
                        email : "Error al actualizar el email"
                    })
                    setLoading(false);
                })
                
            })
            .catch(error => {
                setLoading(false);
                setErrors({
                    password : "La contraseña no es correcta"
                })
            })
        }

    }

    //VIEW
    return(
        <View style={styles.view}>
            <Text style={styles.titleForm}>Cambio de Email</Text>
            <Input
                placeholder="Email"
                containerStyle={styles.input}
                defaultValue={email || ""}
                rightIcon={{
                    type:"material-community",
                    name:"at",
                    color:"#c2c2c2"
                }}
                onChange={(e) => onChange(e,"email")}
                errorMessage={errors.email}
            />

           <Input
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                onChange={(e) => onChange(e, "password")}
                rightIcon={
                <Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.iconRight}
                    color="#c2c2c2"
                    onPress={() => setShowPassword(!showPassword)}
                />
                }
                onChange={(e) => onChange(e,"password")}
                errorMessage={errors.password}
            />

            <Button
                title="Actualizar Email"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={() => updateEmailFirebase()}
                loading={loading}
             />
        </View>
    )


}

const dataForm = () => {
    return {
        email : "",
        password : ""       
    }
}


const styles = StyleSheet.create({
    view:{
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10
    },
    input:{
        marginBottom:10
    },
    titleForm:{
        fontSize:22,
        fontWeight:"bold",
        textAlign:"center",
        marginBottom:20,
        color:"#00A680"
    },
    btnContainerRegister:{
        marginTop:30,
        width:"100%" 
    },
    btnRegister:{
        backgroundColor:"#00A680"
    }
})