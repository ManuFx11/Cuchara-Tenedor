//Archivo de entrada de nuestra aplicación
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Manejo de warning
import {YellowBox} from 'react-native';

//Importo Firebase Configuración
import firebaseApp from './app/utils/firebase';

//Importo el componente de Navegación
import Navigation from './app/navigations/Navigation';

//A la hora de guardar en firestorage puede que de un error con react native hay que añadir lo siguiente
//Instalo paquete yarn add base-64
import { decode, encode } from 'base-64';


//Escribo las waning a ignorar
YellowBox.ignoreWarnings(["Setting a timer","Animated: `useNativeDriver`"])

//Para solucionar problema con firebase
if(!global.btoa) global.btoa = encode;
if(!global.atob) global.atob = decode;

export default function App() {

  return (
    <Navigation></Navigation>
  );
}

//Puesto para eliminar los warning
console.disableYellowBox = true;

