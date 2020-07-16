import React from 'react';
import {createStackNavigation, createStackNavigator} from '@react-navigation/stack';

import Account from '../views/Account/Account';
import Login from '../views/Account/Login';

//Creo el Stack
const Stack = createStackNavigator();

//Importante el name ya que luego podremos movernos por ellas a través de ese name

export default function AccountStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="account" component={Account} options={{title : "Mi Cuenta"}}/>
            <Stack.Screen name="login" component={Login} options={{title : "Iniciar Sesión"}}/>
        </Stack.Navigator>
    )
}