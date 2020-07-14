//En este fichero va toda la configuración de firebase
//Tenemos que instalar el paquete de firebase yarn add install

//Importamos Firebase
import firebase from "firebase/app";


//Creamos un array con la configuracion 
const firebaseConfig = {
    apiKey: "AIzaSyCSoQFJizc6hs0oeXNPIwhQa6ylSlznYD4",
    authDomain: "cuchara-y-tenedor-46acf.firebaseapp.com",
    databaseURL: "https://cuchara-y-tenedor-46acf.firebaseio.com",
    projectId: "cuchara-y-tenedor-46acf",
    storageBucket: "cuchara-y-tenedor-46acf.appspot.com",
    messagingSenderId: "1069103388200",
    appId: "1:1069103388200:web:14350e20729ec30d36c71d"
  };

//Creamos y exportamos a continuacion el canal para la conexión
const firebaseApp =  firebase.initializeApp(firebaseConfig);

//Exporto esta variable

export default firebaseApp;