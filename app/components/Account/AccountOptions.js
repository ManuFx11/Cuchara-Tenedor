import React,{useState} from 'react';
import {StyleSheet, View,Text} from 'react-native';
//Import List Item de React Native Element
import {ListItem} from 'react-native-elements';
//Importo map de Lodash que es mucho más avanzado
import {map} from 'lodash';

//Importo Modal
import Modal from '../Modal';

//Importamos componentes para gestionar las operaciones de cuenta del usuario
import ChangeDisplayNameForm from "../Account/ChangeDisplayNameForm";
import ChangePhoneForm from "../Account/ChangePhoneForm";


export default function AccountOptions(props){

    const {setLoadUserInfo} = props;


    const [isVisible, setIsVisible] = useState(false);
    //Aqui guardamos el componente que se va a renderizar
    const [renderComponent, setRenderComponent] = useState(null);
    const {userInfo, toastRef} = props;
    

    //Funcion para seleccionar componente que se encarga de cada tarea en funcion del boton que pulse el usuario
    const selectedComponent = (key) => {
        switch(key){
    
        case "displayName":
            setRenderComponent(<ChangeDisplayNameForm userInfo={userInfo} 
                setIsVisible={setIsVisible} toastRef={toastRef} setLoadUserInfo={setLoadUserInfo} />)
            setIsVisible(true);
        break;
    
        case "email":
            setRenderComponent(<Text>Cambiando email</Text>)
            setIsVisible(true);
        break;
    
        case "password":
            setRenderComponent(<Text>Cambiando contraseña</Text>)
            setIsVisible(true);
            break;

        case "phone":
            setRenderComponent(<ChangePhoneForm userInfo={userInfo} 
                setIsVisible={setIsVisible} setLoadUserInfo={setLoadUserInfo} />)
            setIsVisible(true);
            break;
       
        default : setRenderComponent(null)
                  setIsVisible(false);
            break;
        }
    }

    //Funcion para generar un list item de opciones y luego recorrerlo
    const generateOptions = (selectedComponent) => {
    return [{
        title : "Cambiar nombre y apellidos",
        subtitle: "Pulse aqui si desea cambiar su nombre y apellidos",
        iconType:"material-community",
        iconNameLeft:"account-circle",
        iconColorLeft:"#ccc",
        iconNameRight:"chevron-right",
        iconColorRight:"#00a680",
        onPress: () => {selectedComponent("displayName")}
    },
    {
        title: "Cambiar Email",
        subtitle: "Pulse aqui si desea cambiar su email",
        iconType:"material-community",
        iconNameLeft:"at",
        iconColorLeft:"#ccc",
        iconNameRight:"chevron-right",
        iconColorRight:"#00a680",
        onPress: () => {selectedComponent("email")}
    },
    {
        title: "Cambiar Contraseña",
        subtitle: "Pulse aqui si desea cambiar su contraseña",
        iconType:"material-community",
        iconNameLeft:"lock-reset",
        iconColorLeft:"#ccc",
        iconNameRight:"chevron-right",
        iconColorRight:"#00a680",
        onPress: () => {selectedComponent("password")}
    },
    {
        title: "Establecer número de teléfono",
        subtitle: "Pulse aqui si desea establecer un teléfono",
        iconType:"material-community",
        iconNameLeft:"cellphone",
        iconColorLeft:"#ccc",
        iconNameRight:"chevron-right",
        iconColorRight:"#00a680",
        onPress: () => {selectedComponent("phone")}
    }
];
}

    const menuOptions = generateOptions(selectedComponent);
    
    return(
        <View>
         {map(menuOptions, (menu,index) => (
             <ListItem
                key={index}
                title={menu.title}
                subtitle={menu.subtitle}
                leftIcon={{
                    type:menu.iconType,
                    name:menu.iconNameLeft,
                    color:menu.iconColorLeft
                }}
                rightIcon={{
                    type:menu.iconType,
                    name:menu.iconNameRight,
                    color:menu.iconColorRight
                }}
                containerStyle={styles.menuItem}
                onPress={menu.onPress}
             />
         ))}
         
         {renderComponent && (
          <Modal isVisible={isVisible} setIsVisible={setIsVisible}>  
              {renderComponent}
          </Modal>
         )}
        
        </View>
    )
}

const styles = StyleSheet.create({

    menuItem : {
        borderBottomWidth:1,
        borderBottomColor:"#e3e3e3"
    }
});