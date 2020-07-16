//Vista Account 
import React, {useState, useEffect} from 'react';

//Importo firebase
import * as firebase from 'firebase';

//Importo las screen de UserGuest y UserLogged
import UserGuest from '../Account/UserGuest';
import UserLogged from '../Account/UserLogged';

//Importo Componente Loading
import Loading from '../../components/Loading';

export default function Account(){

    //Creo un estado con el hook de useState para saber si el usuario esta logeado o no.
    const [login, setLogin] = useState(null); 

    //Nada mas cargarse el componente se ejecuta sino le ponemos ninguna condicion
    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            //Devuelve null o un objeto del usuario, hago comprobación y cambio estado
            !user ? setLogin(false) : setLogin(true);
        })

    },[])

    //Si login es igual a null significa que esta cargando la pantalla por primera vez y saldra este alerta.
     if(login === null){
        return <Loading isVisible={true} text="Cargando.."/>
    } 

    return login ? <UserLogged/> : <UserGuest/>;
  
       
}

