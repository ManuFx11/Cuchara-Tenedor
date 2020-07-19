//Componente de Formulario de Registro
import React,{useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';

//Importo funcion validar email
import {validarEmail} from '../../utils/validations';

//Importo Loadash
import {size, isEmpty} from 'lodash';

export default function RegisterForm(){


    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());

    const onSubmit = () => {
        if (
          isEmpty(formData.email) ||
          isEmpty(formData.password) ||
          isEmpty(formData.repeatPassword)
        ) {
          console.log("Debes rellenar todos los campos")
        } else if (!validarEmail(formData.email)) {
          console.log("Email no correcto");
        } else if (formData.password !== formData.repeatPassword) {
          console.log("Las contraseñas tienen que ser iguales");
        } else if (size(formData.password) < 6) {
           console.log(
            "La contraseña tiene que tener al menos 6 caracteres"
          );
        } else {
          console.log("todo ok");
        }
      };
    
      const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
      };


    return(
        <View style={styles.formContainer}>
        <Input
             placeholder="Correo electronico"
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
        </View>
    )
}


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