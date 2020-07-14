//Componente que se encarga de todo el sistema de Navegación
//Con el creo el menú de navegación de la aplicación

import React from 'react';
//Componente NavigationContainer que tiene que englobar toda la navegación
import {NavigationContainer} from '@react-navigation/native';
//Funcion para la creación de los elementos de las tabs del menú
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//Importo Biblioteca Icon de React Native Element
import {Icon} from 'react-native-elements';

//Importo Componentes Stack de la Aplicación
//Stack es un conjunto de rutas englobadas.
import RestaurantsStack from './RestaurantsStack';
import FavoritesStack from './FavoritesStack';
import TopRestaurantStack from './TopRestaurantStack';
import SearchStack from './SearchStack';
import AccountStack from './AccountStack';


//Creo un componente Tab
const Tab = createBottomTabNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                //ruta inicial
                initialRouteName = "restaurant"
                //colores
                tabBarOptions = {{
                    inactiveTintColor : "#646464",
                    activeTintColor : "#FF8000"
                }}
                //llamo a funcion configIconsTabs que configura los iconos
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) =>  configIconsTabs(route,focused) ,
                  })}
            >       
                <Tab.Screen name="restaurant" component={RestaurantsStack} options={{ title : 'Restaurantes'}}/>
                <Tab.Screen name="top-restaurant" component={TopRestaurantStack} options={{ title : 'Top 5'}}/>
                <Tab.Screen name="favorites" component={FavoritesStack} options={{title : 'Favoritos'}}/>
                <Tab.Screen name="search" component={SearchStack} options={{title : 'Buscar'}}/>
                <Tab.Screen name="account" component={AccountStack} options={{title : 'Mi Cuenta'}} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

//Realizamos una funcion en la que configuramos los iconos para las distintas rutas
//Esta funcion recibe la route y si esta pulsado (focused) hago un switch para otorgar a cada ruta un icono de react-native-element
function configIconsTabs(route,focused){
    let iconName;
    let color = "#9199AA";
    iconName = focused ?  color = "#FF8000" : "#9199AA";
    switch(route.name){
        case  "restaurant":
            iconName = "silverware";
            break;
        case "top-restaurant" : 
            iconName = "numeric-5-box-outline"
            break;
        case "favorites" :
            iconName = "heart-outline"
            break;
        case "search" : 
            iconName = "magnify"
            break;
        case "account" : 
            iconName = "account-outline"
        default : 
        break;
    }

    return(
        <Icon type="material-community" name={iconName} color={color} />
    )
}