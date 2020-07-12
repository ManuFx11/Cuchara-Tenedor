import React from 'react';
import {createStackNavigation, createStackNavigator} from '@react-navigation/stack';

import Account from '../views/Account';

//Creo el Stack
const Stack = createStackNavigator();

export default function AccountStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="account" component={Account} options={{title : "Mi Cuenta"}}/>
        </Stack.Navigator>
    )
}