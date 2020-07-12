import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Search from '../views/Search';

//Creo componente Stack
const Stack = createStackNavigator();

export default function SearchStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="search" component={Search} options={{title : 'Búsqueda de Restaurante'}}/>
        </Stack.Navigator>
    )
}