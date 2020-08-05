import React,{useState, useEffect} from "react";
import {StyleSheet, View, Text, ScrollView, Alert, Dimensions} from "react-native";
import {Icon, Avatar, Image, Input, Button} from 'react-native-elements'
import { onChange } from "react-native-reanimated";
import {map, size, filter} from "lodash";
import Modal from '../Modal';

//Importo Permisos para la camara
import * as Permissions from 'expo-permissions';
//Importo Selector Imagenes
import * as ImagePicker from 'expo-image-picker';
//Importo Expo Location
import * as Location from 'expo-location';
//Importo Mapa
import MapView from 'react-native-maps';
//Importo Firebase Configuracion
import {firebaseApp} from '../../utils/firebase';
//Importo Firebase
import firebase from "firebase/app";
import "firebase/storage";

//Import Random id
import uuid from "random-uuid-v4";

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
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationRestaurant, setLocationRestaurant] = useState(null);
    
    //FUNCIONES
    const addRestaurant = () => {
        console.log("Guardando restaurante");
        console.log(formData);
        console.log(locationRestaurant);
        //Realizo comprobaciones
        if(!formData.nombre || !formData.direccion || !formData.descripcion){
            toastRef.current.show("Debe rellenar todos los campos");
        }else if(size(imageSelected) === 0){
            toastRef.current.show("El restaurante tiene que tener al menos 1 imagen")
        }else if(!locationRestaurant){
            toastRef.current.show("Tiene que ubicar el restaurante");
        }else{
            console.log("Ok");
            setIsLoading(true);
            uploadImageFirebase().then(response => {
                //Obtendre el array con las rutas de las imagenes.
                console.log(response);
                setIsLoading(false);
                console.log("Todo Correcto");
                navigation.navigate('restaurants');
            })
        }
    }

   
    //Funcion que se encargara de subir las imagenes a firebase
    //Va a devolver una promesa al ser una function asincrona
    const uploadImageFirebase = async () => {
        
        const imageBlob = [];

        //Genero una promesa y le digo que se espera a resolver esto antes de hacer el return
        await Promise.all(
            //Recorro las imagenes que el usuario ha subido.
            map(imageSelected, async (image) => {
            const peticion = await fetch(image);
           //Para subir una imagen a storage necesitamos el blob
            const blob = await peticion.blob();
            //Genero una id con la libreria
            const name = uuid();
            const ref = firebase.storage().ref("restaurants").child(name);

            //Subo la imagen al servidor
            await ref.put(blob).then(async (response) => {
                //Cuando sea correcta la subida obtengo la url que me da firebase
                await firebase.storage().ref(`restaurants/${response.metadata.name}`)
                .getDownloadURL()
                .then((response) => {
                    imageBlob.push(response);
                }).catch((error) => {
                    console.log("Hubo un error al dar la url");
                })
            })
            })
        );
     
        return imageBlob;
    }

    return(
        <ScrollView style={styles.ScrollView}>
            <ImagePrincipal imageSelected={imageSelected[0]}/>
            <FormAdd setIsVisibleMap={setIsVisibleMap} formData={formData} setFormData={setFormData} locationRestaurant={locationRestaurant}/>
            <UploadImage setIsVisibleMap={setIsVisibleMap} toastRef={toastRef} setImageSelected={setImageSelected} imageSelected={imageSelected}/>
            <Button title="Crear Restaurante" onPress={addRestaurant} buttonStyle={styles.btnAddRestaurant}/>
            <Map isVisibleMap={isVisibleMap} toastRef={toastRef} setIsVisibleMap={setIsVisibleMap} setLocationRestaurant={setLocationRestaurant}/>
        </ScrollView>
    )
}

//Componente que se encargara de controlar el mapa
function Map(props){

     const {isVisibleMap, setIsVisibleMap, toastRef, setLocationRestaurant} = props;

     //STATE
     const [location, setLocation] = useState(null);

     //Nada más se ejecute este componente se auto ejecuta el uso efect
    useEffect(() => {
       
        //Funcion anonima asincrona autoejecutable
        (async () => {
            //Pregunto los permisos, añadir en app.json los permisos tanto para expo y para android para que funcione cuando compilemos
            const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
            
            const statusPermissions = resultPermissions.permissions.location.status;
            if(statusPermissions!=="granted"){
                toastRef.current.show("Debes aceptar los permisos de la localización",3000);
            }else{
                //Obtengo la localización
                const localizacion = await Location.getCurrentPositionAsync({});

                console.log(localizacion);
                //Creo un array que guardo en el estado con estas propiedades ya que le serviran para el mapa de Google.
                setLocation({
                    latitude : localizacion.coords.latitude,
                    longitude : localizacion.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta : 0.001
                })
            }
        })()
    },[])

    const confirmLocation = () => {
        setLocationRestaurant(location);   
        setIsVisibleMap(false);
        toastRef.current.show("Localización guardada conrrectamente");
    }

     return(
         <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                 <MapView
                 initialRegion={location}
                 style={styles.mapStyle}
                 showsUserLocation={true}
                 //Si arrastro el mapa y lo muevo me llevo actualizo la localización al nuevo punto
                 onRegionChange={(region) => setLocation(region)}
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
                <View style={styles.viewMapBtn}>
                    <Button title="Guardar Localización" 
                    buttonStyle={styles.viewOkBtnStyle}
                    onPress={() => confirmLocation()}
                    />
                    <Button title="Cerrar Mapa" 
                    containerStyle={styles.viewCancelBtn}
                    buttonStyle={styles.viewCancelBtnStyle}
                    onPress={() => setIsVisibleMap(false)} 
                     />
                </View>  
            </View>
         </Modal>  
     )
}



//Componente Formulario que obtiene los 3 datos del restaurante y guarda en el estado
const FormAdd = (props) => {

    //PROPS 
    const {formData, setFormData} = props;
    const {setIsVisibleMap, locationRestaurant} = props;

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
                rightIcon={{
                    type: "material-community",
                    name:"google-maps",
                    color: !locationRestaurant ? "#c2c2c2" : "#00a680",
                    onPress: () => setIsVisibleMap(true)
                }}
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
    },
    mapStyle : {
        width: "100%",
        height: 550
    },
    viewMapBtn : {
        flexDirection: "row",
        justifyContent: "center",
        marginTop : 10
    },
    viewCancelBtn: {
        marginLeft: 10,  
    },
    viewCancelBtnStyle : {
        backgroundColor: "#a60b0d",
    },
    viewOkBtnStyle : {
        backgroundColor : "#00a680"
    }
})