//Componente que se encarga de mostrar un modal
import React from 'react';
import {StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';

export default function Modal(props){

    //Children va haccer el componente que queremos renderizar dentro de ese modal
    const {isVisible, setIsVisible, children} = props;


    return(
      <Overlay isVisible={isVisible} 
      windowBackgroundColor="rgba(0,0,0,0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
      onBackdropPress={() => closeModal(setIsVisible)}
      >
     {children}
      </Overlay>
    )
}

//Funcion para cerrar modal cuando se hace click fuera del modal
const closeModal = (setIsVisible) => {
    setIsVisible(false);
}

const styles = StyleSheet.create({
    
    overlay : {
        height:"auto",
        width:"90%",
        backgroundColor:"#FFF"
    }
})