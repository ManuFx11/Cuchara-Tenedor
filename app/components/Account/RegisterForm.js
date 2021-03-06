//Componente de Formulario de Registro
import React,{useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';

//Importo funcion validar email
import {validarEmail} from '../../utils/validations';
import {registerUser} from '../../utils/functions';

//Importo Loadash
import {size, isEmpty} from 'lodash';


//Importo Loading
import Loading from '../Loading';

//Importo Hook de navegación useNavigation
import {useNavigation} from '@react-navigation/native';

//Importo Firebase
import * as firebase from 'firebase';

export default function RegisterForm(props){

    const navigation = useNavigation();

    //Recupero la referencia del toast
    const {toastRef} = props;

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        if (
          isEmpty(formData.email) ||
          isEmpty(formData.password) ||
          isEmpty(formData.repeatPassword)
        ) {
         console.log("Todos los campos son obligatorios");
         toastRef.current.show("Todos los campos son obligatorios");
         
        } else if (!validarEmail(formData.email)) {
          console.log("Email no correcto");
          toastRef.current.show("Email no correcto");
        } else if (formData.password !== formData.repeatPassword) {
          console.log("Las contraseñas tienen que ser iguales");
          toastRef.current.show("Las contraseñas tienen que ser iguales");
        } else if (size(formData.password) < 6) {
           console.log(
            "La contraseña tiene que tener al menos 6 caracteres"
          );
          toastRef.current.show("La contraseña tiene que tener al menos 6 caracteres");
        } else {
          setLoading(true);
          //toastRef.current.show("Registrando Usuario.... Espere");
           //Registro al usuario
          firebase.auth()
                  .createUserWithEmailAndPassword(formData.email, formData.password)
                  .then(response => {
                    setLoading(false);
                    console.log(response);
                    toastRef.current.show("Registro Completado");
                    setTimeout(() => navigation.navigate("account"),1500)
                  })
                  .catch(error => {
                    toastRef.current.show("Email ya registrado");
                    console.log(error);
                  }) 
        }
      };
    

      //Actualizo valores en cada change en el state
      const onChange = (e, type) => {
        let value = e.nativeEvent.text;
        setFormData({ ...formData, [type]: value });
        console.log(formData);
     };


    return(
        <View style={styles.formContainer}>
        <Input
          placeholder="Email"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "email")}
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
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showRepeatPassword ? false : true}
        onChange={(e) => onChange(e, "repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando cuenta.."/>
        </View>
    )
}

//Creo el objeto del formulario se puede tambien mandar en su creación
function defaultFormValue() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
    };
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
    },
    iconRight: {
        color: "#c1c1c1",
      },
})