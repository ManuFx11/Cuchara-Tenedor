//Componente de Info User
import React from 'react'
import {StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements';

export default function InfoUser(props){
    const { userInfo : { photoURL, displayName, email}} = props;

    return(
        <View style={styles.viewUserInfo}>
            <Avatar 
            rounded 
            size="large" 
            source={
                photoURL ? {uri : photoURL} 
                : require('../../../assets/img/avatar-default.jpg')
            } 
            showEditButton
            containerStyle={styles.userInfoAvatar}
            onPress = {() => alert("Cambiar Foto")}
            />
            <View>
                <Text style={styles.displayName}>{showName(displayName)}</Text>
                <Text>{email ? email : "Logeado con Social Login"}</Text>
            </View>   
        </View>
    )
}

//Funcion para comprobar que nos llega un nombre
const showName = (value) => {
    return value ? value : "Usuario sin nombre"; 
}

const styles = StyleSheet.create({

    viewUserInfo : {
        alignItems : "center",
        justifyContent : "center",
        flexDirection : "row",
        backgroundColor : "#f2f2f2",
        paddingTop:30,
        paddingBottom:30
    },
    userInfoAvatar : {
        marginRight:20
    },
    displayName : {
        fontWeight : "bold",
        marginBottom:5
    }

});