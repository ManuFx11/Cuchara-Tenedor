//Screen de los usuarios que no estan logeados.

import React from 'react';
//Importo ScrollView para que se haga scroll en pantalla pequeñas
//Importo Image para poder usar imagenes
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native'
//Importo Componente Boton de React Native Elements
import {Button} from 'react-native-elements';

//Es un hook que nos permite obtener toda la información de la navegación pagina anterior etc.
import {useNavigation} from '@react-navigation/native';

import Loading from '../../components/Loading';

export default function UserGuest(){

    const navigation = useNavigation();

    return(
        <ScrollView style={styles.viewBody} centerContent={true}>
          <Image 
            style={styles.image}
            source={require("../../../assets/img/user-guest.jpg")}
            resizeMode="contain" />
            <Text style={styles.title}>Consulta tu perfil de Cuchara y Tenedor</Text>
            <Text style={styles.texto}>¿Como describirías tu mejor restaurante? Busca y visualiza los mejores restaurantes de una forma sencilla,
                vota cual te ha gustado más y comenta cual ha sido tu experiencia
            </Text>
            <View style={styles.viewBtn}>
                <Button
                   title="Acceder a mi Perfil"
                   type="solid"
                   buttonStyle={styles.button}
                   containerStyle={styles.containerButton}
                   onPress={() => {
                     navigation.navigate('login');
                   }}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    viewBody : {
        marginLeft : 15,
        marginRight : 15,
    },
    image : {
        height: 300,
        width: "100%",
        marginBottom: 40,
    },
    title : {
        fontWeight : "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign:"center"
    },
    texto : {
        textAlign:"center",
        marginBottom:20
    },
    viewBtn :{
        display:"flex",
        alignItems:"center"
    },
    containerButton : {
        width:"70%"
    },
    button : {
        backgroundColor:'#00a680',
        marginBottom:30
    },

})