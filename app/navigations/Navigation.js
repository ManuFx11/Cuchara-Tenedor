//Componente que se encarga de todo el sistema de Navegación
//Con el creo el menú de navegación de la aplicación

import React from 'react';
//Componente NavigationContainer que tiene que englobar toda la navegación
import {NavigationContainer} from '@react-navigation/native';
//Funcion para la creación de los elementos de las tabs del menú
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Importo Componentes Stack de la Aplicación
import RestaurantsStack from './RestaurantsStack';
import FavoritesStack from './FavoritesStack';
import TopRestaurantStack from './TopRestaurantStack';
import SearchStack from './SearchStack';
import AccountStack from './AccountStack';


//Creo un componente Tab
const Tab = createBottomTabNavigator();

function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="restaurant" component={RestaurantsStack} options={{ title : 'Restaurantes'}}/>
                <Tab.Screen name="top-restaurant" component={TopRestaurantStack} options={{ title : 'Top 5'}}/>
                <Tab.Screen name="favorites" component={FavoritesStack} options={{title : 'Favoritos'}}/>
                <Tab.Screen name="search" component={SearchStack} options={{title : 'Buscar'}}/>
                <Tab.Screen name="account" component={AccountStack} options={{title : 'Mi Cuenta'}} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;