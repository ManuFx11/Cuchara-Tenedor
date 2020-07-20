//Screen para la vista de Usuario logeado

import React from 'react';
import {View,Text} from 'react-native';
import {Button} from 'react-native-elements';
//Llamada a la funcion de cerrar sesión
import {removeSession} from '../../utils/functions';

import * as firebase from 'firebase';

export default function UserLogged(){
    return(
        <View>
            <Text>Usuario logeado screen</Text>
            <Button onPress={removeSession} title="Cerrar Sessión"></Button>
        </View>
    )
}
