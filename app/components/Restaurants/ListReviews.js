import React, { useState, Component, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Button, Avatar, Rating } from 'react-native-elements'
import { map } from "lodash";

//Importo Configuración de Firebase
import {firebaseApp} from "firebase/app";
//Importo Firebase
import * as firebase from 'firebase';
//Importo FireStore
import "firebase/firestore";
//Creo una conexión a base de datos
const DB = firebase.firestore(firebaseApp);


export default function ListReviews(props){

    //PROPS
    const {navigation, idRestaurant, setRating} = props;

    //STATE
    const [userLogged, setUserLogged] = useState(false);
    const [reviews, setReviews] = useState([]);
   


    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    });

    //USEEFFECT
    useEffect(() => {

        //Obtengo las reviews que tengan el id del restaurante
        DB.collection("reviews")
        .where("idRestaurant", "==", idRestaurant)
        .get()
        .then((response) => {
            const resultReview = [];
            response.forEach((doc) => {
              const data = doc.data();
              data.id = doc.id;
              resultReview.push(data);
            });
            setReviews(resultReview);
        })

    },[])
  
        return (
            <View style={styles.viewButtonReviews}>
                {userLogged ? (
                    <Button 
                    onPress={() => navigation.navigate('add-review', { idRestaurant: idRestaurant})}
                    title="Escribe una opinión"
                    buttonStyle={styles.btnAddReview}
                    titleStyle={styles.btnTitleAddReview}
                    icon={{
                        type:"material-community",
                        name: "square-edit-outline",
                        color: "#00a680"
                    }}
                    />
                ) : (
                    <View>
                        <Text style={{ textAlign : "center", color : "#00a680", padding: 20}}
                           onPress={() => navigation.navigate('account') }
                        
                        > Para escribir una opinión debe estar logeado {' '}
                           <Text style={{fontWeight : "bold"}}>Iniciar Sesión</Text>
                        </Text>
                       
                    </View>
                )}
            
            {map(reviews, (review, index) => (
                <Review
                    key = {index}
                    review = {review}
                />
            ))}
            </View>
        )
}

//Creo comomponente mostrado de reviws

function Review(props){

    const {title, review, rating, createAt, avatarUser } = props.review;

    //Para transformar la fecha y obtenerla
    const createReviews = new Date(createAt.seconds * 1000);

    return(
        <View style={styles.viewReview}>
           <View style={styles.viewImageAvatar}>
                <Avatar
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={avatarUser ? {uri : avatarUser} : require("../../../assets/img/avatar-default.jpg")}
                />
            </View>
            <View style={styles.viewInfo}>
               <Text style={styles.reviewTitle}>
                   {title}
               </Text>
               <Text style={styles.reviewText}>
                   {review}
               </Text>
               <Rating
                imageSize={15}
                startingValue={rating}
                randomOnly
               />
               <Text style={styles.reviewData}>
                  {createReviews.getDate()}/{createReviews.getMonth() +1 }/
                   {createReviews.getFullYear()} - {createReviews.getHours()}:
                   {createReviews.getMinutes() < 10 ? "0" : ""}
                   {createReviews.getMinutes()}
               </Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    btnAddReview : {
        backgroundColor:"transparent"
    },
    btnTitleAddReview : {
        color:"#00a680"
    },
    viewButtonReviews :{
        marginTop:20,
        marginBottom:50
    },
    viewReview : {
        marginTop:20,
        flexDirection:"row",
        padding:10,
        paddingBottom:20,
        borderBottomColor:"#e3e3e3",
        borderBottomWidth:1
    },
    viewImageAvatar : {
        marginRight:15
    },
    imageAvatarUser : {
        width:50,
        height:50
    },
    viewInfo : {
        flex: 1,
        alignItems: "flex-start"
    },
    reviewTitle : {
        fontWeight:"bold"
    },
    reviewText : {
        paddingTop:2,
        color:"grey",
        marginBottom:5
    },
    reviewData : {
        marginTop:5,
        color:"grey",
        fontSize:12,
        position:"absolute",
        right:0,
        bottom:0
    }

})
