//Componente que se encarge de lista los restaurantes
import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import {Image} from 'react-native-elements';
import {size} from 'lodash';

export default function ListRestaurants(props) {

    //PROPS
    const {restaurants} = props;
  
    return (
        <View>
            {size(restaurants) > 0 ? (
                <FlatList 
                    data = {restaurants}
                    renderItem = {(restaurant) => <Restaurant restaurant={restaurant}/>}
                    keyExtractor = {(item, index) => index.toString()}
                />
            ) : (
                <View style={styles.loaderRestaurants}>
                    <ActivityIndicator size="large"/>
                    <Text>Cargando Restaurantes...</Text>
                </View>
            )}
        </View>
    )
}

//Componente Item de Restaurante
function Restaurant(props){
    
    const {restaurant} = props; 
    const {images, name, adress, description} = restaurant.item;
    
    const imagePrincipal = images[0];

    const goRestaurant = () => {
        console.log("OK!!");
    }
   
    
    return(
       <TouchableOpacity onPress={() => goRestaurant() }>
          <View style={styles.viewRestaurant}>
             <View style={styles.viewRestaurantImage}>
                <Image
                    resizeMode="cover"
                    PlaceholderContent={<ActivityIndicator color="#FFF"></ActivityIndicator>}
                    source={
                        imagePrincipal 
                        ? {uri : imagePrincipal}
                        : require("../../../assets/img/no-image.png")
                    }
                    style={{width:80, height:80}}
                />
             </View>
             <View>
                 <Text style={styles.titleRestaurant}>{name}</Text>
                 <Text style={styles.adressRestaurant}>{adress}</Text>
                 <Text style={styles.descriptionRestaurant}>
                    {description.substr(0,60)}...
                 </Text>
             </View>
          </View>

       </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    loaderRestaurants : {
        marginTop:10,
        marginBottom:10,
        alignItems:"center",
        alignContent:"center"
    },
    viewRestaurant: {
        flexDirection:"row",
        margin:10
    },
    viewRestaurantImage:{
        marginRight:15
    },
    titleRestaurant:{
        fontWeight:"bold"
    },
    adressRestaurant:{
        fontStyle:"italic",
        paddingTop:5,
        color:"grey"
    },
    descriptionRestaurant:{
        paddingTop:2,
        color:"grey",
        width:300
    }

})
