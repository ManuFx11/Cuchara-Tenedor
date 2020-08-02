//Screen para mostrar la pantalla de añadir restaurante
import React,{useState,useRef} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';

import AddRestaurantForm from '../../components/Restaurants/AddRestaurantForm';


export default function AddRestaurant(props){

    //PROPS
    //Si esta screen esta puesta en la navegacion RestaurantStack tiene la navigation en su props
    const {navigation} = props;
    
    //STATE
    const [isLoading, setIsLoading] = useState(false); 

    //REF
    const toastRef = useRef();

    return(
        <View>
        <AddRestaurantForm
         toastRef={toastRef}
         setIsLoading={setIsLoading}
         navigation={navigation}
        />
        
        <Toast ref={toastRef} position="center" opacity={0.9}/>
        <Loading isVisible={isLoading} text="Creando Restaurante"/>
        </View>  
    )

}
