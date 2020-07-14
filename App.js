//Archivo de entrada de nuestra aplicación
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Importo Firebase Configuración
import firebaseApp from './app/utils/firebase';


//Importo el componente de Navegación
import Navigation from './app/navigations/Navigation';

export default function App() {

  return (
    <Navigation></Navigation>
  );
}

