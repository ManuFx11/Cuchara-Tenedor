//Funciones para validaciones no exporto ninguna como default ya que usare varias validaciones que iran en este fichero
import React from 'react';
import * as firebase from 'firebase';


//Funcion para registrar usuario con Firebase por correo y contraseña.

export function registerUser(email,password){

    let process = false;
    console.log(email);
    
    //Registro al usuario
    firebase.auth()
    .createUserWithEmailAndPassword(email,password)
    .then(response => {
      console.log(response);
      process=true;
    })
    .catch(error => {
      toastRef.current.show("Email ya registrado");
      console.log(error);
    })

    return process;
}



//Funcion para cerrar sesión c{on Firebase
export function removeSession(){     
  firebase.auth().signOut()
  .then(result => {
    console.log("desconectado");
  }).catch(error => {
    console.log('Ha ocurrido un error');
  })

}