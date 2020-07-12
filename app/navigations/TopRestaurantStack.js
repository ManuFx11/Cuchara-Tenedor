import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Importo paginas (componentes)
import TopRestaurants from '../views/TopRestaurants';

//Creo el componente Stack

const Stack = createStackNavigator();

export default function TopRestaurantStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="top-restaurants" component={TopRestaurants} options={{title : 'Top Restaurantes'}}/>
        </Stack.Navigator>
    )

}