//Vista de Busqueda
import React,{useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {SearchBar, ListItem, Icon} from 'react-native-elements';

export default function Search(props){

    //Obtengo de Props
    const {navigation} = props;

    //State
    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    }

    return(
        <View>
            <SearchBar
                placeholder="Busca tu restaurante"
                lightTheme={true}
                onChangeText={updateSearch}
                containerStyle={StyleSheet.searchBar}
                value={search}
           />
        </View>
    )
}

const styles = StyleSheet.create({
    
    searchBar:{
        marginBottom:20
    }
})