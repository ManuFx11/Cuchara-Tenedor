import React, {useEffect, useRef, useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {AirbnbRating, Button, Input} from 'react-native-elements'
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase/app';
import "firebase/firestore";

//Inicializamos base de datos
const DB = firebase.firestore(firebaseApp);

export default function AddReviewRestaurant(props){

    const {route, navigation } = props;
    const idRestaurant = route.params.idRestaurant;

    //STATE
    const [rating, setRating] = useState(null);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const toastRef = useRef();

    //Funcion
    const addReview = () => {
       if(!rating){
           toastRef.current.show("No has dado ninguna puntuación")
       }else if(!title){
           toastRef.current.show("El titulo es obligatorio")
       }else if(!review){
           toastRef.current.show("La review es obligatoria")
       }else{
          
          setIsLoading(true);
          //Me traigo los datos del usuario
          const user = firebase.auth().currentUser;
          //Preparo los datos que mando a firebase
          const datos = {
              id  : user.uid,
              avatarUser : user.photoURL,
              idRestaurant: idRestaurant,
              title : title,
              review : review,
              rating : rating,
              createAt: new Date()
          }  
          
          //Save in Firebase
          DB.collection("reviews")
          .add(datos)
          .then((response) => {
            updateRestaurant();
          }).catch((error) => {
              setIsLoading(false);
              toastRef.current.show("Error al enviar la Review");
          })


       }
    }

    //Funcion para actualizar la puntuacion del restaurante
    //Tenemos que obtener la puntuación del restaurante, hacer el calculo y obtenerla.
    const updateRestaurant = () => {
      
        //Creo un referencia del restaurante y la guardo
        const restaurantRef = DB.collection("restaurants").doc(idRestaurant);

        restaurantRef.get().then((response) => {
            const restaurantData = response.data();
            //Calculo la puntuacion
            const ratingTotal = restaurantData.ratingTotal + rating;
            const quantityVoting = restaurantData.quantityVoting + 1;
            const ratingResult = ratingTotal / quantityVoting;

            restaurantRef.update({
                rating: ratingResult,
                ratingTotal,
                quantityVoting
            }).then(() => {
                setIsLoading(false);
                navigation.goBack();
            }).catch((error) => {
                console.log("Hubo un error al actualizar la opinion");
            })

        })
    }
   


    return (
        <View style={styles.viewBody}>
          <View style={styles.viewRating}>
            <AirbnbRating
                count={5}
                reviews={["Pésimo","Deficiente","Normal","Muy Bueno","Excelente"]}
                defaultRating={0}
                size={35}
                onFinishRating={(value) => setRating(value) }
            />
          </View>
          <View style={styles.formReview}>
                <Input
                    onChange={(event) => setTitle(event.nativeEvent.text)}
                    placeholder="Titulo"
                    containerStyle={styles.input}
                />
                <Input
                   onChange={(event) => setReview(event.nativeEvent.text)}
                   placeholder="Comentario"
                   multiline={true}
                   inputContainerStyle={styles.textArea}
                />
                <Button
                    title="Enviar Comentario"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnStyle}
                    onPress = {() => addReview()}

                />
          </View>
          <Toast ref={toastRef} position="center" opacity={0.9}/>
          <Loading isVisible={isLoading} text="Guardando Opinión.."/>
        </View>
    )
}

const styles = StyleSheet.create({

    viewBody : {
        flex:1
    },
    viewRating : {
        height:110,
        backgroundColor:"#f2f2f2"
    },
    formReview : {
        flex:1,
        alignItems:"center",
        margin:10,
        marginTop:40
    },
    input : {
        marginBottom:10
    },
    textArea : {
       height:60,
       width:"100%",
       padding:0,
       margin:0 
    },
    btnContainer : {
        flex:1,
        justifyContent:"flex-end",
        marginTop:20,
        marginBottom:10,
        width:"95%"
    },
    btnStyle : {
        backgroundColor:"#00A680"
    }

})
