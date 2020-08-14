import React from 'react'
import {Image} from 'react-native-elements';
//Importo Carrousel
import Carousel from 'react-native-snap-carousel';

export default function CarouselImages(props) {

    const {arrayImages, height, width} = props;

    //Carousel es un bucle por cada imagen que obtengo haciendo destructurin.
    const renderItem = ({item}) => {
        return(
            <Image
                style={{width,height}}
                source={{uri : item}}
            />
        )
    }
    
    return (
       <Carousel
        layout={"default"}
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        
       />
    )
}
