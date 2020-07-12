import React from 'react';
//Importo funcion para crear un stack
import {createStackNavigator} from "@react-navigation/stack";
//Importo el componente Restaurants
import Restaurants from "../views/Restaurants";

//Creo el Componente Stack
const Stack = createStackNavigator();

export default function RestaurantsStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="restaurants" component={Restaurants} options={{title : 'Restaurantes'}}/>
            <Stack.Screen name="add-restaurant" component={Restaurants} options={{title : 'Añadir Restaurante'}}/>
        </Stack.Navigator>
    )
}