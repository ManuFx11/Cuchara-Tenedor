import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView from "react-native-maps";

export default function Map(props) {

    //PROPS
    const {location, name, height} = props;
 
    return (
        <MapView
            style={{height: height, width:"100%"}}
            initialRegion={location}
        />
        
    )
}

const styles = StyleSheet.create({})
