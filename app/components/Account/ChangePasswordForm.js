import React,{useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {size} from 'lodash';
import * as firebase from 'firebase';

import {reauthenticate} from '../../utils/api';

export default function ChangePasswordForm(props){

    //PROPS
    const {password, setIsVisible, setLoadUserInfo, toastRef} = props;
   
    //STATE
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({password: "", newPassword : "", repeatPassword : ""})
    const [errors, setErrors] = useState({})

    //FUNCTIONS

    const onChange = (e,type) => {
        let value = e.nativeEvent.text;
        setData({...data, [type] : value});
        console.log(data);
    }



    const updatePasswordFirebase = async () => {
        console.log("Actualizando firebase");
        let errorsTemp = {};
        setErrors({})
        if(!data.password || !data.newPassword || !data.repeatPassword){
            errorsTemp = {
                password: "La contraseña no puede estar vacia",
                newPassword: "La contraseña no puede estar vacia",
                repeatPassword: "La contraseña no puede estar vacia"
            }
        }else if(data.newPassword !== data.repeatPassword){
            errorsTemp = {
                newPassword: "La contraseñas no son iguales",
                repeatPassword: "La contraseñas no son iguales"     
            }
        }else if(size(data.newPassword) < 6 ){
            errorsTemp = {
                newPassword: "La contraseñas tiene que ser mayor a 6 caracteres",
                repeatPassword: "La contraseñas tiene que ser mayor a 6 caracteres"     
            }
        }else{
            //firebase
            await reauthenticate(data.password)
            .then(async (response) => {
                //reponse tengo los datos del usuario
                //Tengo los datos del usuario ya que me he vuelto a logear
                setLoading(true);
               await firebase.auth()
                .currentUser
                .updatePassword(data.newPassword)
                .then(response => {
                    setLoading(false);
                    setIsVisible(false);
                    //Cierro la sesión
                    toastRef.current.show("Vuelva a logearse con su nueva cuenta");
                    firebase.auth().signOut();    
                  
                })
                .catch(error => {
                    console.log(error);
                })

            })
            .catch(error => {
                //Si intentamos mucho veces logearno y la contraseña es mala nos bloquea hasta que pase un tiempo
                errorsTemp ={
                    password : "La contraseña actual no es correcta"
                }
                setLoading(false);
            })
        }

        setErrors(errorsTemp);
    }

   

    return(
        <View>
            <Text style={styles.titleForm}>Cambiar Contraseña</Text>

            <Input
                placeholder="Contraseña Actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                onChange={(e) => onChange(e, "password")}
                defaultValue={password}
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

            <Input
                placeholder="Contraseña Nueva"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                onChange={(e) => onChange(e, "newPassword")}
                rightIcon={
                <Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.iconRight}
                    color="#c2c2c2"
                    onPress={() => setShowPassword(!showPassword)}
                />
                }
                errorMessage={errors.newPassword}
               
            />

        <Input
                placeholder="Repetir Contraseña Nueva"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                onChange={(e) => onChange(e, "repeatPassword")}
                rightIcon={
                <Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.iconRight}
                    color="#c2c2c2"
                    onPress={() => setShowPassword(!showPassword)}
                />
                }
                errorMessage={errors.repeatPassword}
               
            />

            <Button
                title="Actualizar Contraseña"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={() => updatePasswordFirebase()}
                loading={loading}
             />
        </View>
    )
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