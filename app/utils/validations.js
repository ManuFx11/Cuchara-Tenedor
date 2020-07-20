//Funciones para validaciones no exporto ninguna como default ya que usare varias validaciones que iran en este fichero
import * as firebase from 'firebase';


//Comprobación para validar email
export function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

//Funcion para cerrar sesión con Firebase
export function removeSession(){     
  firebase.auth().signOut()
  .then(result => {
    console.log("desconectado");
  }).catch(error => {
    console.log('Ha ocurrido un error');
  })

}