//Importamos firebase ya que atacaremos a esta plataforma
import * as firebase from 'firebase';

export function reauthenticate(password){

    //Solicitamos usuario actual
    const user = firebase.auth().currentUser;
    //Llamamos a la funcion EmailAuthProvider para que te devuelva las credenciales del usuario que le mandamos.
    const credenciales = firebase.auth.EmailAuthProvider.credential(
        user.email, password
    )

    return user.reauthenticateWithCredential(credenciales);

}