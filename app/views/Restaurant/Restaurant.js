import React, {useState, useEffect, useCallback} from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, AsyncStorage } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/Loading';
import CarouselImages from "../../components/Carousel";
import Map from "../../components/Map";
import {Rating} from 'react-native-ratings';

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
    //Establezco el titulo de la página
    navigation.setOptions({
        title : name
    })

    //STATE
    const [restaurant, setRestaurant] = useState({});
    const [isVisible, setIsVisible] = useState(true);
    const [rating, setRating] = useState(0);

   //USEEFFECT
   useEffect(() => {

    DB.collection("restaurants")
    .doc(id)
    .get()
    .then((response) => {
        const value = response.data();
        console.log(value);
        setRestaurant(value);
        setRating(value.rating);
        setIsVisible(false);
    }).catch((error) => {
        console.log(`Ha ocurrido el siguiente error ${error}`);
    })
  
   }, [])

    return (
        <ScrollView vertical style={styles.viewBody}>
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
             address={restaurant.adress}
             location={restaurant.location}
            />
           
            <Loading isVisible={isVisible} text="Cargando Restaurante"/>
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
    const {location, name, address} = props;

    return(
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restaurantInfoTitle}>
                Información sobre Restaurante
            </Text>
            <Map
                location={location}
                name={name}
                height={200}
            />
        </View>
    )

}

/* //Componente para Mapa Localización
function MapRestaurant(props){
    const {location} = props;
    

    return(
        <MapView
                 initialRegion={location}
                 style={styles.mapStyle}
                 showsUserLocation={true}
                 >
                <MapView.Marker
                    coordinate={{
                        latitude : location.latitude,
                        longitude : location.longitude
                    }}
                    draggable
                />
        </MapView>
    )
} */

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
})
