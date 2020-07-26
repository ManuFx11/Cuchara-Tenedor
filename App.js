//Archivo de entrada de nuestra aplicación
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Manejo de warning
import {YellowBox} from 'react-native';

//Importo Firebase Configuración
import firebaseApp from './app/utils/firebase';

//Importo el componente de Navegación
import Navigation from './app/navigations/Navigation';

//Escribo las waning a ignorar
YellowBox.ignoreWarnings(["Setting a timer","Animated: `useNativeDriver`"])

export default function App() {

  return (
    <Navigation></Navigation>
  );
}

//Puesto para eliminar los warning
console.disableYellowBox = true;

