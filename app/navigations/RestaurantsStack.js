import React from 'react';
//Importo funcion para crear un stack
import {createStackNavigator} from "@react-navigation/stack";
//Importo el componente Restaurants
import Restaurants from "../views/Restaurant/Restaurants";
import AddRestaurant from "../views/Restaurant/AddRestaurant";
import Restaurant from "../views/Restaurant/Restaurant";
import AddReviewRestaurant from "../views/Restaurant/AddReviewRestaurant";

//Creo el Componente Stack
const Stack = createStackNavigator();

export default function RestaurantsStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="restaurants" component={Restaurants} options={{title : 'Restaurantes'}}/>
            <Stack.Screen name="restaurant" component={Restaurant}/>
            <Stack.Screen name="add-restaurant" component={AddRestaurant} options={{title : 'Añadir Restaurante'}}/>
            <Stack.Screen name="add-review" component={AddReviewRestaurant} options={{title : 'Añadir Opinión'}}/>
        </Stack.Navigator>
    )
}