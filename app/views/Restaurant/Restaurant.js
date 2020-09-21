import React, {useState, useEffect, useCallback, useRef} from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, AsyncStorage } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/Loading';
import CarouselImages from "../../components/Carousel";
import Map from "../../components/Map";
import ListReviews from "../../components/Restaurants/ListReviews";
import {Rating} from 'react-native-ratings';
import {map} from "lodash";
import {ListItem, Icon} from 'react-native-elements';
import Toast from "react-native-easy-toast";

//Importo Configuración de Firebase
import {firebaseApp} from "firebase/app";
//Importo Firebase
import * as firebase from 'firebase';
//Importo FireStore
import "firebase/firestore";
//Creo una conexión a base de datos
const DB = firebase.firestore(firebaseApp);


import { render } from 'react-dom';

const WidthScreen = Dimensions.get("window").width;

export default function Restaurant(props) {

    const {navigation, route} = props;
    const {id, name} = route.params;
    const toastRef = useRef();
    //Establezco el titulo de la página
    navigation.setOptions({
        title : name
    })

    //STATE
    const [restaurant, setRestaurant] = useState({});
    const [isVisible, setIsVisible] = useState(true);
    const [rating, setRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [userLogged, setUserLogged] = useState(false);

   //Para comprobar si el usuario esta logeado ejecutamos firebase.auth
   firebase.auth().onAuthStateChanged((user) => {
      //Devuelve user si esta logeado sino null
      user ? setUserLogged(user) : setUserLogged(false)
   })


   //USEEFFECT
   useFocusEffect(
     useCallback(() => {
        DB.collection("restaurants")
        .doc(id)
        .get()
        .then((response) => {      
            const value = response.data();      
            setRestaurant(value);
            setRating(value.rating);
            setIsVisible(false);            
        }).catch((error) => { 
            console.log(`Ha ocurrido el siguiente error ${error}`);
        })
    },[])
   );

   useEffect(() => {
      if(userLogged && restaurant){
          
        DB.collection("favorites")
        .where("idRestaurant", "==", id)
        .where("idUser","==", firebase.auth().currentUser.uid)
        .get()
        .then((data) => {
           // console.log(data.docs.length);
           if(data.docs.length === 1){
               setIsFavorite(true);
           }
        })
      }
   }, [userLogged, restaurant])


   //Función añadir
   const addFavorite = () => {
       if(!userLogged){
           toastRef.current.show("Para añadir a favoritos tienes que estar logeado");
       }else{
           const datosAGuardar = {
               idUser : firebase.auth().currentUser.uid,
               idRestaurant: id
           };

           //Guardo en firebase
           DB.collection("favorites")
           .add(datosAGuardar)
           .then(() => {
               setIsFavorite(true);
               toastRef.current.show("Restaurante Añadido a Favoritos")
           }).catch((error) => {
               toastRef.current.show("Error al añadir restaurane a favoritos");
           });


       }
   }

   //Funcion borrar de favorito
   const removeFavorite = () => {
      //Borro favorito
      DB.collection("favorites")
      .where("idRestaurant","==",id)
      .where("idUser","==",firebase.auth().currentUser.uid)
      .get()
      .then((data) => {
          data.forEach((doc) => {
              //Obtengo el id a borrar
              const idFavorite = doc.id;
              DB.collection("favorites")
              .doc(idFavorite)
              .delete()
              .then(() => {
                  setIsFavorite(false);
                  toastRef.current.show("Restaurante Eliminado de tus Favoritos");
              }).catch(() => {
                  toastRef.current.show("Error al eliminar el restaurante de tus Favoritos");
              })
          })
      })
   }
   

    return (
        <ScrollView vertical style={styles.viewBody}>

         <View style={styles.viewFavorite}>
            <Icon
                type="material-community"
                name={isFavorite ? "heart" : "heart-outline"}
                onPress={() => isFavorite  ? removeFavorite() : addFavorite()}
                color={isFavorite ? "#f00" : "#000"}
                size={35}
                underlayColor="transparent"
            />
         </View>

          <CarouselImages
                 arrayImages={restaurant.images}
                 height={250}
                 width={WidthScreen}
            />
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
            />
            <RestaurantInfo
             name={restaurant.name}
             adress={restaurant.adress}
             location={restaurant.location}
            />

            <ListReviews
                navigation={navigation}
                idRestaurant={id}
                setRating={setRating}          
            />
           
            <Loading isVisible={isVisible} text="Cargando Restaurante"/>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </ScrollView>   
          
    )
}

//Componente Externo para mostrar datos del restaurante
function TitleRestaurant(props){

    //Recibo titulo y nombre
    const {name, description, rating} = props;

    return(
        <View style={styles.viewRestaurantTitle}>
            <View style={styles.row}>
                <Text style={styles.nameRestaurant}>{name}</Text>    
            </View>
            <Text style={styles.descriptionRestaurant}>{description}</Text>
            <Rating
                style={styles.rating}
                imageSize={20}
                readonly
                startingValue={rating}
            />

        </View>
    )
}


//Componente para mostrarr la info y el mapa
function RestaurantInfo(props){
    const {location, name, adress} = props;

    const listInfo = [
        {
            text: adress,
            iconName: "map-marker",
            iconType: "material-community",
            action: null
     }, {
        text: "954 475 748",
        iconName: "phone",
        iconType: "material-community",
        action: null
        },
        {
            text: "manu9lin@gmail.com",
            iconName: "at",
            iconType: "material-community",
            action: null
        }
     ]

    return(
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restaurantInfoTitle}>
               Información sobre el restaurante
            </Text>
            <Map
                location={location}
                name={name}
                height={150}
            />
            {map(listInfo,(item,index) => (
                <ListItem
                    key={index}
                    title={item.text}
                    leftIcon={{
                        name: item.iconName,
                        type: item.iconType,
                        color: "#00A680"
                    }}
                    containerStyle={styles.containerStyle}
                />
            ))}
        </View>
    )

}


const styles = StyleSheet.create({
    viewBody : {
        flex:1,
        backgroundColor:"#FFF"
    },
    viewRestaurantTitle : {
      padding: 15
    },
    row : {
        flexDirection : "row"
    },
    nameRestaurant :{
        fontSize:20,
        fontWeight:"bold"
    },
    descriptionRestaurant : {
        marginTop:5,
        color:"grey"
    },
    rating : {
        position: "absolute",
        right:10,
        top:20
    },
    mapStyle : {
        width: "100%",
        height: 550
    },
    viewRestaurantInfo : {
        margin:5
    },
    restaurantInfoTitle : {
        fontWeight:"bold",
        marginBottom:20,
        marginLeft:15,
        fontSize:19
    },
    containerStyle : {
        borderBottomColor: "#d8d8d8",
        borderBottomWidth:1
    },
    viewFavorite : {
        position:"absolute",
        zIndex:2,
        top:0,
        right:0,
        backgroundColor:"white",
        borderBottomLeftRadius:100,
        padding:5,
        paddingLeft:15
     
    }
})
