//Componente que se encarge de lista los restaurantes
import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import {Image} from 'react-native-elements';
import {size} from 'lodash';
import {useNavigation} from '@react-navigation/native';

export default function ListRestaurants(props) {

    const navigation = useNavigation();

    //PROPS
    const {restaurants, handleLoadMore, isLoading, setIsLoading} = props;
  
    return (
        <View>
            {size(restaurants) > 0 ? (
                <FlatList 
                    data = {restaurants}
                    renderItem = {(restaurant) => <Restaurant navigation={navigation} restaurant={restaurant}/>}
                    keyExtractor = {(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={handleLoadMore}
                    ListFooterComponent={<FooterList isLoading={isLoading}/>}
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

//Componente que mostrara el mensaje de Cargando 
function FooterList(props){

    const {isLoading} = props;

    if(isLoading){
        return(
            <View style={styles.loaderRestaurants}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }else{
        return(
            <View style={styles.notFoundRestaurants}>
                <Text> No quedan restaurantes por cargar</Text>
            </View>
        )
    }
}

//Componente Item de Restaurante
function Restaurant(props){
    
    const {restaurant, navigation} = props; 
    const {id,images, name, adress, description} = restaurant.item;
    
    const imagePrincipal = images[0];

    const goRestaurant = () => {
        //Pasamos estos atributos para recuperarlos en la screen de restaurant
        navigation.navigate("restaurant", {id, name});
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
    },
    notFoundRestaurants : {
        marginTop:10,
        marginBottom:20,
        alignItems:"center"
    }

})
