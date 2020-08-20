import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView from "react-native-maps";
//Importo Apertura Mapa
import openMap from "react-native-open-maps";

export default function Map(props) {

    //PROPS
    const {location, name, height} = props;
 
    //funciones
    const openAppMap = () => {
        openMap({
            latitude : location.latitude,
            longitude : location.longitude,
            zoom: 19,
            query: name
        })
    }

    return (
       <View>
        {location && (
            <MapView
            style={{height: height, width:"100%"}}
            initialRegion={location}
            onPress = {() => openAppMap()}
        >
        <MapView.Marker
            coordinate={{
                latitude : location.latitude,
                longitude : location.longitude
             }}
             draggable
        />
        </MapView>
        )}
    
    </View>
    )
}

const styles = StyleSheet.create({})
