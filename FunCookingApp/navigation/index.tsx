import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

function HomeScreen(props:any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:20}}>Home Screen</Text>
      <TouchableOpacity onPress={()=> props.navigation.navigate('Perfil')}>
        <Text>Ir a Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

function PerfilScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:20}}>Perfil Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
    </Drawer.Navigator>
    </NavigationContainer>
    
  );
}

export default MyDrawer;