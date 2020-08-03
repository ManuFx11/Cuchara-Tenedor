import React,{useState} from "react";
import {StyleSheet, View, Text, ScrollView, Alert, Dimensions} from "react-native";
import {Icon, Avatar, Image, Input, Button} from 'react-native-elements'
import { onChange } from "react-native-reanimated";
import {map, size, filter} from "lodash";

//Importo Permisos para la camara
import * as Permissions from 'expo-permissions';
//Importo Selector Imagenes
import * as ImagePicker from 'expo-image-picker';

//Con el componente dimension lo que obtengo es el ancho de la pantalla del dispositivo
const WidthScreen = Dimensions.get("window").width;
console.log(`Ancho de la pantalla ${WidthScreen}`);

export default function AddRestaurantForm(props){

    //PROPS
    const {toastRef, setIsLoading, navigation} = props;

    //STATE
    const [formData, setFormData] = useState({nombre : "", direccion : "", descripcion : ""})
    const [imageSelected, setImageSelected] = useState([])
    const [imagePrincipal, setImagePrincipal] = useState(null);

    //FUNCIONES
    const addRestaurant = () => {
        console.log("Guardando restaurante");
        console.log(formData);
    }

    return(
        <ScrollView style={styles.ScrollView}>
            <ImagePrincipal imageSelected={imageSelected[0]}/>
            <FormAdd formData={formData} setFormData={setFormData}/>
            <UploadImage toastRef={toastRef} setImageSelected={setImageSelected} imageSelected={imageSelected}/>
            <Button title="Crear Restaurante" onPress={addRestaurant} buttonStyle={styles.btnAddRestaurant}/>
        </ScrollView>
    )
}


//Componente Formulario que obtiene los 3 datos del restaurante y guarda en el estado
const FormAdd = (props) => {

    //PROPS 
    const {formData, setFormData} = props;

    //EVENTOS
    const onChange = (e,type) => {
        let value = e.nativeEvent.text;
        setFormData({...formData, [type] : value})
        
    }
    return(
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del Restaurante"
                containerStyle={styles.input}
                onChange={(e) => onChange(e,"nombre") }
            />
             <Input
                placeholder="Dirección del Restaurante"
                containerStyle={styles.input}
                onChange={(e) => onChange(e,"direccion")}
            />
             <Input
                placeholder="Descripción del Restaurante"
                containerStyle={styles.input}
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={(e) => onChange(e,"descripcion")}
            />
        </View>

    )
}

//Componente ImagenDestacada
function ImagePrincipal(props){
    const {imageSelected} = props;
    return(
        <View>
            <Image
                 source={imageSelected ? { uri: imageSelected } : require('../../../assets/img/no-image.png') }
                 style={{ width: WidthScreen, height: 200 }}
            />
        </View>
    )
}

//Componente UploadImage
function UploadImage(props){

    const {toastRef, setImageSelected, imageSelected} = props;

    const updateImageSelect = async () => {
        console.log("Seleccionar imagen");
        const resultPermissions = await  Permissions.askAsync(Permissions.CAMERA_ROLL);
        const permissionCamera = resultPermissions.permissions.cameraRoll.status;

        if(permissionCamera==="denied"){    
            toastRef.current.show("Es necesario aceptar los permisos de la galeria",2000);
        }else{
            //Lanzo la galeria
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect:[4,3]
            });
            console.log(result);
            //El usuario ha cancelado la seleccion de imagenes
            if(result.cancelled){
                toastRef.current.show("Se cancelo la subida de imagenes",2000);
            }else{
               //Guardo en un estado las imagenes que vayan seleccionando el usuario
               let image = result.uri;
                setImageSelected([...imageSelected,image]);
               
            }

        }
    }

    const removeImage = (imageRestaurant) => {

        const arrayImages = imageSelected;
        Alert.alert(
            "Eliminar Imagen",
            "¿Desea borrar la imagen seleccionada",
            [
                {
                    text:"Cancelar",
                    style:"cancel"
                },
                {
                    text:"Eliminar",
                    onPress: () => {
                    //filter recibe array, y lo recorrer imageUrl y devuelve los elementos si cumple la condicion
                    const arrayUpdate = filter(arrayImages, (imageUrl) => imageUrl !== imageRestaurant)    
                    setImageSelected(arrayUpdate);
                    toastRef.current.show("Imagen Borrada");  
                    }
                }
            ],
            { cancelable : false}
        )

        /*Probar esto y ver porque no salia
    /*  console.log(`Array antes de borrar ${imageSelected}`);
        let updateArray = imageSelected;
        updateArray.splice(key,1);
        console.log(`Despues de borrar ${updateArray}`);
        setImageSelected(updateArray);
        console.log(`Actualizado ${imageSelected}`);
        toastRef.current.show("La imagen pulsada ha sido eliminada",1500); */
    }
 
    return(
        <View style={styles.viewImages}>
           {size(imageSelected) < 3 && (<Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={() => updateImageSelect()}
            />)}
            
            {map(imageSelected, (imageRestaurant,index) => (
               <Avatar
                key={index}
                style={styles.miniaturaStyle}
                source={{uri : imageRestaurant}}
                onPress={() => removeImage(imageRestaurant)}
               />
            ))}
        </View>
    )
}

//STYLES
const styles = StyleSheet.create({

    scrollView:{
        height:"100%",
       
    },
    viewForm:{
        marginLeft:10,
        marginRight:10,
        marginTop:20
    },
    input:{
        marginBottom:5
    },
    textArea:{
        height:100,
        width:"100%",
        padding:0,
        margin:0
    },
    btnAddRestaurant:{
        backgroundColor:"#00a680",
        margin:20
    },
    viewImages:{
       flexDirection:"row",
       marginLeft:20,
       marginRight:20,
       marginTop:10
    },
    containerIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"
    },
    miniaturaStyle:{
        width:70,
        height:70,
        marginRight:10
    }
})